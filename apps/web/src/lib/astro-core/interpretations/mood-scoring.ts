/**
 * Mood Scoring Model
 * Translates planetary transits into quantifiable mood impacts
 *
 * This is the heart of AstroMood - an explainable, deterministic algorithm
 * that converts astrological events into mood scores (0-100).
 */

import type {
  ZodiacSign,
  Planet,
  AspectType,
  MoodScore,
  MoodImpact,
  PlanetaryPosition,
} from '../types';
import { ZODIAC_SIGNS, calculateAngle } from '../calculations/zodiac';

// =====================================================
// Base Mood Score (Neutral)
// =====================================================
const BASELINE_MOOD: MoodScore = {
  overall: 60,
  energy: 60,
  focus: 60,
  romance: 60,
  stress: 40, // Lower is better for stress
  social: 60,
};

// =====================================================
// Planetary Influence Weights
// Each planet has different intensities of effect
// =====================================================
const PLANET_WEIGHTS: Record<Planet, number> = {
  Sun: 1.0,      // Core vitality and identity
  Moon: 0.9,     // Emotions and daily moods
  Mercury: 0.6,  // Communication and mental energy
  Venus: 0.7,    // Love, beauty, harmony
  Mars: 0.8,     // Energy, action, conflict
  Jupiter: 0.7,  // Expansion, optimism, luck
  Saturn: 0.8,   // Structure, discipline, challenges
  Uranus: 0.5,   // Sudden changes, innovation
  Neptune: 0.4,  // Dreams, confusion, spirituality
  Pluto: 0.5,    // Transformation, power
};

// =====================================================
// Planetary Effects on Mood Categories
// Positive values boost that mood aspect, negative values reduce it
// =====================================================
const PLANET_EFFECTS: Record<Planet, MoodImpact> = {
  Sun: {
    energy: 15,
    focus: 10,
    romance: 5,
    stress: -5,
    social: 10,
  },
  Moon: {
    energy: 5,
    focus: -5,
    romance: 10,
    stress: 5,
    social: 5,
  },
  Mercury: {
    energy: 5,
    focus: 15,
    romance: 0,
    stress: 0,
    social: 10,
  },
  Venus: {
    energy: 5,
    focus: 0,
    romance: 20,
    stress: -10,
    social: 15,
  },
  Mars: {
    energy: 20,
    focus: 10,
    romance: 10,
    stress: 10,
    social: -5,
  },
  Jupiter: {
    energy: 10,
    focus: 5,
    romance: 10,
    stress: -15,
    social: 15,
  },
  Saturn: {
    energy: -10,
    focus: 15,
    romance: -10,
    stress: 20,
    social: -10,
  },
  Uranus: {
    energy: 10,
    focus: -10,
    romance: 5,
    stress: 15,
    social: 10,
  },
  Neptune: {
    energy: -5,
    focus: -10,
    romance: 15,
    stress: 5,
    social: 5,
  },
  Pluto: {
    energy: 5,
    focus: 10,
    romance: 10,
    stress: 15,
    social: -5,
  },
};

// =====================================================
// Aspect Multipliers
// How aspects modify the base planetary effects
// =====================================================
const ASPECT_MULTIPLIERS: Record<AspectType, number> = {
  Conjunction: 1.2,   // Strong intensification
  Sextile: 0.5,       // Mild positive opportunity
  Square: -0.8,       // Challenging, creates tension
  Trine: 0.7,         // Harmonious, flowing energy
  Opposition: -0.6,   // Pull between opposing forces
};

// =====================================================
// Sign Compatibility Modifier
// How well a planet functions in a given sign
// =====================================================
function getSignCompatibility(planet: Planet, sign: ZodiacSign): number {
  const signInfo = ZODIAC_SIGNS[sign];

  // Planet in its ruling sign = strong positive
  if (signInfo.rulingPlanet === planet) {
    return 1.3;
  }

  // Planet in compatible element
  const planetElement = getElementForPlanet(planet);
  if (isCompatibleElement(planetElement, signInfo.element)) {
    return 1.1;
  }

  // Planet in incompatible element
  if (!isCompatibleElement(planetElement, signInfo.element)) {
    return 0.9;
  }

  return 1.0; // Neutral
}

// =====================================================
// Helper: Get element affinity for planets
// =====================================================
function getElementForPlanet(planet: Planet): string {
  const affinities: Record<Planet, string> = {
    Sun: 'Fire',
    Moon: 'Water',
    Mercury: 'Air',
    Venus: 'Earth',
    Mars: 'Fire',
    Jupiter: 'Fire',
    Saturn: 'Earth',
    Uranus: 'Air',
    Neptune: 'Water',
    Pluto: 'Water',
  };
  return affinities[planet];
}

function isCompatibleElement(elem1: string, elem2: string): boolean {
  // Fire + Air = compatible
  if ((elem1 === 'Fire' && elem2 === 'Air') || (elem1 === 'Air' && elem2 === 'Fire')) {
    return true;
  }
  // Earth + Water = compatible
  if ((elem1 === 'Earth' && elem2 === 'Water') || (elem1 === 'Water' && elem2 === 'Earth')) {
    return true;
  }
  // Same element = compatible
  return elem1 === elem2;
}

// =====================================================
// Calculate Transit Impact on Mood
// =====================================================
export function calculateTransitImpact(
  transitingPlanet: Planet,
  transitingSign: ZodiacSign,
  natalSunSign: ZodiacSign,
  aspectType?: AspectType
): MoodImpact {
  const baseEffect = PLANET_EFFECTS[transitingPlanet];
  const planetWeight = PLANET_WEIGHTS[transitingPlanet];
  const signCompatibility = getSignCompatibility(transitingPlanet, transitingSign);

  // Calculate aspect modifier
  let aspectModifier = 1.0;
  if (aspectType) {
    aspectModifier = ASPECT_MULTIPLIERS[aspectType];
  }

  // Calculate angle between transit sign and natal sun sign
  const signDistance = getSignDistance(transitingSign, natalSunSign);
  let positionModifier = 1.0;

  // Transit in your sun sign = strong personal impact
  if (signDistance === 0) {
    positionModifier = 1.3;
  }
  // Transit in opposite sign = external pressure
  else if (signDistance === 6) {
    positionModifier = 1.1;
  }
  // Transit in square (90°) = challenge
  else if (signDistance === 3 || signDistance === 9) {
    positionModifier = 1.0;
  }
  // Transit in trine (120°) = ease
  else if (signDistance === 4 || signDistance === 8) {
    positionModifier = 0.9;
  }

  // Apply all modifiers
  const totalModifier = planetWeight * signCompatibility * aspectModifier * positionModifier;

  return {
    energy: Math.round(baseEffect.energy * totalModifier),
    focus: Math.round(baseEffect.focus * totalModifier),
    romance: Math.round(baseEffect.romance * totalModifier),
    stress: Math.round(baseEffect.stress * totalModifier),
    social: Math.round(baseEffect.social * totalModifier),
  };
}

// =====================================================
// Get distance between signs (0-6)
// =====================================================
function getSignDistance(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const signs: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const index1 = signs.indexOf(sign1);
  const index2 = signs.indexOf(sign2);

  const distance = Math.abs(index1 - index2);
  return Math.min(distance, 12 - distance);
}

// =====================================================
// Calculate Daily Mood Score
// Combines all active transits for a given day
// =====================================================
export function calculateDailyMood(
  date: Date,
  natalSunSign: ZodiacSign,
  transits: Array<{
    planet: Planet;
    sign: ZodiacSign;
    aspectType?: AspectType;
  }>
): MoodScore {
  // Start with baseline
  let mood = { ...BASELINE_MOOD };

  // Apply each transit
  for (const transit of transits) {
    const impact = calculateTransitImpact(
      transit.planet,
      transit.sign,
      natalSunSign,
      transit.aspectType
    );

    mood.energy = clamp(mood.energy + impact.energy, 0, 100);
    mood.focus = clamp(mood.focus + impact.focus, 0, 100);
    mood.romance = clamp(mood.romance + impact.romance, 0, 100);
    mood.stress = clamp(mood.stress + impact.stress, 0, 100);
    mood.social = clamp(mood.social + impact.social, 0, 100);
  }

  // Calculate overall mood (weighted average)
  mood.overall = Math.round(
    (mood.energy * 0.25) +
    (mood.focus * 0.2) +
    (mood.romance * 0.15) +
    ((100 - mood.stress) * 0.25) + // Invert stress
    (mood.social * 0.15)
  );

  return mood;
}

// =====================================================
// Clamp value between min and max
// =====================================================
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// =====================================================
// Special Event Modifiers
// =====================================================

/**
 * Calculate impact of Mercury Retrograde
 */
export function getMercuryRetrogradeImpact(): MoodImpact {
  return {
    energy: -5,
    focus: -15,
    romance: -5,
    stress: 15,
    social: -10,
  };
}

/**
 * Calculate impact of New Moon
 */
export function getNewMoonImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact {
  const signCompatibility = getSignDistance(sign, natalSunSign) === 0 ? 1.3 : 1.0;

  return {
    energy: Math.round(10 * signCompatibility),
    focus: Math.round(5 * signCompatibility),
    romance: Math.round(5 * signCompatibility),
    stress: Math.round(-5 * signCompatibility),
    social: Math.round(5 * signCompatibility),
  };
}

/**
 * Calculate impact of Full Moon
 */
export function getFullMoonImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact {
  const signCompatibility = getSignDistance(sign, natalSunSign) === 0 ? 1.2 : 1.0;

  return {
    energy: Math.round(15 * signCompatibility),
    focus: Math.round(-10 * signCompatibility),
    romance: Math.round(15 * signCompatibility),
    stress: Math.round(10 * signCompatibility),
    social: Math.round(10 * signCompatibility),
  };
}

/**
 * Calculate impact of Eclipse
 */
export function getEclipseImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact {
  // Eclipses are 3x more intense than regular lunations
  const baseImpact = getFullMoonImpact(sign, natalSunSign);

  return {
    energy: baseImpact.energy * 3,
    focus: baseImpact.focus * 3,
    romance: baseImpact.romance * 3,
    stress: baseImpact.stress * 3,
    social: baseImpact.social * 3,
  };
}

// =====================================================
// Generate Explanations
// =====================================================

/**
 * Generate human-readable explanation for a mood impact
 */
export function explainMoodImpact(
  planet: Planet,
  sign: ZodiacSign,
  impact: MoodImpact,
  natalSunSign: ZodiacSign
): string {
  const planetName = planet;
  const signName = sign;

  const explanations: string[] = [];

  if (Math.abs(impact.energy) >= 10) {
    explanations.push(
      impact.energy > 0
        ? `${planetName} in ${signName} boosts your energy levels`
        : `${planetName} in ${signName} may drain your energy`
    );
  }

  if (Math.abs(impact.focus) >= 10) {
    explanations.push(
      impact.focus > 0
        ? `enhances mental clarity and concentration`
        : `makes it harder to focus on tasks`
    );
  }

  if (Math.abs(impact.romance) >= 10) {
    explanations.push(
      impact.romance > 0
        ? `brings positive romantic energy`
        : `may create challenges in relationships`
    );
  }

  if (Math.abs(impact.stress) >= 10) {
    explanations.push(
      impact.stress > 0
        ? `increases stress and tension`
        : `helps reduce stress and anxiety`
    );
  }

  if (Math.abs(impact.social) >= 10) {
    explanations.push(
      impact.social > 0
        ? `enhances social connections`
        : `may prefer solitude over socializing`
    );
  }

  return explanations.join(', ') || 'Minor influence on your mood';
}

/**
 * Get advice based on mood score
 */
export function getAdviceForMood(mood: MoodScore): {
  doList: string[];
  dontList: string[];
  affirmations: string[];
} {
  const doList: string[] = [];
  const dontList: string[] = [];
  const affirmations: string[] = [];

  // Energy-based advice
  if (mood.energy >= 75) {
    doList.push('Take on challenging projects');
    doList.push('Exercise or do physical activities');
    affirmations.push('I have abundant energy to accomplish my goals');
  } else if (mood.energy <= 40) {
    doList.push('Prioritize rest and self-care');
    dontList.push('Overcommit to demanding activities');
    affirmations.push('I honor my need for rest and restoration');
  }

  // Focus-based advice
  if (mood.focus >= 75) {
    doList.push('Work on important projects requiring concentration');
    doList.push('Plan and organize');
    affirmations.push('My mind is clear and focused');
  } else if (mood.focus <= 40) {
    dontList.push('Make major decisions');
    doList.push('Take breaks and practice mindfulness');
    affirmations.push('I give myself permission to go with the flow');
  }

  // Romance-based advice
  if (mood.romance >= 75) {
    doList.push('Plan quality time with loved ones');
    doList.push('Express appreciation and affection');
    affirmations.push('I attract and radiate love');
  } else if (mood.romance <= 40) {
    dontList.push('Have difficult relationship conversations');
    doList.push('Practice self-love and patience');
    affirmations.push('I am worthy of love and understanding');
  }

  // Stress-based advice
  if (mood.stress >= 70) {
    doList.push('Practice stress-relief techniques');
    doList.push('Set healthy boundaries');
    dontList.push('Take on additional responsibilities');
    affirmations.push('I release what I cannot control');
  } else if (mood.stress <= 30) {
    doList.push('Enjoy your sense of calm');
    affirmations.push('I am at peace with myself and my surroundings');
  }

  // Social-based advice
  if (mood.social >= 75) {
    doList.push('Connect with friends and community');
    doList.push('Attend social events');
    affirmations.push('I enjoy meaningful connections with others');
  } else if (mood.social <= 40) {
    doList.push('Honor your need for solitude');
    dontList.push('Force yourself into social situations');
    affirmations.push('Alone time nourishes my spirit');
  }

  return { doList, dontList, affirmations };
}
