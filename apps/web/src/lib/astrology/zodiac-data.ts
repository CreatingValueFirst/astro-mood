/**
 * Comprehensive Zodiac Sign Data
 * Contains detailed information about all 12 zodiac signs
 */

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dates: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  description: string;
  inLove: string;
  atWork: string;
  colors: string[];
  luckyNumbers: number[];
  compatibleSigns: string[];
  oppositeSign: string;
}

export const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  aries: {
    name: 'Aries',
    symbol: '♈',
    element: 'fire',
    modality: 'cardinal',
    rulingPlanet: 'Mars',
    dates: 'March 21 - April 19',
    keywords: ['Initiative', 'Courage', 'Leadership', 'Passion', 'Energy'],
    strengths: [
      'Courageous and energetic',
      'Natural leader',
      'Enthusiastic and confident',
      'Dynamic and quick-witted',
      'Pioneering spirit',
    ],
    weaknesses: [
      'Impulsive',
      'Short-tempered',
      'Impatient',
      'Aggressive at times',
      'Can be self-centered',
    ],
    description:
      'Aries, the first sign of the zodiac, is known for its fiery energy and pioneering spirit. Aries individuals are natural-born leaders who thrive on challenges and new beginnings. They possess an infectious enthusiasm and confidence that inspires others. With Mars as their ruling planet, Aries natives are driven, passionate, and always ready to take action. They prefer to lead rather than follow and are not afraid to venture into unexplored territory.',
    inLove:
      'In relationships, Aries is passionate, direct, and intensely loyal. They love the chase and enjoy pursuing their romantic interests with enthusiasm. However, they need a partner who can match their energy and independence. Aries values honesty and appreciates partners who are straightforward and adventurous.',
    atWork:
      'Aries excels in careers that allow them to take initiative and lead. They thrive in competitive environments and are natural entrepreneurs. Best suited for roles in management, sports, military, emergency services, or any field requiring quick decision-making and courage.',
    colors: ['Red', 'Scarlet', 'Carmine'],
    luckyNumbers: [1, 9, 19, 22, 27, 36, 45, 54, 63, 72],
    compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    oppositeSign: 'Libra',
  },
  taurus: {
    name: 'Taurus',
    symbol: '♉',
    element: 'earth',
    modality: 'fixed',
    rulingPlanet: 'Venus',
    dates: 'April 20 - May 20',
    keywords: ['Stability', 'Loyalty', 'Patience', 'Sensuality', 'Determination'],
    strengths: [
      'Reliable and patient',
      'Practical and grounded',
      'Devoted and responsible',
      'Appreciates beauty',
      'Strong work ethic',
    ],
    weaknesses: [
      'Stubborn',
      'Possessive',
      'Resistant to change',
      'Materialistic tendencies',
      'Can be lazy',
    ],
    description:
      'Taurus is the anchor of the zodiac, known for stability, reliability, and a love of comfort. Ruled by Venus, Taurus natives appreciate beauty, luxury, and the finer things in life. They are practical, grounded individuals who value security and consistency. With their methodical approach and determination, they rarely give up on their goals. Taurus individuals are sensual beings who enjoy physical pleasures and have a deep connection to nature.',
    inLove:
      'Taurus is a devoted and sensual partner who values long-term commitment. They express love through physical affection and tangible gestures. Once committed, they are fiercely loyal but can be possessive. They need a partner who appreciates stability and shares their love for comfort and beauty.',
    atWork:
      'Taurus excels in careers requiring patience, reliability, and attention to detail. They thrive in finance, banking, real estate, agriculture, art, music, and culinary arts. Their practical nature makes them excellent at building and maintaining wealth.',
    colors: ['Green', 'Pink', 'Earth Tones'],
    luckyNumbers: [2, 6, 9, 12, 24, 33, 42, 51, 60],
    compatibleSigns: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    oppositeSign: 'Scorpio',
  },
  gemini: {
    name: 'Gemini',
    symbol: '♊',
    element: 'air',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    dates: 'May 21 - June 20',
    keywords: ['Communication', 'Versatility', 'Curiosity', 'Wit', 'Adaptability'],
    strengths: [
      'Adaptable and versatile',
      'Excellent communicator',
      'Witty and charming',
      'Intellectually curious',
      'Social and outgoing',
    ],
    weaknesses: [
      'Inconsistent',
      'Indecisive',
      'Nervous energy',
      'Superficial at times',
      'Can be two-faced',
    ],
    description:
      'Gemini, represented by the Twins, embodies duality and versatility. Ruled by Mercury, Geminis are natural communicators with quick wit and intellectual curiosity. They thrive on mental stimulation and variety, constantly seeking new experiences and knowledge. Their adaptable nature allows them to navigate different social situations with ease. Geminis are youthful, energetic, and always ready for an adventure or engaging conversation.',
    inLove:
      'Gemini needs mental stimulation and variety in relationships. They are charming, flirtatious, and enjoy witty banter. A partner who can engage them intellectually and keep things interesting is essential. They value communication and need freedom within the relationship.',
    atWork:
      'Gemini excels in careers involving communication, writing, teaching, journalism, public relations, sales, and technology. They thrive in dynamic environments that offer variety and intellectual challenges. Multiple projects at once keep them engaged.',
    colors: ['Yellow', 'Light Green', 'Silver'],
    luckyNumbers: [3, 5, 7, 12, 16, 23, 39, 41, 50],
    compatibleSigns: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    oppositeSign: 'Sagittarius',
  },
  cancer: {
    name: 'Cancer',
    symbol: '♋',
    element: 'water',
    modality: 'cardinal',
    rulingPlanet: 'Moon',
    dates: 'June 21 - July 22',
    keywords: ['Emotion', 'Nurturing', 'Intuition', 'Protection', 'Sensitivity'],
    strengths: [
      'Highly intuitive',
      'Nurturing and caring',
      'Loyal and protective',
      'Emotionally intelligent',
      'Creative and imaginative',
    ],
    weaknesses: [
      'Overly emotional',
      'Moody',
      'Clingy',
      'Holds grudges',
      'Overly cautious',
    ],
    description:
      'Cancer, ruled by the Moon, is the nurturer of the zodiac. Deeply intuitive and sentimental, Cancer individuals are guided by their emotions and possess strong protective instincts. They create safe, comfortable spaces for themselves and loved ones. Like the crab, they have a hard exterior but a soft interior. Family and home are central to their being, and they have an incredible memory, especially for emotional experiences.',
    inLove:
      'Cancer is deeply romantic, loyal, and seeks emotional security in relationships. They are nurturing partners who love to care for their loved ones. They need a partner who appreciates their emotional depth and provides stability. Once they commit, they are in it for life.',
    atWork:
      'Cancer excels in caregiving professions, hospitality, real estate, interior design, teaching, counseling, and culinary arts. They thrive in environments where they can nurture others and create emotional connections.',
    colors: ['White', 'Silver', 'Cream', 'Sea Blue'],
    luckyNumbers: [2, 3, 15, 20, 25, 29, 33, 38, 42],
    compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    oppositeSign: 'Capricorn',
  },
  leo: {
    name: 'Leo',
    symbol: '♌',
    element: 'fire',
    modality: 'fixed',
    rulingPlanet: 'Sun',
    dates: 'July 23 - August 22',
    keywords: ['Confidence', 'Creativity', 'Generosity', 'Leadership', 'Drama'],
    strengths: [
      'Confident and charismatic',
      'Generous and warm-hearted',
      'Creative and passionate',
      'Natural leader',
      'Loyal and protective',
    ],
    weaknesses: [
      'Arrogant',
      'Stubborn',
      'Self-centered',
      'Dominating',
      'Needs constant attention',
    ],
    description:
      'Leo, ruled by the Sun, radiates warmth, confidence, and charisma. Born leaders and natural performers, Leos love being in the spotlight. They possess a magnetic personality that draws people to them. With generous hearts and fierce loyalty, they protect those they love. Leos are creative, passionate, and have a flair for the dramatic. They take pride in their appearance and achievements.',
    inLove:
      'Leo is passionate, romantic, and loves grand gestures. They are generous partners who shower their loved ones with affection and gifts. They need admiration and appreciation in return. A partner who celebrates their achievements and enjoys the spotlight with them is ideal.',
    atWork:
      'Leo excels in leadership roles, entertainment, arts, fashion, marketing, politics, and any career that allows them to shine. They thrive in creative environments and positions where they can inspire others.',
    colors: ['Gold', 'Orange', 'Yellow', 'Purple'],
    luckyNumbers: [1, 3, 10, 19, 23, 28, 37, 46, 55],
    compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    oppositeSign: 'Aquarius',
  },
  virgo: {
    name: 'Virgo',
    symbol: '♍',
    element: 'earth',
    modality: 'mutable',
    rulingPlanet: 'Mercury',
    dates: 'August 23 - September 22',
    keywords: ['Precision', 'Service', 'Analysis', 'Practicality', 'Health'],
    strengths: [
      'Detail-oriented and analytical',
      'Hardworking and reliable',
      'Practical and organized',
      'Helpful and service-oriented',
      'Intelligent and modest',
    ],
    weaknesses: [
      'Overly critical',
      'Perfectionist',
      'Worrier',
      'Can be judgemental',
      'Too hard on themselves',
    ],
    description:
      'Virgo is the perfectionist of the zodiac, known for precision, analysis, and dedication to service. Ruled by Mercury, Virgos have sharp minds and excellent attention to detail. They are practical, methodical, and always striving to improve themselves and their surroundings. With a strong sense of duty and responsibility, they find fulfillment in being useful and helpful. Virgos have a deep connection to health, wellness, and natural living.',
    inLove:
      'Virgo shows love through acts of service and practical support. They may not be overly romantic, but they are devoted and reliable partners. They need someone who appreciates their efforts and doesn\'t judge their need for order. Intellectual compatibility is important.',
    atWork:
      'Virgo excels in healthcare, research, editing, accounting, data analysis, nutrition, and any field requiring attention to detail and analytical skills. They are excellent problem-solvers and quality controllers.',
    colors: ['Navy Blue', 'Grey', 'Beige', 'Pale Yellow'],
    luckyNumbers: [5, 14, 15, 23, 32, 41, 50, 59, 68],
    compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    oppositeSign: 'Pisces',
  },
  libra: {
    name: 'Libra',
    symbol: '♎',
    element: 'air',
    modality: 'cardinal',
    rulingPlanet: 'Venus',
    dates: 'September 23 - October 22',
    keywords: ['Balance', 'Harmony', 'Justice', 'Partnership', 'Diplomacy'],
    strengths: [
      'Diplomatic and fair',
      'Social and cooperative',
      'Gracious and idealistic',
      'Appreciates beauty',
      'Seeks harmony',
    ],
    weaknesses: [
      'Indecisive',
      'People-pleaser',
      'Avoids confrontation',
      'Self-pitying',
      'Can be superficial',
    ],
    description:
      'Libra, represented by the scales, seeks balance, harmony, and justice. Ruled by Venus, Libras appreciate beauty, art, and refined aesthetics. They are natural diplomats with exceptional social skills, able to see all sides of a situation. Partnership is essential to Libras, and they thrive in relationships. With their charming personality and fair-minded approach, they excel at bringing people together and creating peace.',
    inLove:
      'Libra is romantic, charming, and seeks an equal partnership. They love being in love and enjoy the romance and courtship phase. They need a partner who values harmony and can engage in intellectual discussions. Beauty and aesthetics matter to them.',
    atWork:
      'Libra excels in law, diplomacy, counseling, human resources, arts, design, fashion, and any career involving mediation or aesthetics. They thrive in collaborative environments and partnership-based roles.',
    colors: ['Pink', 'Light Blue', 'Lavender'],
    luckyNumbers: [4, 6, 13, 15, 24, 42, 51, 60, 69],
    compatibleSigns: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    oppositeSign: 'Aries',
  },
  scorpio: {
    name: 'Scorpio',
    symbol: '♏',
    element: 'water',
    modality: 'fixed',
    rulingPlanet: 'Pluto (traditional: Mars)',
    dates: 'October 23 - November 21',
    keywords: ['Intensity', 'Transformation', 'Mystery', 'Power', 'Depth'],
    strengths: [
      'Passionate and intense',
      'Resourceful and brave',
      'Loyal and trustworthy',
      'Excellent investigator',
      'Transformative and powerful',
    ],
    weaknesses: [
      'Jealous',
      'Secretive',
      'Manipulative',
      'Vengeful',
      'Controlling',
    ],
    description:
      'Scorpio is the most intense and mysterious sign of the zodiac. Ruled by Pluto, Scorpios possess incredible emotional depth and transformative power. They see beyond surface appearances into the core of matters. With laser focus and determination, they pursue their goals relentlessly. Scorpios are passionate, magnetic, and possess strong intuition. They experience life intensely and are drawn to life\'s mysteries and the occult.',
    inLove:
      'Scorpio is intensely passionate, loyal, and seeks deep emotional and physical connection. They love completely and expect absolute loyalty in return. Trust is everything to them. They need a partner who can handle their intensity and is willing to explore emotional depths.',
    atWork:
      'Scorpio excels in research, psychology, detective work, surgery, finance, crisis management, and any field requiring investigation or transformation. They thrive in intense, challenging environments.',
    colors: ['Black', 'Red', 'Maroon', 'Dark Purple'],
    luckyNumbers: [8, 11, 18, 22, 29, 38, 47, 56, 65],
    compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    oppositeSign: 'Taurus',
  },
  sagittarius: {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'fire',
    modality: 'mutable',
    rulingPlanet: 'Jupiter',
    dates: 'November 22 - December 21',
    keywords: ['Freedom', 'Philosophy', 'Adventure', 'Optimism', 'Truth'],
    strengths: [
      'Optimistic and adventurous',
      'Philosophical and open-minded',
      'Honest and straightforward',
      'Generous and idealistic',
      'Great sense of humor',
    ],
    weaknesses: [
      'Tactless',
      'Impatient',
      'Commitment-phobic',
      'Overpromises',
      'Careless',
    ],
    description:
      'Sagittarius is the philosopher and adventurer of the zodiac. Ruled by Jupiter, Sagittarians are eternal optimists with a thirst for knowledge and new experiences. They love travel, learning, and exploring different cultures and philosophies. With their straightforward honesty and infectious enthusiasm, they inspire others to think bigger. Freedom is essential to their nature, and they resist anything that limits their independence.',
    inLove:
      'Sagittarius needs freedom and adventure in relationships. They are fun, optimistic partners who love exploring life with their loved ones. They need a partner who is independent, adventurous, and shares their philosophical interests. Honesty is non-negotiable.',
    atWork:
      'Sagittarius excels in education, travel, publishing, philosophy, religion, sports, and international business. They thrive in roles offering freedom, variety, and opportunities for growth and exploration.',
    colors: ['Purple', 'Royal Blue', 'Turquoise'],
    luckyNumbers: [3, 7, 9, 12, 21, 30, 39, 48, 57],
    compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    oppositeSign: 'Gemini',
  },
  capricorn: {
    name: 'Capricorn',
    symbol: '♑',
    element: 'earth',
    modality: 'cardinal',
    rulingPlanet: 'Saturn',
    dates: 'December 22 - January 19',
    keywords: ['Ambition', 'Discipline', 'Responsibility', 'Structure', 'Achievement'],
    strengths: [
      'Disciplined and responsible',
      'Ambitious and determined',
      'Patient and practical',
      'Self-controlled',
      'Excellent manager',
    ],
    weaknesses: [
      'Pessimistic',
      'Workaholic',
      'Unforgiving',
      'Cold or distant',
      'Overly serious',
    ],
    description:
      'Capricorn is the achiever of the zodiac, known for ambition, discipline, and determination. Ruled by Saturn, Capricorns are hardworking, responsible individuals who take their commitments seriously. They possess excellent organizational skills and natural leadership abilities. With patience and persistence, they climb toward their goals methodically. Capricorns value tradition, structure, and long-term success over short-term gains.',
    inLove:
      'Capricorn is loyal, committed, and takes relationships seriously. They may be reserved initially but are devoted partners who show love through actions and commitment. They need a partner who respects their ambitions and shares their values of stability and success.',
    atWork:
      'Capricorn excels in business, management, finance, administration, engineering, architecture, and any field requiring organization and long-term planning. They are natural executives and strategists.',
    colors: ['Brown', 'Black', 'Dark Green', 'Grey'],
    luckyNumbers: [4, 8, 13, 22, 31, 40, 49, 58, 67],
    compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    oppositeSign: 'Cancer',
  },
  aquarius: {
    name: 'Aquarius',
    symbol: '♒',
    element: 'air',
    modality: 'fixed',
    rulingPlanet: 'Uranus (traditional: Saturn)',
    dates: 'January 20 - February 18',
    keywords: ['Innovation', 'Individuality', 'Humanitarianism', 'Freedom', 'Progress'],
    strengths: [
      'Progressive and original',
      'Independent and intellectual',
      'Humanitarian and idealistic',
      'Inventive and unique',
      'Friendly and humanitarian',
    ],
    weaknesses: [
      'Emotionally detached',
      'Stubborn',
      'Unpredictable',
      'Aloof',
      'Contrary for the sake of it',
    ],
    description:
      'Aquarius is the visionary and revolutionary of the zodiac. Ruled by Uranus, Aquarians are innovative, independent thinkers who march to their own drummer. They are humanitarian at heart, concerned with making the world a better place. With their original ideas and progressive thinking, they are often ahead of their time. Aquarians value intellect, freedom, and authenticity. They are friendly but maintain emotional independence.',
    inLove:
      'Aquarius needs freedom and intellectual stimulation in relationships. They are friendly, loyal partners who value friendship within romance. They need a partner who respects their independence and shares their progressive ideals. Emotional space is important.',
    atWork:
      'Aquarius excels in technology, science, social work, activism, innovation, aviation, and any field involving progressive thinking or humanitarian work. They thrive in forward-thinking, unconventional environments.',
    colors: ['Electric Blue', 'Silver', 'Aquamarine'],
    luckyNumbers: [4, 7, 11, 22, 29, 38, 47, 56, 65],
    compatibleSigns: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    oppositeSign: 'Leo',
  },
  pisces: {
    name: 'Pisces',
    symbol: '♓',
    element: 'water',
    modality: 'mutable',
    rulingPlanet: 'Neptune (traditional: Jupiter)',
    dates: 'February 19 - March 20',
    keywords: ['Compassion', 'Intuition', 'Creativity', 'Spirituality', 'Empathy'],
    strengths: [
      'Compassionate and empathetic',
      'Artistic and creative',
      'Intuitive and wise',
      'Gentle and selfless',
      'Spiritually aware',
    ],
    weaknesses: [
      'Overly trusting',
      'Escapist',
      'Victim mentality',
      'Overly emotional',
      'Lack of boundaries',
    ],
    description:
      'Pisces is the dreamer and mystic of the zodiac. Ruled by Neptune, Pisceans are deeply intuitive, compassionate souls who feel everything intensely. They possess incredible empathy and artistic sensitivity. Living with one foot in the spiritual realm, they have a rich inner life and powerful imagination. Pisces are selfless, often putting others\' needs before their own. They see magic in the world and believe in the power of dreams.',
    inLove:
      'Pisces is romantic, devoted, and seeks soulmate-level connection. They are compassionate partners who love deeply and unconditionally. They need a partner who appreciates their sensitivity and provides grounding. Emotional and spiritual connection is essential.',
    atWork:
      'Pisces excels in arts, music, healing professions, counseling, charity work, spiritual work, and any creative or caregiving field. They thrive in environments where they can express compassion and creativity.',
    colors: ['Sea Green', 'Lavender', 'Purple', 'Violet'],
    luckyNumbers: [3, 7, 12, 16, 21, 25, 30, 34, 43],
    compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    oppositeSign: 'Virgo',
  },
};

export const ELEMENTS = {
  fire: {
    name: 'Fire',
    signs: ['Aries', 'Leo', 'Sagittarius'],
    traits: ['Passionate', 'Dynamic', 'Temperamental', 'Energetic', 'Enthusiastic'],
    description:
      'Fire signs are passionate, dynamic, and temperamental. They get angry quickly, but they also forgive easily. They are adventurers with immense energy. They are physically strong and are a source of inspiration for others. Fire signs are intelligent, self-aware, creative and idealistic people, always ready for action.',
  },
  earth: {
    name: 'Earth',
    signs: ['Taurus', 'Virgo', 'Capricorn'],
    traits: ['Grounded', 'Practical', 'Realistic', 'Stable', 'Loyal'],
    description:
      'Earth signs are grounded and the ones that bring us down to earth. They are mostly conservative and realistic, but they can also be very emotional. They are connected to our material reality and can be turned to material goods. They are practical, loyal and stable and they stick by their people through hard times.',
  },
  air: {
    name: 'Air',
    signs: ['Gemini', 'Libra', 'Aquarius'],
    traits: ['Intellectual', 'Communicative', 'Social', 'Analytical', 'Friendly'],
    description:
      'Air signs are rational, social, and love communication and relationships with other people. They are thinkers, friendly, intellectual, communicative and analytical. They love philosophical discussions, social gatherings and good books. They enjoy giving advice, but they can also be very superficial.',
  },
  water: {
    name: 'Water',
    signs: ['Cancer', 'Scorpio', 'Pisces'],
    traits: ['Emotional', 'Intuitive', 'Sensitive', 'Mysterious', 'Psychic'],
    description:
      'Water signs are exceptionally emotional and ultra-sensitive. They are highly intuitive and they can be as mysterious as the ocean itself. Water signs love profound conversations and intimacy. They rarely do anything openly and are always there to support their loved ones. The Water Signs are: Cancer, Scorpio and Pisces.',
  },
};

export const MODALITIES = {
  cardinal: {
    name: 'Cardinal',
    signs: ['Aries', 'Cancer', 'Libra', 'Capricorn'],
    traits: ['Initiating', 'Leading', 'Active', 'Dynamic'],
    description:
      'Cardinal signs are the initiators of the zodiac. They start each season and are excellent at taking action and starting initiatives. They are natural leaders who excel at taking charge.',
  },
  fixed: {
    name: 'Fixed',
    signs: ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
    traits: ['Stable', 'Determined', 'Persistent', 'Reliable'],
    description:
      'Fixed signs fall in the middle of the season. They are the sustainers of the zodiac, stable and determined. They excel at maintaining and seeing things through to completion.',
  },
  mutable: {
    name: 'Mutable',
    signs: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'],
    traits: ['Adaptable', 'Flexible', 'Changeable', 'Versatile'],
    description:
      'Mutable signs end each season. They are the most flexible and adaptable, able to adjust to changing circumstances. They excel at communication and helping with transitions.',
  },
};
