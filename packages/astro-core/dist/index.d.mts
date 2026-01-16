/**
 * Core TypeScript types for AstroMood astrological calculations
 */
type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
type Modality = 'Cardinal' | 'Fixed' | 'Mutable';
interface ZodiacSignInfo {
    name: ZodiacSign;
    symbol: string;
    element: Element;
    modality: Modality;
    rulingPlanet: Planet;
    startDegree: number;
    endDegree: number;
    dates: string;
}
type Planet = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';
interface PlanetaryPosition {
    planet: Planet;
    longitude: number;
    latitude: number;
    sign: ZodiacSign;
    degree: number;
    isRetrograde: boolean;
}
type AspectType = 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
interface Aspect {
    planet1: Planet;
    planet2: Planet;
    type: AspectType;
    angle: number;
    orb: number;
    isApplying: boolean;
}
interface BirthData {
    date: Date;
    time?: string;
    location?: {
        latitude: number;
        longitude: number;
        timezone: string;
    };
}
interface NatalChart {
    birthData: BirthData;
    sunSign: ZodiacSign;
    moonSign: ZodiacSign | null;
    risingSign: ZodiacSign | null;
    planets: Record<Planet, PlanetaryPosition>;
    houses: number[] | null;
    aspects: Aspect[];
    elements: Record<Element, number>;
    modalities: Record<Modality, number>;
}
interface Transit {
    planet: Planet;
    eventType: 'sign_change' | 'retrograde_start' | 'retrograde_end' | 'aspect';
    date: Date;
    description: string;
    fromSign?: ZodiacSign;
    toSign?: ZodiacSign;
    affectedPlanet?: Planet;
    aspectType?: AspectType;
}
interface Lunation {
    type: 'new_moon' | 'full_moon' | 'first_quarter' | 'last_quarter';
    date: Date;
    sign: ZodiacSign;
    degree: number;
    isEclipse: boolean;
}
interface MoodScore {
    overall: number;
    energy: number;
    focus: number;
    romance: number;
    stress: number;
    social: number;
}
interface DailyMood extends MoodScore {
    date: string;
    keyEvents: string[];
}
interface MoodImpact {
    energy: number;
    focus: number;
    romance: number;
    stress: number;
    social: number;
}
interface TransitInterpretation {
    transit: Transit;
    moodImpact: MoodImpact;
    description: string;
    advice: string;
}
interface KeyDate {
    date: Date;
    event: string;
    type: 'lunation' | 'transit' | 'retrograde' | 'aspect' | 'eclipse';
    impact: 'low' | 'medium' | 'high';
    description: string;
}
interface WeeklyBreakdown {
    week: number;
    startDate: Date;
    endDate: Date;
    theme: string;
    averageMood: MoodScore;
    highlights: string[];
    advice: string;
}
interface MonthlyForecast {
    profileId: string;
    year: number;
    month: number;
    summary: string;
    overallMood: MoodScore;
    dailyMoods: DailyMood[];
    keyDates: KeyDate[];
    transits: TransitInterpretation[];
    weeklyBreakdowns: WeeklyBreakdown[];
    doList: string[];
    dontList: string[];
    affirmations: string[];
}
interface CalculationOptions {
    useHouses?: boolean;
    includeAspects?: boolean;
    aspectOrb?: number;
    includeMinorAspects?: boolean;
}
declare class AstroCalculationError extends Error {
    constructor(message: string);
}

/**
 * Zodiac sign calculations and utilities
 */

/**
 * Complete zodiac sign information database
 */
declare const ZODIAC_SIGNS: Record<ZodiacSign, ZodiacSignInfo>;
/**
 * Ordered array of zodiac signs (starting with Aries)
 */
declare const ZODIAC_ORDER: ZodiacSign[];
/**
 * Convert ecliptic longitude (0-360 degrees) to zodiac sign
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns Zodiac sign
 */
declare function longitudeToSign(longitude: number): ZodiacSign;
/**
 * Get the degree within a sign (0-29.999...)
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns Degree within the sign
 */
declare function getDegreeInSign(longitude: number): number;
/**
 * Get zodiac sign from a birth date (Sun sign only, approximate)
 * Note: This uses simplified date ranges and doesn't account for year-to-year variations
 * For precise Sun sign, use planetary calculations with exact birth time
 *
 * @param birthDate Date of birth
 * @returns Approximate Sun sign
 */
declare function getSunSignFromDate(birthDate: Date): ZodiacSign;
/**
 * Get element for a zodiac sign
 */
declare function getElement(sign: ZodiacSign): Element;
/**
 * Get modality for a zodiac sign
 */
declare function getModality(sign: ZodiacSign): Modality;
/**
 * Get ruling planet for a zodiac sign
 */
declare function getRulingPlanet(sign: ZodiacSign): Planet;
/**
 * Check if two signs are compatible (same element or complementary elements)
 */
declare function areSignsCompatible(sign1: ZodiacSign, sign2: ZodiacSign): boolean;
/**
 * Get the opposite sign (180 degrees apart)
 */
declare function getOppositeSign(sign: ZodiacSign): ZodiacSign;
/**
 * Calculate angle between two zodiac positions
 * @param lon1 First ecliptic longitude
 * @param lon2 Second ecliptic longitude
 * @returns Angle in degrees (0-180)
 */
declare function calculateAngle(lon1: number, lon2: number): number;
/**
 * Get all signs of a specific element
 */
declare function getSignsByElement(element: Element): ZodiacSign[];
/**
 * Get all signs of a specific modality
 */
declare function getSignsByModality(modality: Modality): ZodiacSign[];
/**
 * Format a zodiac position as a human-readable string
 * Example: "15° Aries" or "Cancer 22°"
 */
declare function formatZodiacPosition(longitude: number, format?: 'degree-sign' | 'sign-degree'): string;

/**
 * Calculate planetary positions for a given date
 * @param date Date to calculate positions for
 * @returns Record of planetary positions
 */
declare function calculatePlanetaryPositions(date: Date): Record<Planet, PlanetaryPosition>;
/**
 * Calculate natal chart from birth data
 */
declare function calculateNatalChart(birthData: BirthData): {
    birthData: BirthData;
    sunSign: ZodiacSign;
    moonSign: ZodiacSign;
    risingSign: null;
    planets: Record<Planet, PlanetaryPosition>;
    houses: null;
    aspects: any[];
    elements: {
        Fire: number;
        Earth: number;
        Air: number;
        Water: number;
    };
    modalities: {
        Cardinal: number;
        Fixed: number;
        Mutable: number;
    };
};
/**
 * Find dates of planetary sign changes in a given month
 */
declare function findSignChanges(year: number, month: number): Array<{
    planet: Planet;
    date: Date;
    fromSign: string;
    toSign: string;
}>;
/**
 * Find retrograde stations (start/end) in a given month
 */
declare function findRetrogradeStations(year: number, month: number): Array<{
    planet: Planet;
    date: Date;
    type: 'start' | 'end';
}>;
/**
 * Calculate lunations (New and Full Moons) in a given month
 */
declare function calculateLunations(year: number, month: number): {
    type: "new_moon" | "full_moon";
    date: Date;
    sign: string;
    degree: number;
}[];

/**
 * Mood Scoring Model
 * Translates planetary transits into quantifiable mood impacts
 *
 * This is the heart of AstroMood - an explainable, deterministic algorithm
 * that converts astrological events into mood scores (0-100).
 */

declare function calculateTransitImpact(transitingPlanet: Planet, transitingSign: ZodiacSign, natalSunSign: ZodiacSign, aspectType?: AspectType): MoodImpact;
declare function calculateDailyMood(date: Date, natalSunSign: ZodiacSign, transits: Array<{
    planet: Planet;
    sign: ZodiacSign;
    aspectType?: AspectType;
}>): MoodScore;
/**
 * Calculate impact of Mercury Retrograde
 */
declare function getMercuryRetrogradeImpact(): MoodImpact;
/**
 * Calculate impact of New Moon
 */
declare function getNewMoonImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact;
/**
 * Calculate impact of Full Moon
 */
declare function getFullMoonImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact;
/**
 * Calculate impact of Eclipse
 */
declare function getEclipseImpact(sign: ZodiacSign, natalSunSign: ZodiacSign): MoodImpact;
/**
 * Generate human-readable explanation for a mood impact
 */
declare function explainMoodImpact(planet: Planet, sign: ZodiacSign, impact: MoodImpact, natalSunSign: ZodiacSign): string;
/**
 * Get advice based on mood score
 */
declare function getAdviceForMood(mood: MoodScore): {
    doList: string[];
    dontList: string[];
    affirmations: string[];
};

export { type Aspect, type AspectType, AstroCalculationError, type BirthData, type CalculationOptions, type DailyMood, type Element, type KeyDate, type Lunation, type Modality, type MonthlyForecast, type MoodImpact, type MoodScore, type NatalChart, type Planet, type PlanetaryPosition, type Transit, type TransitInterpretation, type WeeklyBreakdown, ZODIAC_ORDER, ZODIAC_SIGNS, type ZodiacSign, type ZodiacSignInfo, areSignsCompatible, calculateAngle, calculateDailyMood, calculateLunations, calculateNatalChart, calculatePlanetaryPositions, calculateTransitImpact, explainMoodImpact, findRetrogradeStations, findSignChanges, formatZodiacPosition, getAdviceForMood, getDegreeInSign, getEclipseImpact, getElement, getFullMoonImpact, getMercuryRetrogradeImpact, getModality, getNewMoonImpact, getOppositeSign, getRulingPlanet, getSignsByElement, getSignsByModality, getSunSignFromDate, longitudeToSign };
