/**
 * Zodiac sign calculations and utilities
 */

import type { ZodiacSign, Element, Modality, Planet, ZodiacSignInfo } from '../types';

/**
 * Complete zodiac sign information database
 */
export const ZODIAC_SIGNS: Record<ZodiacSign, ZodiacSignInfo> = {
  Aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    startDegree: 0,
    endDegree: 30,
    dates: 'March 21 - April 19',
  },
  Taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    startDegree: 30,
    endDegree: 60,
    dates: 'April 20 - May 20',
  },
  Gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    startDegree: 60,
    endDegree: 90,
    dates: 'May 21 - June 20',
  },
  Cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    startDegree: 90,
    endDegree: 120,
    dates: 'June 21 - July 22',
  },
  Leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    startDegree: 120,
    endDegree: 150,
    dates: 'July 23 - August 22',
  },
  Virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    startDegree: 150,
    endDegree: 180,
    dates: 'August 23 - September 22',
  },
  Libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    startDegree: 180,
    endDegree: 210,
    dates: 'September 23 - October 22',
  },
  Scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto',
    startDegree: 210,
    endDegree: 240,
    dates: 'October 23 - November 21',
  },
  Sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    startDegree: 240,
    endDegree: 270,
    dates: 'November 22 - December 21',
  },
  Capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    startDegree: 270,
    endDegree: 300,
    dates: 'December 22 - January 19',
  },
  Aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus',
    startDegree: 300,
    endDegree: 330,
    dates: 'January 20 - February 18',
  },
  Pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    startDegree: 330,
    endDegree: 360,
    dates: 'February 19 - March 20',
  },
};

/**
 * Ordered array of zodiac signs (starting with Aries)
 */
export const ZODIAC_ORDER: ZodiacSign[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

/**
 * Convert ecliptic longitude (0-360 degrees) to zodiac sign
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns Zodiac sign
 */
export function longitudeToSign(longitude: number): ZodiacSign {
  // Normalize longitude to 0-360
  const normalizedLon = ((longitude % 360) + 360) % 360;

  // Each sign is 30 degrees
  const signIndex = Math.floor(normalizedLon / 30);

  return ZODIAC_ORDER[signIndex];
}

/**
 * Get the degree within a sign (0-29.999...)
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns Degree within the sign
 */
export function getDegreeInSign(longitude: number): number {
  const normalizedLon = ((longitude % 360) + 360) % 360;
  return normalizedLon % 30;
}

/**
 * Get zodiac sign from a birth date (Sun sign only, approximate)
 * Note: This uses simplified date ranges and doesn't account for year-to-year variations
 * For precise Sun sign, use planetary calculations with exact birth time
 *
 * @param birthDate Date of birth
 * @returns Approximate Sun sign
 */
export function getSunSignFromDate(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1; // 1-12
  const day = birthDate.getDate();

  // Approximate Sun sign boundaries (tropical zodiac)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

  // Fallback (shouldn't reach here)
  return 'Aries';
}

/**
 * Get element for a zodiac sign
 */
export function getElement(sign: ZodiacSign): Element {
  return ZODIAC_SIGNS[sign].element;
}

/**
 * Get modality for a zodiac sign
 */
export function getModality(sign: ZodiacSign): Modality {
  return ZODIAC_SIGNS[sign].modality;
}

/**
 * Get ruling planet for a zodiac sign
 */
export function getRulingPlanet(sign: ZodiacSign): Planet {
  return ZODIAC_SIGNS[sign].rulingPlanet;
}

/**
 * Check if two signs are compatible (same element or complementary elements)
 */
export function areSignsCompatible(sign1: ZodiacSign, sign2: ZodiacSign): boolean {
  const elem1 = getElement(sign1);
  const elem2 = getElement(sign2);

  // Same element = compatible
  if (elem1 === elem2) return true;

  // Fire + Air = compatible
  if ((elem1 === 'Fire' && elem2 === 'Air') || (elem1 === 'Air' && elem2 === 'Fire')) {
    return true;
  }

  // Earth + Water = compatible
  if ((elem1 === 'Earth' && elem2 === 'Water') || (elem1 === 'Water' && elem2 === 'Earth')) {
    return true;
  }

  return false;
}

/**
 * Get the opposite sign (180 degrees apart)
 */
export function getOppositeSign(sign: ZodiacSign): ZodiacSign {
  const index = ZODIAC_ORDER.indexOf(sign);
  const oppositeIndex = (index + 6) % 12;
  return ZODIAC_ORDER[oppositeIndex];
}

/**
 * Calculate angle between two zodiac positions
 * @param lon1 First ecliptic longitude
 * @param lon2 Second ecliptic longitude
 * @returns Angle in degrees (0-180)
 */
export function calculateAngle(lon1: number, lon2: number): number {
  const diff = Math.abs(lon1 - lon2);
  // Return the shorter arc
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Get all signs of a specific element
 */
export function getSignsByElement(element: Element): ZodiacSign[] {
  return ZODIAC_ORDER.filter(sign => getElement(sign) === element);
}

/**
 * Get all signs of a specific modality
 */
export function getSignsByModality(modality: Modality): ZodiacSign[] {
  return ZODIAC_ORDER.filter(sign => getModality(sign) === modality);
}

/**
 * Format a zodiac position as a human-readable string
 * Example: "15° Aries" or "Cancer 22°"
 */
export function formatZodiacPosition(
  longitude: number,
  format: 'degree-sign' | 'sign-degree' = 'degree-sign'
): string {
  const sign = longitudeToSign(longitude);
  const degree = Math.floor(getDegreeInSign(longitude));

  if (format === 'degree-sign') {
    return `${degree}° ${sign}`;
  } else {
    return `${sign} ${degree}°`;
  }
}
