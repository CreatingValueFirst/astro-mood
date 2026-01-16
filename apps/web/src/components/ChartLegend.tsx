'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PLANETS = [
  { name: 'Sun', symbol: '☉', color: '#FFD700', meaning: 'Core identity, ego, vitality' },
  { name: 'Moon', symbol: '☽', color: '#C0C0C0', meaning: 'Emotions, instincts, subconscious' },
  { name: 'Mercury', symbol: '☿', color: '#87CEEB', meaning: 'Communication, thinking, learning' },
  { name: 'Venus', symbol: '♀', color: '#FF69B4', meaning: 'Love, beauty, values' },
  { name: 'Mars', symbol: '♂', color: '#FF4500', meaning: 'Action, drive, passion' },
  { name: 'Jupiter', symbol: '♃', color: '#FFA500', meaning: 'Expansion, luck, wisdom' },
  { name: 'Saturn', symbol: '♄', color: '#8B4513', meaning: 'Discipline, responsibility, limits' },
  { name: 'Uranus', symbol: '♅', color: '#00CED1', meaning: 'Innovation, rebellion, change' },
  { name: 'Neptune', symbol: '♆', color: '#4169E1', meaning: 'Dreams, intuition, spirituality' },
  { name: 'Pluto', symbol: '♇', color: '#8B008B', meaning: 'Transformation, power, rebirth' },
];

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
  { name: 'Gemini', symbol: '♊', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
  { name: 'Cancer', symbol: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
  { name: 'Leo', symbol: '♌', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
  { name: 'Libra', symbol: '♎', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
  { name: 'Pisces', symbol: '♓', element: 'Water', quality: 'Mutable', ruler: 'Neptune' },
];

const ASPECTS = [
  {
    name: 'Conjunction',
    symbol: '☌',
    angle: '0°',
    color: '#FFD700',
    nature: 'Neutral',
    meaning: 'Blending of energies, powerful influence',
  },
  {
    name: 'Sextile',
    symbol: '⚹',
    angle: '60°',
    color: '#00CED1',
    nature: 'Harmonious',
    meaning: 'Opportunity, talent, ease',
  },
  {
    name: 'Square',
    symbol: '□',
    angle: '90°',
    color: '#FF4500',
    nature: 'Challenging',
    meaning: 'Tension, conflict, growth through challenge',
  },
  {
    name: 'Trine',
    symbol: '△',
    angle: '120°',
    color: '#32CD32',
    nature: 'Harmonious',
    meaning: 'Flow, natural talent, ease',
  },
  {
    name: 'Opposition',
    symbol: '☍',
    angle: '180°',
    color: '#FF1493',
    nature: 'Challenging',
    meaning: 'Polarity, awareness, balance needed',
  },
];

const ELEMENTS = [
  {
    name: 'Fire',
    signs: 'Aries, Leo, Sagittarius',
    keywords: 'Enthusiasm, passion, action, inspiration',
  },
  {
    name: 'Earth',
    signs: 'Taurus, Virgo, Capricorn',
    keywords: 'Practicality, stability, materialism, grounding',
  },
  {
    name: 'Air',
    signs: 'Gemini, Libra, Aquarius',
    keywords: 'Communication, intellect, ideas, connection',
  },
  {
    name: 'Water',
    signs: 'Cancer, Scorpio, Pisces',
    keywords: 'Emotion, intuition, sensitivity, depth',
  },
];

export function ChartLegend() {
  return (
    <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">Chart Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="planets" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="signs">Signs</TabsTrigger>
            <TabsTrigger value="aspects">Aspects</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
          </TabsList>

          <TabsContent value="planets" className="space-y-2 mt-4">
            {PLANETS.map((planet) => (
              <div
                key={planet.name}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: planet.color }}
                >
                  {planet.symbol}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{planet.name}</p>
                  <p className="text-xs text-gray-400">{planet.meaning}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="signs" className="space-y-2 mt-4">
            {ZODIAC_SIGNS.map((sign) => (
              <div
                key={sign.name}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-2xl font-bold text-purple-400">
                  {sign.symbol}
                </span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-white">{sign.name}</p>
                    <p className="text-xs text-gray-400">{sign.element}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">
                      {sign.quality}
                    </p>
                    <p className="text-xs text-gray-400">
                      Ruled by {sign.ruler}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="aspects" className="space-y-2 mt-4">
            {ASPECTS.map((aspect) => (
              <div
                key={aspect.name}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: aspect.color }}
                >
                  {aspect.symbol}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{aspect.name}</p>
                    <span className="text-xs text-gray-500">{aspect.angle}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                      {aspect.nature}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{aspect.meaning}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="elements" className="space-y-2 mt-4">
            {ELEMENTS.map((element) => (
              <div
                key={element.name}
                className="p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
              >
                <p className="text-sm font-medium text-white mb-1">{element.name}</p>
                <p className="text-xs text-purple-400 mb-2">{element.signs}</p>
                <p className="text-xs text-gray-400">{element.keywords}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
