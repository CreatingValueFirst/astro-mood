/**
 * Planetary position calculations using astronomy-engine
 */

import * as Astronomy from 'astronomy-engine';
import { longitudeToSign, getDegreeInSign } from './zodiac';
import type { Planet, PlanetaryPosition, BirthData } from '../types';

/**
 * Calculate planetary positions for a given date
 * @param date Date to calculate positions for
 * @returns Record of planetary positions
 */
export function calculatePlanetaryPositions(date: Date): Record<Planet, PlanetaryPosition> {
  const positions: Partial<Record<Planet, PlanetaryPosition>> = {};

  // Sun
  const sun = Astronomy.SunPosition(date);
  positions.Sun = {
    planet: 'Sun',
    longitude: sun.elon,
    latitude: sun.elat,
    sign: longitudeToSign(sun.elon),
    degree: getDegreeInSign(sun.elon),
    isRetrograde: false, // Sun never goes retrograde
  };

  // Moon
  const moonGeo = Astronomy.GeoMoon(date);
  const moonEcliptic = Astronomy.Ecliptic(moonGeo);
  positions.Moon = {
    planet: 'Moon',
    longitude: moonEcliptic.elon,
    latitude: moonEcliptic.elat,
    sign: longitudeToSign(moonEcliptic.elon),
    degree: getDegreeInSign(moonEcliptic.elon),
    isRetrograde: false, // Moon never goes retrograde
  };

  // Mercury
  const mercury = calculatePlanetPosition('Mercury', date);
  positions.Mercury = mercury;

  // Venus
  const venus = calculatePlanetPosition('Venus', date);
  positions.Venus = venus;

  // Mars
  const mars = calculatePlanetPosition('Mars', date);
  positions.Mars = mars;

  // Jupiter
  const jupiter = calculatePlanetPosition('Jupiter', date);
  positions.Jupiter = jupiter;

  // Saturn
  const saturn = calculatePlanetPosition('Saturn', date);
  positions.Saturn = saturn;

  // Uranus
  const uranus = calculatePlanetPosition('Uranus', date);
  positions.Uranus = uranus;

  // Neptune
  const neptune = calculatePlanetPosition('Neptune', date);
  positions.Neptune = neptune;

  // Pluto
  const pluto = calculatePlanetPosition('Pluto', date);
  positions.Pluto = pluto;

  return positions as Record<Planet, PlanetaryPosition>;
}

/**
 * Calculate position for a single planet
 */
function calculatePlanetPosition(planet: Exclude<Planet, 'Sun' | 'Moon'>, date: Date): PlanetaryPosition {
  const bodyName = planet as Astronomy.Body;
  const helioVector = Astronomy.HelioVector(bodyName, date);
  const geoVector = Astronomy.GeoVector(bodyName, date, false);
  const ecliptic = Astronomy.Ecliptic(geoVector);

  // Check if planet is retrograde by comparing velocity
  const isRetrograde = checkRetrograde(bodyName, date);

  return {
    planet,
    longitude: ecliptic.elon,
    latitude: ecliptic.elat,
    sign: longitudeToSign(ecliptic.elon),
    degree: getDegreeInSign(ecliptic.elon),
    isRetrograde,
  };
}

/**
 * Check if a planet is in retrograde motion
 * A planet is retrograde when its geocentric ecliptic longitude is decreasing
 */
function checkRetrograde(body: Astronomy.Body, date: Date): boolean {
  // Get positions 1 day before and 1 day after
  const oneDayMs = 24 * 60 * 60 * 1000;
  const before = new Date(date.getTime() - oneDayMs);
  const after = new Date(date.getTime() + oneDayMs);

  const geoVecBefore = Astronomy.GeoVector(body, before, false);
  const geoVecAfter = Astronomy.GeoVector(body, after, false);

  const eclipticBefore = Astronomy.Ecliptic(geoVecBefore);
  const eclipticAfter = Astronomy.Ecliptic(geoVecAfter);

  // Normalize longitudes to handle 360° wrap-around
  const lonBefore = eclipticBefore.elon;
  let lonAfter = eclipticAfter.elon;

  // Handle wrap-around (e.g., from 359° to 1°)
  if (Math.abs(lonAfter - lonBefore) > 180) {
    if (lonAfter < lonBefore) {
      lonAfter += 360;
    } else {
      lonAfter -= 360;
    }
  }

  // If longitude decreased, planet is retrograde
  return lonAfter < lonBefore;
}

/**
 * Calculate natal chart from birth data
 */
export function calculateNatalChart(birthData: BirthData) {
  const { date } = birthData;

  // Calculate planetary positions at birth
  const planets = calculatePlanetaryPositions(date);

  // Get Sun sign (always available)
  const sunSign = planets.Sun.sign;

  // Moon sign (available from basic ephemeris)
  const moonSign = planets.Moon.sign;

  // Rising sign (requires birth time and location)
  // For now, we'll set it to null - this requires more complex calculations
  const risingSign = null;

  // Calculate element and modality counts
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const modalities = { Cardinal: 0, Fixed: 0, Mutable: 0 };

  Object.values(planets).forEach(planet => {
    const signInfo = longitudeToSign(planet.longitude);
    // For now, just counting Sun and Moon
    // Full implementation would use zodiac sign info
  });

  // Houses (requires birth time and location)
  const houses = null;

  // Aspects (will implement separately)
  const aspects: any[] = [];

  return {
    birthData,
    sunSign,
    moonSign,
    risingSign,
    planets,
    houses,
    aspects,
    elements,
    modalities,
  };
}

/**
 * Find dates of planetary sign changes in a given month
 */
export function findSignChanges(year: number, month: number): Array<{
  planet: Planet;
  date: Date;
  fromSign: string;
  toSign: string;
}> {
  const changes: Array<{
    planet: Planet;
    date: Date;
    fromSign: string;
    toSign: string;
  }> = [];

  // Create date range for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  // Check each day
  const planetsToCheck: Planet[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

  for (const planet of planetsToCheck) {
    let currentDate = new Date(startDate);
    let previousSign: string | null = null;

    while (currentDate < endDate) {
      const positions = calculatePlanetaryPositions(currentDate);
      const currentSign = positions[planet].sign;

      if (previousSign && previousSign !== currentSign) {
        changes.push({
          planet,
          date: new Date(currentDate),
          fromSign: previousSign,
          toSign: currentSign,
        });
      }

      previousSign = currentSign;
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Next day
    }
  }

  return changes;
}

/**
 * Find retrograde stations (start/end) in a given month
 */
export function findRetrogradeStations(year: number, month: number): Array<{
  planet: Planet;
  date: Date;
  type: 'start' | 'end';
}> {
  const stations: Array<{
    planet: Planet;
    date: Date;
    type: 'start' | 'end';
  }> = [];

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  // Only check planets that can go retrograde
  const planetsToCheck: Exclude<Planet, 'Sun' | 'Moon'>[] = [
    'Mercury',
    'Venus',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
    'Pluto',
  ];

  for (const planet of planetsToCheck) {
    let currentDate = new Date(startDate);
    let previousRetrograde: boolean | null = null;

    while (currentDate < endDate) {
      const positions = calculatePlanetaryPositions(currentDate);
      const isRetrograde = positions[planet].isRetrograde;

      if (previousRetrograde !== null && previousRetrograde !== isRetrograde) {
        stations.push({
          planet,
          date: new Date(currentDate),
          type: isRetrograde ? 'start' : 'end',
        });
      }

      previousRetrograde = isRetrograde;
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Next day
    }
  }

  return stations;
}

/**
 * Calculate lunations (New and Full Moons) in a given month
 */
export function calculateLunations(year: number, month: number) {
  const lunations: Array<{
    type: 'new_moon' | 'full_moon';
    date: Date;
    sign: string;
    degree: number;
  }> = [];

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  // Search for New Moons (Sun-Moon conjunction)
  try {
    let searchDate = startDate;
    while (searchDate < endDate) {
      const newMoonAstroTime = Astronomy.SearchMoonPhase(0, searchDate, 40);
      if (newMoonAstroTime) {
        const newMoon = newMoonAstroTime.date;
        if (newMoon <= endDate) {
          const positions = calculatePlanetaryPositions(newMoon);
          lunations.push({
            type: 'new_moon',
            date: newMoon,
            sign: positions.Sun.sign,
            degree: positions.Sun.degree,
          });
          searchDate = new Date(newMoon.getTime() + 14 * 24 * 60 * 60 * 1000); // Skip ahead
        } else {
          break;
        }
      } else {
        break;
      }
    }

    // Search for Full Moons (Sun-Moon opposition)
    searchDate = startDate;
    while (searchDate < endDate) {
      const fullMoonAstroTime = Astronomy.SearchMoonPhase(180, searchDate, 40);
      if (fullMoonAstroTime) {
        const fullMoon = fullMoonAstroTime.date;
        if (fullMoon <= endDate) {
          const positions = calculatePlanetaryPositions(fullMoon);
          lunations.push({
            type: 'full_moon',
            date: fullMoon,
            sign: positions.Moon.sign,
            degree: positions.Moon.degree,
          });
          searchDate = new Date(fullMoon.getTime() + 14 * 24 * 60 * 60 * 1000); // Skip ahead
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } catch (error) {
    console.error('Error calculating lunations:', error);
  }

  // Sort by date
  lunations.sort((a, b) => a.date.getTime() - b.date.getTime());

  return lunations;
}
