'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NatalChart } from '@/lib/supabase/types';

interface AspectTableProps {
  chart: NatalChart;
}

const ASPECT_ANGLES = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180,
};

const ASPECT_SYMBOLS = {
  conjunction: '☌',
  sextile: '⚹',
  square: '□',
  trine: '△',
  opposition: '☍',
};

const ASPECT_COLORS = {
  conjunction: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  sextile: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  square: 'bg-red-500/20 text-red-400 border-red-500/30',
  trine: 'bg-green-500/20 text-green-400 border-green-500/30',
  opposition: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

const PLANET_SYMBOLS = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

function getAspectInterpretation(planet1: string, planet2: string, aspectType: string): string {
  const interpretations: Record<string, Record<string, string>> = {
    'sun-moon': {
      conjunction: 'Your conscious will and emotions are unified',
      sextile: 'Easy flow between your ego and feelings',
      square: 'Tension between what you want and what you need emotionally',
      trine: 'Natural harmony between your identity and emotions',
      opposition: 'Need to balance personal desires with emotional needs',
    },
    'sun-mercury': {
      conjunction: 'Your identity and communication style are closely linked',
      sextile: 'Easy expression of thoughts and ideas',
      square: 'Mental restlessness, nervous energy',
      trine: 'Natural talent for self-expression',
      opposition: 'Objectivity in self-expression',
    },
    'venus-mars': {
      conjunction: 'Passion and attraction are strongly blended',
      sextile: 'Balanced approach to love and desire',
      square: 'Tension between love and passion',
      trine: 'Natural romantic charm and magnetism',
      opposition: 'Attraction through contrast and polarity',
    },
    'jupiter-saturn': {
      conjunction: 'Balance between expansion and restriction',
      sextile: 'Practical optimism, grounded growth',
      square: 'Conflict between growth and limitation',
      trine: 'Sustainable expansion, wise ambition',
      opposition: 'Tension between freedom and responsibility',
    },
  };

  const key = [planet1, planet2].sort().join('-');
  return interpretations[key]?.[aspectType] || `${planet1} ${aspectType} ${planet2}`;
}

export function AspectTable({ chart }: AspectTableProps) {
  const aspects = useMemo(() => {
    const aspectList: Array<{
      planet1: string;
      planet2: string;
      type: string;
      angle: number;
      orb: number;
      interpretation: string;
    }> = [];

    const planets = Object.entries(chart.planets);
    const orbs = {
      conjunction: 8,
      sextile: 6,
      square: 8,
      trine: 8,
      opposition: 8,
    };

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const [name1, planet1] = planets[i];
        const [name2, planet2] = planets[j];

        const angle = Math.abs(planet1.longitude - planet2.longitude) % 360;
        const normalizedAngle = angle > 180 ? 360 - angle : angle;

        for (const [aspectType, targetAngle] of Object.entries(ASPECT_ANGLES)) {
          const difference = Math.abs(normalizedAngle - targetAngle);
          const orb = orbs[aspectType as keyof typeof orbs];

          if (difference <= orb) {
            aspectList.push({
              planet1: name1,
              planet2: name2,
              type: aspectType,
              angle: normalizedAngle,
              orb: difference,
              interpretation: getAspectInterpretation(name1, name2, aspectType),
            });
          }
        }
      }
    }

    // Sort by orb (tightest aspects first)
    return aspectList.sort((a, b) => a.orb - b.orb);
  }, [chart.planets]);

  // Group aspects by type
  const aspectsByType = useMemo(() => {
    const grouped: Record<string, typeof aspects> = {
      conjunction: [],
      sextile: [],
      square: [],
      trine: [],
      opposition: [],
    };

    aspects.forEach((aspect) => {
      if (grouped[aspect.type]) {
        grouped[aspect.type].push(aspect);
      }
    });

    return grouped;
  }, [aspects]);

  const aspectCounts = useMemo(() => {
    return {
      conjunction: aspectsByType.conjunction.length,
      sextile: aspectsByType.sextile.length,
      square: aspectsByType.square.length,
      trine: aspectsByType.trine.length,
      opposition: aspectsByType.opposition.length,
      total: aspects.length,
    };
  }, [aspectsByType, aspects]);

  return (
    <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          Planetary Aspects
          <Badge variant="secondary" className="ml-2">
            {aspectCounts.total} total
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Angles between planets in your natal chart
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(ASPECT_SYMBOLS).map(([type, symbol]) => (
            <Badge
              key={type}
              className={ASPECT_COLORS[type as keyof typeof ASPECT_COLORS]}
            >
              {symbol} {type} ({aspectCounts[type as keyof typeof aspectCounts]})
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(aspectsByType).map(([type, typeAspects]) => {
          if (typeAspects.length === 0) return null;

          return (
            <div key={type} className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 capitalize flex items-center gap-2">
                <span className="text-lg">
                  {ASPECT_SYMBOLS[type as keyof typeof ASPECT_SYMBOLS]}
                </span>
                {type} ({typeAspects.length})
              </h4>
              <div className="space-y-2">
                {typeAspects.map((aspect, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <span className="text-lg">
                        {PLANET_SYMBOLS[aspect.planet1 as keyof typeof PLANET_SYMBOLS]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ASPECT_SYMBOLS[aspect.type as keyof typeof ASPECT_SYMBOLS]}
                      </span>
                      <span className="text-lg">
                        {PLANET_SYMBOLS[aspect.planet2 as keyof typeof PLANET_SYMBOLS]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-white capitalize">
                          {aspect.planet1} {aspect.type} {aspect.planet2}
                        </span>
                        <span className="text-xs text-gray-500">
                          {aspect.angle.toFixed(1)}° (orb: {aspect.orb.toFixed(1)}°)
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{aspect.interpretation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {aspects.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No major aspects found in this chart
          </p>
        )}
      </CardContent>
    </Card>
  );
}
