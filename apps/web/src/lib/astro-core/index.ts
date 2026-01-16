/**
 * AstroMood Core Library
 * Astrological calculations and mood scoring engine
 */

// Export types
export * from './types';

// Export zodiac utilities
export {
  ZODIAC_SIGNS,
  ZODIAC_ORDER,
  longitudeToSign,
  getDegreeInSign,
  getSunSignFromDate,
  getElement,
  getModality,
  getRulingPlanet,
  areSignsCompatible,
  getOppositeSign,
  calculateAngle,
  getSignsByElement,
  getSignsByModality,
  formatZodiacPosition,
} from './calculations/zodiac';

// Export planetary calculations
export {
  calculatePlanetaryPositions,
  calculateNatalChart,
  findSignChanges,
  findRetrogradeStations,
  calculateLunations,
} from './calculations/planets';

// Export mood scoring
export {
  calculateTransitImpact,
  calculateDailyMood,
  getMercuryRetrogradeImpact,
  getNewMoonImpact,
  getFullMoonImpact,
  getEclipseImpact,
  explainMoodImpact,
  getAdviceForMood,
} from './interpretations/mood-scoring';
