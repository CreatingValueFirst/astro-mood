'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, Briefcase, Star } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarryBackground } from '@/components/StarryBackground';
import { ZODIAC_SIGNS, ELEMENTS, MODALITIES, type ZodiacSign } from '@/lib/astrology/zodiac-data';
import { PLANETS } from '@/lib/astrology/planet-meanings';

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-600',
  air: 'from-cyan-500 to-blue-500',
  water: 'from-blue-600 to-purple-600',
};

const ELEMENT_ICONS = {
  fire: '🔥',
  earth: '🌍',
  air: '💨',
  water: '💧',
};

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'signs' | 'planets' | 'elements'>('signs');

  const selectedZodiacData = selectedSign ? ZODIAC_SIGNS[selectedSign.toLowerCase()] : null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white p-4 sm:p-6 md:p-8">
      <StarryBackground />

      <main className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              Astrology Encyclopedia
            </h1>
            <p className="text-gray-400 mt-2">
              Explore the wisdom of the zodiac, planets, and cosmic energies
            </p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="bg-gray-900/50 border border-purple-500/20">
            <TabsTrigger value="signs">Zodiac Signs</TabsTrigger>
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="elements">Elements & Modalities</TabsTrigger>
          </TabsList>

          {/* Zodiac Signs Tab */}
          <TabsContent value="signs" className="space-y-6">
            {!selectedSign ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {Object.entries(ZODIAC_SIGNS).map(([key, sign]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl cursor-pointer hover:border-purple-500/50 transition-all"
                      onClick={() => setSelectedSign(key)}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`text-6xl mb-2 bg-gradient-to-br ${
                            ELEMENT_COLORS[sign.element]
                          } bg-clip-text text-transparent`}
                        >
                          {sign.symbol}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{sign.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{sign.dates}</p>
                        <div className="flex justify-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {ELEMENT_ICONS[sign.element]} {sign.element}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {sign.modality}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSign}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSign(null)}
                    className="text-purple-300 hover:text-purple-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all signs
                  </Button>

                  {selectedZodiacData && (
                    <>
                      {/* Sign Header */}
                      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 backdrop-blur-xl">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6">
                            <div
                              className={`text-9xl bg-gradient-to-br ${
                                ELEMENT_COLORS[selectedZodiacData.element]
                              } bg-clip-text text-transparent`}
                            >
                              {selectedZodiacData.symbol}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-4xl font-bold text-white mb-2">
                                {selectedZodiacData.name}
                              </h2>
                              <p className="text-gray-300 mb-3">{selectedZodiacData.dates}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className="bg-purple-500/20 text-purple-300">
                                  {ELEMENT_ICONS[selectedZodiacData.element]}{' '}
                                  {selectedZodiacData.element} sign
                                </Badge>
                                <Badge className="bg-indigo-500/20 text-indigo-300">
                                  {selectedZodiacData.modality} modality
                                </Badge>
                                <Badge className="bg-pink-500/20 text-pink-300">
                                  ♃ Ruled by {selectedZodiacData.rulingPlanet}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedZodiacData.keywords.map((keyword) => (
                                  <span
                                    key={keyword}
                                    className="px-3 py-1 rounded-full bg-gray-800/50 text-sm text-gray-300"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Description */}
                      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-white">About {selectedZodiacData.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedZodiacData.description}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Strengths & Weaknesses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-green-900/20 border-green-500/30 backdrop-blur-xl">
                          <CardHeader>
                            <CardTitle className="text-green-300 flex items-center gap-2">
                              <Star className="w-5 h-5" />
                              Strengths
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedZodiacData.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-300">
                                  <span className="text-green-400 mt-1">✓</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-orange-900/20 border-orange-500/30 backdrop-blur-xl">
                          <CardHeader>
                            <CardTitle className="text-orange-300 flex items-center gap-2">
                              <Star className="w-5 h-5" />
                              Challenges
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedZodiacData.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-300">
                                  <span className="text-orange-400 mt-1">!</span>
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* In Love & At Work */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-pink-900/20 border-pink-500/30 backdrop-blur-xl">
                          <CardHeader>
                            <CardTitle className="text-pink-300 flex items-center gap-2">
                              <Heart className="w-5 h-5" />
                              {selectedZodiacData.name} in Love
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 leading-relaxed">
                              {selectedZodiacData.inLove}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-500/30 backdrop-blur-xl">
                          <CardHeader>
                            <CardTitle className="text-blue-300 flex items-center gap-2">
                              <Briefcase className="w-5 h-5" />
                              {selectedZodiacData.name} at Work
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 leading-relaxed">
                              {selectedZodiacData.atWork}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Compatibility */}
                      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-white">Compatibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                                Most Compatible With:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedZodiacData.compatibleSigns.map((sign) => (
                                  <Badge
                                    key={sign}
                                    className="bg-green-500/20 text-green-300 cursor-pointer hover:bg-green-500/30"
                                    onClick={() => setSelectedSign(sign.toLowerCase())}
                                  >
                                    {ZODIAC_SIGNS[sign.toLowerCase()].symbol} {sign}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                                Opposite Sign:
                              </h4>
                              <Badge
                                className="bg-purple-500/20 text-purple-300 cursor-pointer hover:bg-purple-500/30"
                                onClick={() =>
                                  setSelectedSign(selectedZodiacData.oppositeSign.toLowerCase())
                                }
                              >
                                {ZODIAC_SIGNS[selectedZodiacData.oppositeSign.toLowerCase()].symbol}{' '}
                                {selectedZodiacData.oppositeSign}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Additional Details */}
                      <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-white">Additional Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">Colors</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedZodiacData.colors.map((color) => (
                                  <span
                                    key={color}
                                    className="px-2 py-1 rounded bg-gray-800/50 text-xs text-gray-300"
                                  >
                                    {color}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                                Lucky Numbers
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedZodiacData.luckyNumbers.slice(0, 5).map((num) => (
                                  <span
                                    key={num}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/20 text-sm text-purple-300"
                                  >
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </TabsContent>

          {/* Planets Tab */}
          <TabsContent value="planets" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {Object.entries(PLANETS).map(([key, planet]) => (
                <Card
                  key={key}
                  className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl hover:border-purple-500/50 transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                      <span className="text-4xl">{planet.symbol}</span>
                      <div>
                        <div>{planet.name}</div>
                        <div className="text-sm font-normal text-gray-400">
                          Rules: {planet.rules.join(', ')}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Represents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {planet.represents.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{planet.description}</p>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-500">Orbital Period: {planet.orbitalPeriod}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Elements & Modalities Tab */}
          <TabsContent value="elements" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Elements */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Four Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(ELEMENTS).map(([key, element]) => (
                    <Card
                      key={key}
                      className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl"
                    >
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <span className="text-3xl">
                            {ELEMENT_ICONS[key as keyof typeof ELEMENT_ICONS]}
                          </span>
                          {element.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Signs: {element.signs.join(', ')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {element.traits.map((trait) => (
                            <Badge key={trait} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {element.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Modalities */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Three Modalities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(MODALITIES).map(([key, modality]) => (
                    <Card
                      key={key}
                      className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl"
                    >
                      <CardHeader>
                        <CardTitle className="text-white">{modality.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {modality.signs.join(', ')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {modality.traits.map((trait) => (
                            <Badge key={trait} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {modality.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
