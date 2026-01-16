/**
 * Core TypeScript types for AstroMood astrological calculations
 */

// =====================================================
// Zodiac Signs
// =====================================================
export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
export type Modality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface ZodiacSignInfo {
  name: ZodiacSign;
  symbol: string;
  element: Element;
  modality: Modality;
  rulingPlanet: Planet;
  startDegree: number; // 0-360 ecliptic longitude
  endDegree: number;
  dates: string; // e.g., "March 21 - April 19"
}

// =====================================================
// Planets
// =====================================================
export type Planet =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto';

export interface PlanetaryPosition {
  planet: Planet;
  longitude: number; // 0-360 ecliptic longitude
  latitude: number; // ecliptic latitude
  sign: ZodiacSign;
  degree: number; // 0-30 within sign
  isRetrograde: boolean;
}

// =====================================================
// Aspects
// =====================================================
export type AspectType =
  | 'Conjunction'     // 0°
  | 'Sextile'         // 60°
  | 'Square'          // 90°
  | 'Trine'           // 120°
  | 'Opposition';     // 180°

export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  angle: number; // exact angle in degrees
  orb: number; // deviation from exact aspect
  isApplying: boolean; // aspect getting closer vs separating
}

// =====================================================
// Natal Chart
// =====================================================
export interface BirthData {
  date: Date;
  time?: string; // HH:MM format, optional
  location?: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

export interface NatalChart {
  birthData: BirthData;
  sunSign: ZodiacSign;
  moonSign: ZodiacSign | null; // requires birth time
  risingSign: ZodiacSign | null; // requires birth time + location
  planets: Record<Planet, PlanetaryPosition>;
  houses: number[] | null; // 12 house cusps, requires birth time + location
  aspects: Aspect[];
  elements: Record<Element, number>; // count of planets in each element
  modalities: Record<Modality, number>; // count of planets in each modality
}

// =====================================================
// Transits
// =====================================================
export interface Transit {
  planet: Planet;
  eventType: 'sign_change' | 'retrograde_start' | 'retrograde_end' | 'aspect';
  date: Date;
  description: string;
  fromSign?: ZodiacSign;
  toSign?: ZodiacSign;
  affectedPlanet?: Planet; // for aspects
  aspectType?: AspectType; // for aspects
}

export interface Lunation {
  type: 'new_moon' | 'full_moon' | 'first_quarter' | 'last_quarter';
  date: Date;
  sign: ZodiacSign;
  degree: number;
  isEclipse: boolean;
}

// =====================================================
// Mood Scoring
// =====================================================
export interface MoodScore {
  overall: number; // 0-100
  energy: number; // 0-100
  focus: number; // 0-100
  romance: number; // 0-100
  stress: number; // 0-100 (inverted: higher = more stress)
  social: number; // 0-100
}

export interface DailyMood extends MoodScore {
  date: string; // YYYY-MM-DD
  keyEvents: string[]; // brief descriptions
}

export interface MoodImpact {
  energy: number; // -50 to +50
  focus: number;
  romance: number;
  stress: number; // positive = more stress
  social: number;
}

export interface TransitInterpretation {
  transit: Transit;
  moodImpact: MoodImpact;
  description: string;
  advice: string;
}

// =====================================================
// Forecast
// =====================================================
export interface KeyDate {
  date: Date;
  event: string;
  type: 'lunation' | 'transit' | 'retrograde' | 'aspect' | 'eclipse';
  impact: 'low' | 'medium' | 'high';
  description: string;
}

export interface WeeklyBreakdown {
  week: number; // 1-5
  startDate: Date;
  endDate: Date;
  theme: string;
  averageMood: MoodScore;
  highlights: string[];
  advice: string;
}

export interface MonthlyForecast {
  profileId: string;
  year: number;
  month: number; // 1-12
  summary: string;
  overallMood: MoodScore;
  dailyMoods: DailyMood[];
  keyDates: KeyDate[];
  transits: TransitInterpretation[];
  weeklyBreakdowns: WeeklyBreakdown[];
  doList: string[]; // recommended actions
  dontList: string[]; // things to avoid
  affirmations: string[];
}

// =====================================================
// Calculation Options
// =====================================================
export interface CalculationOptions {
  useHouses?: boolean; // requires birth time + location
  includeAspects?: boolean;
  aspectOrb?: number; // default 8 degrees
  includeMinorAspects?: boolean; // quintile, biquintile, etc.
}

// =====================================================
// Errors
// =====================================================
export class AstroCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AstroCalculationError';
  }
}
