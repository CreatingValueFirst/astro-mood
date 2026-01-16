"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AstroCalculationError: () => AstroCalculationError,
  ZODIAC_ORDER: () => ZODIAC_ORDER,
  ZODIAC_SIGNS: () => ZODIAC_SIGNS,
  areSignsCompatible: () => areSignsCompatible,
  calculateAngle: () => calculateAngle,
  calculateDailyMood: () => calculateDailyMood,
  calculateLunations: () => calculateLunations,
  calculateNatalChart: () => calculateNatalChart,
  calculatePlanetaryPositions: () => calculatePlanetaryPositions,
  calculateTransitImpact: () => calculateTransitImpact,
  explainMoodImpact: () => explainMoodImpact,
  findRetrogradeStations: () => findRetrogradeStations,
  findSignChanges: () => findSignChanges,
  formatZodiacPosition: () => formatZodiacPosition,
  getAdviceForMood: () => getAdviceForMood,
  getDegreeInSign: () => getDegreeInSign,
  getEclipseImpact: () => getEclipseImpact,
  getElement: () => getElement,
  getFullMoonImpact: () => getFullMoonImpact,
  getMercuryRetrogradeImpact: () => getMercuryRetrogradeImpact,
  getModality: () => getModality,
  getNewMoonImpact: () => getNewMoonImpact,
  getOppositeSign: () => getOppositeSign,
  getRulingPlanet: () => getRulingPlanet,
  getSignsByElement: () => getSignsByElement,
  getSignsByModality: () => getSignsByModality,
  getSunSignFromDate: () => getSunSignFromDate,
  longitudeToSign: () => longitudeToSign
});
module.exports = __toCommonJS(index_exports);

// src/types.ts
var AstroCalculationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AstroCalculationError";
  }
};

// src/calculations/zodiac.ts
var ZODIAC_SIGNS = {
  Aries: {
    name: "Aries",
    symbol: "\u2648",
    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    startDegree: 0,
    endDegree: 30,
    dates: "March 21 - April 19"
  },
  Taurus: {
    name: "Taurus",
    symbol: "\u2649",
    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",
    startDegree: 30,
    endDegree: 60,
    dates: "April 20 - May 20"
  },
  Gemini: {
    name: "Gemini",
    symbol: "\u264A",
    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    startDegree: 60,
    endDegree: 90,
    dates: "May 21 - June 20"
  },
  Cancer: {
    name: "Cancer",
    symbol: "\u264B",
    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    startDegree: 90,
    endDegree: 120,
    dates: "June 21 - July 22"
  },
  Leo: {
    name: "Leo",
    symbol: "\u264C",
    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",
    startDegree: 120,
    endDegree: 150,
    dates: "July 23 - August 22"
  },
  Virgo: {
    name: "Virgo",
    symbol: "\u264D",
    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    startDegree: 150,
    endDegree: 180,
    dates: "August 23 - September 22"
  },
  Libra: {
    name: "Libra",
    symbol: "\u264E",
    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    startDegree: 180,
    endDegree: 210,
    dates: "September 23 - October 22"
  },
  Scorpio: {
    name: "Scorpio",
    symbol: "\u264F",
    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto",
    startDegree: 210,
    endDegree: 240,
    dates: "October 23 - November 21"
  },
  Sagittarius: {
    name: "Sagittarius",
    symbol: "\u2650",
    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    startDegree: 240,
    endDegree: 270,
    dates: "November 22 - December 21"
  },
  Capricorn: {
    name: "Capricorn",
    symbol: "\u2651",
    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    startDegree: 270,
    endDegree: 300,
    dates: "December 22 - January 19"
  },
  Aquarius: {
    name: "Aquarius",
    symbol: "\u2652",
    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus",
    startDegree: 300,
    endDegree: 330,
    dates: "January 20 - February 18"
  },
  Pisces: {
    name: "Pisces",
    symbol: "\u2653",
    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune",
    startDegree: 330,
    endDegree: 360,
    dates: "February 19 - March 20"
  }
};
var ZODIAC_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];
function longitudeToSign(longitude) {
  const normalizedLon = (longitude % 360 + 360) % 360;
  const signIndex = Math.floor(normalizedLon / 30);
  return ZODIAC_ORDER[signIndex];
}
function getDegreeInSign(longitude) {
  const normalizedLon = (longitude % 360 + 360) % 360;
  return normalizedLon % 30;
}
function getSunSignFromDate(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  if (month === 3 && day >= 21 || month === 4 && day <= 19) return "Aries";
  if (month === 4 && day >= 20 || month === 5 && day <= 20) return "Taurus";
  if (month === 5 && day >= 21 || month === 6 && day <= 20) return "Gemini";
  if (month === 6 && day >= 21 || month === 7 && day <= 22) return "Cancer";
  if (month === 7 && day >= 23 || month === 8 && day <= 22) return "Leo";
  if (month === 8 && day >= 23 || month === 9 && day <= 22) return "Virgo";
  if (month === 9 && day >= 23 || month === 10 && day <= 22) return "Libra";
  if (month === 10 && day >= 23 || month === 11 && day <= 21) return "Scorpio";
  if (month === 11 && day >= 22 || month === 12 && day <= 21) return "Sagittarius";
  if (month === 12 && day >= 22 || month === 1 && day <= 19) return "Capricorn";
  if (month === 1 && day >= 20 || month === 2 && day <= 18) return "Aquarius";
  if (month === 2 && day >= 19 || month === 3 && day <= 20) return "Pisces";
  return "Aries";
}
function getElement(sign) {
  return ZODIAC_SIGNS[sign].element;
}
function getModality(sign) {
  return ZODIAC_SIGNS[sign].modality;
}
function getRulingPlanet(sign) {
  return ZODIAC_SIGNS[sign].rulingPlanet;
}
function areSignsCompatible(sign1, sign2) {
  const elem1 = getElement(sign1);
  const elem2 = getElement(sign2);
  if (elem1 === elem2) return true;
  if (elem1 === "Fire" && elem2 === "Air" || elem1 === "Air" && elem2 === "Fire") {
    return true;
  }
  if (elem1 === "Earth" && elem2 === "Water" || elem1 === "Water" && elem2 === "Earth") {
    return true;
  }
  return false;
}
function getOppositeSign(sign) {
  const index = ZODIAC_ORDER.indexOf(sign);
  const oppositeIndex = (index + 6) % 12;
  return ZODIAC_ORDER[oppositeIndex];
}
function calculateAngle(lon1, lon2) {
  const diff = Math.abs(lon1 - lon2);
  return diff > 180 ? 360 - diff : diff;
}
function getSignsByElement(element) {
  return ZODIAC_ORDER.filter((sign) => getElement(sign) === element);
}
function getSignsByModality(modality) {
  return ZODIAC_ORDER.filter((sign) => getModality(sign) === modality);
}
function formatZodiacPosition(longitude, format = "degree-sign") {
  const sign = longitudeToSign(longitude);
  const degree = Math.floor(getDegreeInSign(longitude));
  if (format === "degree-sign") {
    return `${degree}\xB0 ${sign}`;
  } else {
    return `${sign} ${degree}\xB0`;
  }
}

// src/calculations/planets.ts
var Astronomy = __toESM(require("astronomy-engine"));
function calculatePlanetaryPositions(date) {
  const positions = {};
  const sun = Astronomy.SunPosition(date);
  positions.Sun = {
    planet: "Sun",
    longitude: sun.elon,
    latitude: sun.elat,
    sign: longitudeToSign(sun.elon),
    degree: getDegreeInSign(sun.elon),
    isRetrograde: false
    // Sun never goes retrograde
  };
  const moonGeo = Astronomy.GeoMoon(date);
  const moonEcliptic = Astronomy.Ecliptic(moonGeo);
  positions.Moon = {
    planet: "Moon",
    longitude: moonEcliptic.elon,
    latitude: moonEcliptic.elat,
    sign: longitudeToSign(moonEcliptic.elon),
    degree: getDegreeInSign(moonEcliptic.elon),
    isRetrograde: false
    // Moon never goes retrograde
  };
  const mercury = calculatePlanetPosition("Mercury", date);
  positions.Mercury = mercury;
  const venus = calculatePlanetPosition("Venus", date);
  positions.Venus = venus;
  const mars = calculatePlanetPosition("Mars", date);
  positions.Mars = mars;
  const jupiter = calculatePlanetPosition("Jupiter", date);
  positions.Jupiter = jupiter;
  const saturn = calculatePlanetPosition("Saturn", date);
  positions.Saturn = saturn;
  const uranus = calculatePlanetPosition("Uranus", date);
  positions.Uranus = uranus;
  const neptune = calculatePlanetPosition("Neptune", date);
  positions.Neptune = neptune;
  const pluto = calculatePlanetPosition("Pluto", date);
  positions.Pluto = pluto;
  return positions;
}
function calculatePlanetPosition(planet, date) {
  const bodyName = planet;
  const helioVector = Astronomy.HelioVector(bodyName, date);
  const geoVector = Astronomy.GeoVector(bodyName, date, false);
  const ecliptic = Astronomy.Ecliptic(geoVector);
  const isRetrograde = checkRetrograde(bodyName, date);
  return {
    planet,
    longitude: ecliptic.elon,
    latitude: ecliptic.elat,
    sign: longitudeToSign(ecliptic.elon),
    degree: getDegreeInSign(ecliptic.elon),
    isRetrograde
  };
}
function checkRetrograde(body, date) {
  const oneDayMs = 24 * 60 * 60 * 1e3;
  const before = new Date(date.getTime() - oneDayMs);
  const after = new Date(date.getTime() + oneDayMs);
  const geoVecBefore = Astronomy.GeoVector(body, before, false);
  const geoVecAfter = Astronomy.GeoVector(body, after, false);
  const eclipticBefore = Astronomy.Ecliptic(geoVecBefore);
  const eclipticAfter = Astronomy.Ecliptic(geoVecAfter);
  const lonBefore = eclipticBefore.elon;
  let lonAfter = eclipticAfter.elon;
  if (Math.abs(lonAfter - lonBefore) > 180) {
    if (lonAfter < lonBefore) {
      lonAfter += 360;
    } else {
      lonAfter -= 360;
    }
  }
  return lonAfter < lonBefore;
}
function calculateNatalChart(birthData) {
  const { date } = birthData;
  const planets = calculatePlanetaryPositions(date);
  const sunSign = planets.Sun.sign;
  const moonSign = planets.Moon.sign;
  const risingSign = null;
  const elements = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const modalities = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  Object.values(planets).forEach((planet) => {
    const signInfo = longitudeToSign(planet.longitude);
  });
  const houses = null;
  const aspects = [];
  return {
    birthData,
    sunSign,
    moonSign,
    risingSign,
    planets,
    houses,
    aspects,
    elements,
    modalities
  };
}
function findSignChanges(year, month) {
  const changes = [];
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  const planetsToCheck = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  for (const planet of planetsToCheck) {
    let currentDate = new Date(startDate);
    let previousSign = null;
    while (currentDate < endDate) {
      const positions = calculatePlanetaryPositions(currentDate);
      const currentSign = positions[planet].sign;
      if (previousSign && previousSign !== currentSign) {
        changes.push({
          planet,
          date: new Date(currentDate),
          fromSign: previousSign,
          toSign: currentSign
        });
      }
      previousSign = currentSign;
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1e3);
    }
  }
  return changes;
}
function findRetrogradeStations(year, month) {
  const stations = [];
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  const planetsToCheck = [
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto"
  ];
  for (const planet of planetsToCheck) {
    let currentDate = new Date(startDate);
    let previousRetrograde = null;
    while (currentDate < endDate) {
      const positions = calculatePlanetaryPositions(currentDate);
      const isRetrograde = positions[planet].isRetrograde;
      if (previousRetrograde !== null && previousRetrograde !== isRetrograde) {
        stations.push({
          planet,
          date: new Date(currentDate),
          type: isRetrograde ? "start" : "end"
        });
      }
      previousRetrograde = isRetrograde;
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1e3);
    }
  }
  return stations;
}
function calculateLunations(year, month) {
  const lunations = [];
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  try {
    let searchDate = startDate;
    while (searchDate < endDate) {
      const newMoonAstroTime = Astronomy.SearchMoonPhase(0, searchDate, 40);
      if (newMoonAstroTime) {
        const newMoon = newMoonAstroTime.date;
        if (newMoon <= endDate) {
          const positions = calculatePlanetaryPositions(newMoon);
          lunations.push({
            type: "new_moon",
            date: newMoon,
            sign: positions.Sun.sign,
            degree: positions.Sun.degree
          });
          searchDate = new Date(newMoon.getTime() + 14 * 24 * 60 * 60 * 1e3);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    searchDate = startDate;
    while (searchDate < endDate) {
      const fullMoonAstroTime = Astronomy.SearchMoonPhase(180, searchDate, 40);
      if (fullMoonAstroTime) {
        const fullMoon = fullMoonAstroTime.date;
        if (fullMoon <= endDate) {
          const positions = calculatePlanetaryPositions(fullMoon);
          lunations.push({
            type: "full_moon",
            date: fullMoon,
            sign: positions.Moon.sign,
            degree: positions.Moon.degree
          });
          searchDate = new Date(fullMoon.getTime() + 14 * 24 * 60 * 60 * 1e3);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } catch (error) {
    console.error("Error calculating lunations:", error);
  }
  lunations.sort((a, b) => a.date.getTime() - b.date.getTime());
  return lunations;
}

// src/interpretations/mood-scoring.ts
var BASELINE_MOOD = {
  overall: 60,
  energy: 60,
  focus: 60,
  romance: 60,
  stress: 40,
  // Lower is better for stress
  social: 60
};
var PLANET_WEIGHTS = {
  Sun: 1,
  // Core vitality and identity
  Moon: 0.9,
  // Emotions and daily moods
  Mercury: 0.6,
  // Communication and mental energy
  Venus: 0.7,
  // Love, beauty, harmony
  Mars: 0.8,
  // Energy, action, conflict
  Jupiter: 0.7,
  // Expansion, optimism, luck
  Saturn: 0.8,
  // Structure, discipline, challenges
  Uranus: 0.5,
  // Sudden changes, innovation
  Neptune: 0.4,
  // Dreams, confusion, spirituality
  Pluto: 0.5
  // Transformation, power
};
var PLANET_EFFECTS = {
  Sun: {
    energy: 15,
    focus: 10,
    romance: 5,
    stress: -5,
    social: 10
  },
  Moon: {
    energy: 5,
    focus: -5,
    romance: 10,
    stress: 5,
    social: 5
  },
  Mercury: {
    energy: 5,
    focus: 15,
    romance: 0,
    stress: 0,
    social: 10
  },
  Venus: {
    energy: 5,
    focus: 0,
    romance: 20,
    stress: -10,
    social: 15
  },
  Mars: {
    energy: 20,
    focus: 10,
    romance: 10,
    stress: 10,
    social: -5
  },
  Jupiter: {
    energy: 10,
    focus: 5,
    romance: 10,
    stress: -15,
    social: 15
  },
  Saturn: {
    energy: -10,
    focus: 15,
    romance: -10,
    stress: 20,
    social: -10
  },
  Uranus: {
    energy: 10,
    focus: -10,
    romance: 5,
    stress: 15,
    social: 10
  },
  Neptune: {
    energy: -5,
    focus: -10,
    romance: 15,
    stress: 5,
    social: 5
  },
  Pluto: {
    energy: 5,
    focus: 10,
    romance: 10,
    stress: 15,
    social: -5
  }
};
var ASPECT_MULTIPLIERS = {
  Conjunction: 1.2,
  // Strong intensification
  Sextile: 0.5,
  // Mild positive opportunity
  Square: -0.8,
  // Challenging, creates tension
  Trine: 0.7,
  // Harmonious, flowing energy
  Opposition: -0.6
  // Pull between opposing forces
};
function getSignCompatibility(planet, sign) {
  const signInfo = ZODIAC_SIGNS[sign];
  if (signInfo.rulingPlanet === planet) {
    return 1.3;
  }
  const planetElement = getElementForPlanet(planet);
  if (isCompatibleElement(planetElement, signInfo.element)) {
    return 1.1;
  }
  if (!isCompatibleElement(planetElement, signInfo.element)) {
    return 0.9;
  }
  return 1;
}
function getElementForPlanet(planet) {
  const affinities = {
    Sun: "Fire",
    Moon: "Water",
    Mercury: "Air",
    Venus: "Earth",
    Mars: "Fire",
    Jupiter: "Fire",
    Saturn: "Earth",
    Uranus: "Air",
    Neptune: "Water",
    Pluto: "Water"
  };
  return affinities[planet];
}
function isCompatibleElement(elem1, elem2) {
  if (elem1 === "Fire" && elem2 === "Air" || elem1 === "Air" && elem2 === "Fire") {
    return true;
  }
  if (elem1 === "Earth" && elem2 === "Water" || elem1 === "Water" && elem2 === "Earth") {
    return true;
  }
  return elem1 === elem2;
}
function calculateTransitImpact(transitingPlanet, transitingSign, natalSunSign, aspectType) {
  const baseEffect = PLANET_EFFECTS[transitingPlanet];
  const planetWeight = PLANET_WEIGHTS[transitingPlanet];
  const signCompatibility = getSignCompatibility(transitingPlanet, transitingSign);
  let aspectModifier = 1;
  if (aspectType) {
    aspectModifier = ASPECT_MULTIPLIERS[aspectType];
  }
  const signDistance = getSignDistance(transitingSign, natalSunSign);
  let positionModifier = 1;
  if (signDistance === 0) {
    positionModifier = 1.3;
  } else if (signDistance === 6) {
    positionModifier = 1.1;
  } else if (signDistance === 3 || signDistance === 9) {
    positionModifier = 1;
  } else if (signDistance === 4 || signDistance === 8) {
    positionModifier = 0.9;
  }
  const totalModifier = planetWeight * signCompatibility * aspectModifier * positionModifier;
  return {
    energy: Math.round(baseEffect.energy * totalModifier),
    focus: Math.round(baseEffect.focus * totalModifier),
    romance: Math.round(baseEffect.romance * totalModifier),
    stress: Math.round(baseEffect.stress * totalModifier),
    social: Math.round(baseEffect.social * totalModifier)
  };
}
function getSignDistance(sign1, sign2) {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ];
  const index1 = signs.indexOf(sign1);
  const index2 = signs.indexOf(sign2);
  const distance = Math.abs(index1 - index2);
  return Math.min(distance, 12 - distance);
}
function calculateDailyMood(date, natalSunSign, transits) {
  let mood = { ...BASELINE_MOOD };
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
  mood.overall = Math.round(
    mood.energy * 0.25 + mood.focus * 0.2 + mood.romance * 0.15 + (100 - mood.stress) * 0.25 + // Invert stress
    mood.social * 0.15
  );
  return mood;
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function getMercuryRetrogradeImpact() {
  return {
    energy: -5,
    focus: -15,
    romance: -5,
    stress: 15,
    social: -10
  };
}
function getNewMoonImpact(sign, natalSunSign) {
  const signCompatibility = getSignDistance(sign, natalSunSign) === 0 ? 1.3 : 1;
  return {
    energy: Math.round(10 * signCompatibility),
    focus: Math.round(5 * signCompatibility),
    romance: Math.round(5 * signCompatibility),
    stress: Math.round(-5 * signCompatibility),
    social: Math.round(5 * signCompatibility)
  };
}
function getFullMoonImpact(sign, natalSunSign) {
  const signCompatibility = getSignDistance(sign, natalSunSign) === 0 ? 1.2 : 1;
  return {
    energy: Math.round(15 * signCompatibility),
    focus: Math.round(-10 * signCompatibility),
    romance: Math.round(15 * signCompatibility),
    stress: Math.round(10 * signCompatibility),
    social: Math.round(10 * signCompatibility)
  };
}
function getEclipseImpact(sign, natalSunSign) {
  const baseImpact = getFullMoonImpact(sign, natalSunSign);
  return {
    energy: baseImpact.energy * 3,
    focus: baseImpact.focus * 3,
    romance: baseImpact.romance * 3,
    stress: baseImpact.stress * 3,
    social: baseImpact.social * 3
  };
}
function explainMoodImpact(planet, sign, impact, natalSunSign) {
  const planetName = planet;
  const signName = sign;
  const explanations = [];
  if (Math.abs(impact.energy) >= 10) {
    explanations.push(
      impact.energy > 0 ? `${planetName} in ${signName} boosts your energy levels` : `${planetName} in ${signName} may drain your energy`
    );
  }
  if (Math.abs(impact.focus) >= 10) {
    explanations.push(
      impact.focus > 0 ? `enhances mental clarity and concentration` : `makes it harder to focus on tasks`
    );
  }
  if (Math.abs(impact.romance) >= 10) {
    explanations.push(
      impact.romance > 0 ? `brings positive romantic energy` : `may create challenges in relationships`
    );
  }
  if (Math.abs(impact.stress) >= 10) {
    explanations.push(
      impact.stress > 0 ? `increases stress and tension` : `helps reduce stress and anxiety`
    );
  }
  if (Math.abs(impact.social) >= 10) {
    explanations.push(
      impact.social > 0 ? `enhances social connections` : `may prefer solitude over socializing`
    );
  }
  return explanations.join(", ") || "Minor influence on your mood";
}
function getAdviceForMood(mood) {
  const doList = [];
  const dontList = [];
  const affirmations = [];
  if (mood.energy >= 75) {
    doList.push("Take on challenging projects");
    doList.push("Exercise or do physical activities");
    affirmations.push("I have abundant energy to accomplish my goals");
  } else if (mood.energy <= 40) {
    doList.push("Prioritize rest and self-care");
    dontList.push("Overcommit to demanding activities");
    affirmations.push("I honor my need for rest and restoration");
  }
  if (mood.focus >= 75) {
    doList.push("Work on important projects requiring concentration");
    doList.push("Plan and organize");
    affirmations.push("My mind is clear and focused");
  } else if (mood.focus <= 40) {
    dontList.push("Make major decisions");
    doList.push("Take breaks and practice mindfulness");
    affirmations.push("I give myself permission to go with the flow");
  }
  if (mood.romance >= 75) {
    doList.push("Plan quality time with loved ones");
    doList.push("Express appreciation and affection");
    affirmations.push("I attract and radiate love");
  } else if (mood.romance <= 40) {
    dontList.push("Have difficult relationship conversations");
    doList.push("Practice self-love and patience");
    affirmations.push("I am worthy of love and understanding");
  }
  if (mood.stress >= 70) {
    doList.push("Practice stress-relief techniques");
    doList.push("Set healthy boundaries");
    dontList.push("Take on additional responsibilities");
    affirmations.push("I release what I cannot control");
  } else if (mood.stress <= 30) {
    doList.push("Enjoy your sense of calm");
    affirmations.push("I am at peace with myself and my surroundings");
  }
  if (mood.social >= 75) {
    doList.push("Connect with friends and community");
    doList.push("Attend social events");
    affirmations.push("I enjoy meaningful connections with others");
  } else if (mood.social <= 40) {
    doList.push("Honor your need for solitude");
    dontList.push("Force yourself into social situations");
    affirmations.push("Alone time nourishes my spirit");
  }
  return { doList, dontList, affirmations };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AstroCalculationError,
  ZODIAC_ORDER,
  ZODIAC_SIGNS,
  areSignsCompatible,
  calculateAngle,
  calculateDailyMood,
  calculateLunations,
  calculateNatalChart,
  calculatePlanetaryPositions,
  calculateTransitImpact,
  explainMoodImpact,
  findRetrogradeStations,
  findSignChanges,
  formatZodiacPosition,
  getAdviceForMood,
  getDegreeInSign,
  getEclipseImpact,
  getElement,
  getFullMoonImpact,
  getMercuryRetrogradeImpact,
  getModality,
  getNewMoonImpact,
  getOppositeSign,
  getRulingPlanet,
  getSignsByElement,
  getSignsByModality,
  getSunSignFromDate,
  longitudeToSign
});
