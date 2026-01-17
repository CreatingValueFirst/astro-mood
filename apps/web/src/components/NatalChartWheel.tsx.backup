'use client';

import { useMemo } from 'react';
import { NatalChart } from '@/lib/supabase/types';

interface NatalChartWheelProps {
  chart: NatalChart;
  size?: number;
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', color: '#FF6B6B', element: 'fire' },
  { name: 'Taurus', symbol: '♉', color: '#4ECDC4', element: 'earth' },
  { name: 'Gemini', symbol: '♊', color: '#FFE66D', element: 'air' },
  { name: 'Cancer', symbol: '♋', color: '#A8DADC', element: 'water' },
  { name: 'Leo', symbol: '♌', color: '#FF6B6B', element: 'fire' },
  { name: 'Virgo', symbol: '♍', color: '#4ECDC4', element: 'earth' },
  { name: 'Libra', symbol: '♎', color: '#FFE66D', element: 'air' },
  { name: 'Scorpio', symbol: '♏', color: '#A8DADC', element: 'water' },
  { name: 'Sagittarius', symbol: '♐', color: '#FF6B6B', element: 'fire' },
  { name: 'Capricorn', symbol: '♑', color: '#4ECDC4', element: 'earth' },
  { name: 'Aquarius', symbol: '♒', color: '#FFE66D', element: 'air' },
  { name: 'Pisces', symbol: '♓', color: '#A8DADC', element: 'water' },
];

const PLANET_SYMBOLS = {
  sun: { symbol: '☉', color: '#FFD700', size: 20 },
  moon: { symbol: '☽', color: '#C0C0C0', size: 18 },
  mercury: { symbol: '☿', color: '#87CEEB', size: 14 },
  venus: { symbol: '♀', color: '#FF69B4', size: 16 },
  mars: { symbol: '♂', color: '#FF4500', size: 16 },
  jupiter: { symbol: '♃', color: '#FFA500', size: 18 },
  saturn: { symbol: '♄', color: '#8B4513', size: 18 },
  uranus: { symbol: '♅', color: '#00CED1', size: 16 },
  neptune: { symbol: '♆', color: '#4169E1', size: 16 },
  pluto: { symbol: '♇', color: '#8B008B', size: 14 },
};

const ASPECT_COLORS = {
  conjunction: '#FFD700',
  sextile: '#00CED1',
  square: '#FF4500',
  trine: '#32CD32',
  opposition: '#FF1493',
};

const ASPECT_ANGLES = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180,
};

export function NatalChartWheel({ chart, size = 600 }: NatalChartWheelProps) {
  const center = size / 2;
  const zodiacRadius = size * 0.42;
  const planetRadius = size * 0.32;
  const innerRadius = size * 0.15;

  // Calculate aspects between planets
  const aspects = useMemo(() => {
    const aspectList: Array<{
      planet1: string;
      planet2: string;
      type: string;
      angle: number;
      color: string;
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
              color: ASPECT_COLORS[aspectType as keyof typeof ASPECT_COLORS],
            });
          }
        }
      }
    }

    return aspectList;
  }, [chart.planets]);

  // Convert longitude to SVG coordinates
  const getCoordinates = (longitude: number, radius: number) => {
    // Adjust for chart orientation (0° = 9 o'clock position in astrology)
    const angle = (longitude - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Create zodiac wheel segments
  const zodiacSegments = ZODIAC_SIGNS.map((sign, index) => {
    const startAngle = index * 30 - 90; // Start from 0° Aries at 9 o'clock
    const endAngle = startAngle + 30;

    const startRad = startAngle * (Math.PI / 180);
    const endRad = endAngle * (Math.PI / 180);

    const outerStart = {
      x: center + zodiacRadius * Math.cos(startRad),
      y: center + zodiacRadius * Math.sin(startRad),
    };
    const outerEnd = {
      x: center + zodiacRadius * Math.cos(endRad),
      y: center + zodiacRadius * Math.sin(endRad),
    };
    const innerStart = {
      x: center + planetRadius * Math.cos(startRad),
      y: center + planetRadius * Math.sin(startRad),
    };
    const innerEnd = {
      x: center + planetRadius * Math.cos(endRad),
      y: center + planetRadius * Math.sin(endRad),
    };

    const path = `
      M ${outerStart.x} ${outerStart.y}
      A ${zodiacRadius} ${zodiacRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${planetRadius} ${planetRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
      Z
    `;

    const midAngle = (startAngle + endAngle) / 2 * (Math.PI / 180);
    const textRadius = (zodiacRadius + planetRadius) / 2;
    const textPos = {
      x: center + textRadius * Math.cos(midAngle),
      y: center + textRadius * Math.sin(midAngle),
    };

    return { sign, path, textPos, index };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {/* Background */}
      <circle
        cx={center}
        cy={center}
        r={zodiacRadius}
        fill="#1a1a2e"
        stroke="#9333ea"
        strokeWidth="2"
      />

      {/* Zodiac wheel segments */}
      {zodiacSegments.map(({ sign, path, textPos, index }) => (
        <g key={sign.name}>
          <path
            d={path}
            fill={index % 2 === 0 ? '#16213e' : '#0f1419'}
            stroke="#4a5568"
            strokeWidth="1"
            opacity="0.6"
          />
          <text
            x={textPos.x}
            y={textPos.y}
            fontSize="24"
            fill={sign.color}
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {sign.symbol}
          </text>
        </g>
      ))}

      {/* Degree markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30 - 90;
        const rad = angle * (Math.PI / 180);
        const start = {
          x: center + planetRadius * Math.cos(rad),
          y: center + planetRadius * Math.sin(rad),
        };
        const end = {
          x: center + zodiacRadius * Math.cos(rad),
          y: center + zodiacRadius * Math.sin(rad),
        };

        return (
          <line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="#4a5568"
            strokeWidth="2"
          />
        );
      })}

      {/* Aspect lines */}
      {aspects.map((aspect, index) => {
        const planet1 = chart.planets[aspect.planet1 as keyof typeof chart.planets];
        const planet2 = chart.planets[aspect.planet2 as keyof typeof chart.planets];

        const pos1 = getCoordinates(planet1.longitude, innerRadius);
        const pos2 = getCoordinates(planet2.longitude, innerRadius);

        return (
          <line
            key={index}
            x1={pos1.x}
            y1={pos1.y}
            x2={pos2.x}
            y2={pos2.y}
            stroke={aspect.color}
            strokeWidth="1.5"
            strokeOpacity="0.5"
            strokeDasharray={aspect.type === 'conjunction' ? '0' : '4,4'}
          />
        );
      })}

      {/* Inner circle */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill="#0f1419"
        stroke="#9333ea"
        strokeWidth="2"
      />

      {/* Planets */}
      {Object.entries(chart.planets).map(([name, planet]) => {
        const planetInfo = PLANET_SYMBOLS[name as keyof typeof PLANET_SYMBOLS];
        if (!planetInfo) return null;

        const pos = getCoordinates(planet.longitude, planetRadius);

        return (
          <g key={name}>
            {/* Planet marker line */}
            <line
              x1={center}
              y1={center}
              x2={pos.x}
              y2={pos.y}
              stroke={planetInfo.color}
              strokeWidth="1"
              strokeOpacity="0.3"
            />

            {/* Planet circle background */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={planetInfo.size / 1.5}
              fill="#1a1a2e"
              stroke={planetInfo.color}
              strokeWidth="2"
            />

            {/* Planet symbol */}
            <text
              x={pos.x}
              y={pos.y}
              fontSize={planetInfo.size}
              fill={planetInfo.color}
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="bold"
              style={{ textShadow: '0 0 3px #000' }}
            >
              {planetInfo.symbol}
            </text>

            {/* Retrograde indicator */}
            {planet.isRetrograde && (
              <text
                x={pos.x + planetInfo.size}
                y={pos.y - planetInfo.size / 2}
                fontSize="12"
                fill="#FF6B6B"
                fontWeight="bold"
              >
                ℞
              </text>
            )}
          </g>
        );
      })}

      {/* Center point */}
      <circle cx={center} cy={center} r="3" fill="#9333ea" />

      {/* Ascendant marker (if available) */}
      {chart.risingSign && (
        <>
          <line
            x1={center}
            y1={center}
            x2={center + zodiacRadius}
            y2={center}
            stroke="#FFD700"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          <text
            x={center + zodiacRadius + 20}
            y={center}
            fontSize="16"
            fill="#FFD700"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            ASC
          </text>
        </>
      )}

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#FFD700" />
        </marker>
      </defs>
    </svg>
  );
}
