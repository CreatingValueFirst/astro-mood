'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
}

interface FetchOptions {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  dedupingInterval?: number;
  refreshInterval?: number;
}

// Global cache for request deduplication (Vercel best practice: client-swr-dedup)
const cache = new Map<string, { data: any; timestamp: number; promise?: Promise<any> }>();
const subscribers = new Map<string, Set<(data: any) => void>>();

/**
 * Custom fetch hook implementing SWR (Stale-While-Revalidate) pattern
 * Based on Vercel best practice: client-swr-dedup
 *
 * Features:
 * - Request deduplication (multiple components requesting same data make single call)
 * - Cache management with TTL
 * - Automatic revalidation on focus/reconnect
 * - Error retry logic
 * - TypeScript support
 */
export function useFetch<T>(
  url: string | null,
  options: FetchOptions = {}
): FetchState<T> & { mutate: (data?: T) => void; revalidate: () => Promise<void> } {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000, // 2 seconds deduping window
    refreshInterval,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
    isValidating: false,
  });

  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);
  const refreshIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Vercel best practice: rerender-functional-setstate
  // Use functional form of setState for callbacks that shouldn't change
  const updateState = useCallback((updates: Partial<FetchState<T>>) => {
    if (mountedRef.current) {
      setState(prev => ({ ...prev, ...updates }));
    }
  }, []);

  const fetcher = useCallback(async (fetchUrl: string, isBackground = false): Promise<T> => {
    const cacheKey = fetchUrl;
    const now = Date.now();
    const cached = cache.get(cacheKey);

    // Check if we have a valid cached response within deduping interval
    if (cached && (now - cached.timestamp) < dedupingInterval) {
      // If there's an ongoing request, wait for it (deduplication)
      if (cached.promise) {
        return cached.promise;
      }
      // Return cached data
      return cached.data;
    }

    // Create fetch promise
    const fetchPromise = fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    });

    // Store promise in cache for deduplication
    cache.set(cacheKey, {
      data: cached?.data,
      timestamp: now,
      promise: fetchPromise,
    });

    try {
      const data = await fetchPromise;

      // Update cache with successful response
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      // Notify all subscribers (multiple components using same URL)
      const subs = subscribers.get(cacheKey);
      if (subs) {
        subs.forEach(callback => callback(data));
      }

      retryCountRef.current = 0; // Reset retry count on success
      return data;
    } catch (error) {
      // Remove failed promise from cache
      cache.delete(cacheKey);
      throw error;
    }
  }, [dedupingInterval]);

  const revalidate = useCallback(async () => {
    if (!url) return;

    updateState({ isValidating: true });

    try {
      const data = await fetcher(url, true);
      updateState({
        data,
        error: null,
        isValidating: false,
      });
    } catch (error) {
      updateState({
        error: error as Error,
        isValidating: false,
      });
    }
  }, [url, fetcher, updateState]);

  const mutate = useCallback((data?: T) => {
    if (data !== undefined) {
      updateState({ data, error: null });
      if (url) {
        cache.set(url, { data, timestamp: Date.now() });
      }
    } else {
      revalidate();
    }
  }, [url, revalidate, updateState]);

  // Main fetch effect
  useEffect(() => {
    if (!url) {
      updateState({ data: null, isLoading: false, error: null });
      return;
    }

    let retryTimeout: NodeJS.Timeout;

    const fetchData = async () => {
      updateState({ isLoading: true, error: null });

      try {
        const data = await fetcher(url);
        updateState({
          data,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        const err = error as Error;

        // Exponential backoff retry (max 3 attempts)
        if (retryCountRef.current < 3) {
          const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 8000);
          retryCountRef.current++;

          retryTimeout = setTimeout(() => {
            if (mountedRef.current) {
              fetchData();
            }
          }, delay);
        } else {
          updateState({
            error: err,
            isLoading: false,
          });
        }
      }
    };

    fetchData();

    // Subscribe to cache updates
    const cacheKey = url;
    if (!subscribers.has(cacheKey)) {
      subscribers.set(cacheKey, new Set());
    }
    const callback = (data: T) => {
      updateState({ data });
    };
    subscribers.get(cacheKey)!.add(callback);

    return () => {
      clearTimeout(retryTimeout);
      subscribers.get(cacheKey)?.delete(callback);
      if (subscribers.get(cacheKey)?.size === 0) {
        subscribers.delete(cacheKey);
      }
    };
  }, [url, fetcher, updateState]);

  // Revalidate on focus (Vercel best practice: client-event-listeners)
  useEffect(() => {
    if (!revalidateOnFocus || !url) return;

    const handleFocus = () => {
      revalidate();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, url, revalidate]);

  // Revalidate on reconnect
  useEffect(() => {
    if (!revalidateOnReconnect || !url) return;

    const handleOnline = () => {
      revalidate();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [revalidateOnReconnect, url, revalidate]);

  // Periodic refresh
  useEffect(() => {
    if (!refreshInterval || !url) return;

    refreshIntervalRef.current = setInterval(() => {
      revalidate();
    }, refreshInterval);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [refreshInterval, url, revalidate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    ...state,
    mutate,
    revalidate,
  };
}

/**
 * Clear all cached data
 */
export function clearCache() {
  cache.clear();
}

/**
 * Clear specific cache entry
 */
export function clearCacheKey(key: string) {
  cache.delete(key);
}
