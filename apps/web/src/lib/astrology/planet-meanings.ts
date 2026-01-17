/**
 * Comprehensive Planet Meanings and Interpretations
 */

export interface PlanetInfo {
  name: string;
  symbol: string;
  rules: string[];
  represents: string[];
  keywords: string[];
  description: string;
  inSigns: string;
  retrograde: string;
  orbitalPeriod: string;
}

export const PLANETS: Record<string, PlanetInfo> = {
  sun: {
    name: 'Sun',
    symbol: '☉',
    rules: ['Leo'],
    represents: ['Identity', 'Ego', 'Self', 'Vitality', 'Consciousness'],
    keywords: ['Core Self', 'Purpose', 'Life Force', 'Authority', 'Father'],
    description:
      'The Sun represents your core identity, ego, and sense of self. It\'s your conscious mind, your will, and your creative life force. The Sun shows how you shine, what makes you feel vital and alive, and your essential purpose. It represents your ego, your sense of personal identity, and what you\'re here to create. In a birth chart, the Sun shows where you need to express your unique individuality.',
    inSigns:
      'The Sun\'s sign placement shows your basic personality, temperament, and how you express your identity. It reveals your natural approach to life and what makes you feel most alive.',
    retrograde: 'The Sun never goes retrograde.',
    orbitalPeriod: 'One year (365.25 days)',
  },
  moon: {
    name: 'Moon',
    symbol: '☽',
    rules: ['Cancer'],
    represents: ['Emotions', 'Instincts', 'Subconscious', 'Nurturing', 'Security'],
    keywords: ['Feelings', 'Habits', 'Mother', 'Memory', 'Comfort'],
    description:
      'The Moon represents your emotional nature, instincts, and subconscious patterns. It governs your needs for security, comfort, and nurturing. The Moon shows how you react emotionally, what makes you feel safe, and how you care for others. It represents your inner child, your memories, and your relationship with your mother or primary caregiver. The Moon changes signs approximately every 2.5 days, making it one of the fastest-moving celestial bodies.',
    inSigns:
      'The Moon\'s sign placement reveals your emotional nature, what you need to feel secure, and how you nurture yourself and others. It shows your instinctive reactions and emotional patterns.',
    retrograde: 'The Moon never goes retrograde.',
    orbitalPeriod: '27.3 days',
  },
  mercury: {
    name: 'Mercury',
    symbol: '☿',
    rules: ['Gemini', 'Virgo'],
    represents: ['Communication', 'Thinking', 'Learning', 'Processing', 'Transportation'],
    keywords: ['Mind', 'Speech', 'Writing', 'Logic', 'Connections'],
    description:
      'Mercury represents communication, thinking, and information processing. It governs how you think, learn, speak, and write. Mercury shows your mental patterns, learning style, and how you connect ideas. It rules short trips, siblings, neighbors, and daily communications. Mercury is the messenger of the gods, bridging conscious and unconscious realms. It\'s concerned with facts, data, and the exchange of information.',
    inSigns:
      'Mercury\'s sign placement shows your thinking style, communication approach, and learning preferences. It reveals how you process information and express your thoughts.',
    retrograde:
      'Mercury retrograde occurs 3-4 times per year for about 3 weeks. During this time, communication, technology, and travel may experience delays or misunderstandings. It\'s excellent for reviewing, revising, and reconnecting.',
    orbitalPeriod: '88 days',
  },
  venus: {
    name: 'Venus',
    symbol: '♀',
    rules: ['Taurus', 'Libra'],
    represents: ['Love', 'Beauty', 'Values', 'Pleasure', 'Attraction'],
    keywords: ['Relationships', 'Art', 'Money', 'Harmony', 'Desire'],
    description:
      'Venus represents love, beauty, values, and what brings you pleasure. It governs romantic relationships, aesthetic preferences, and how you give and receive affection. Venus shows what you find attractive, what you value, and how you create harmony. It also rules money, possessions, and self-worth. Venus is the planet of love and beauty, seeking pleasure, connection, and balance in all things.',
    inSigns:
      'Venus\'s sign placement reveals your love style, aesthetic preferences, and what you value in relationships. It shows how you express affection and what brings you joy.',
    retrograde:
      'Venus retrograde occurs approximately every 18 months for about 40 days. During this time, relationship issues may surface for review, and values may be reassessed. It\'s a time to reconsider what truly brings satisfaction.',
    orbitalPeriod: '225 days',
  },
  mars: {
    name: 'Mars',
    symbol: '♂',
    rules: ['Aries'],
    represents: ['Action', 'Desire', 'Energy', 'Passion', 'Aggression'],
    keywords: ['Drive', 'Anger', 'Sex', 'Competition', 'Courage'],
    description:
      'Mars represents action, desire, and how you assert yourself. It governs your drive, ambition, and sexual energy. Mars shows how you pursue what you want, handle anger, and express passion. It\'s the warrior planet, concerned with conquest, competition, and courage. Mars gives you the energy and motivation to take action and fight for what you believe in. It represents your physical energy and vitality.',
    inSigns:
      'Mars\'s sign placement shows how you take action, express anger, and pursue desires. It reveals your style of assertiveness and sexual expression.',
    retrograde:
      'Mars retrograde occurs approximately every 2 years for about 2 months. During this time, energy levels may fluctuate, and conflicts may simmer beneath the surface. It\'s a time to redirect aggression and reassess goals.',
    orbitalPeriod: '687 days (1.9 years)',
  },
  jupiter: {
    name: 'Jupiter',
    symbol: '♃',
    rules: ['Sagittarius'],
    represents: ['Expansion', 'Growth', 'Wisdom', 'Luck', 'Abundance'],
    keywords: ['Philosophy', 'Travel', 'Higher Learning', 'Optimism', 'Faith'],
    description:
      'Jupiter represents expansion, growth, and abundance. It governs higher learning, philosophy, travel, and the search for meaning. Jupiter shows where you experience good fortune, growth opportunities, and natural confidence. It\'s the planet of optimism, faith, and benevolence. Jupiter encourages you to think big, explore new horizons, and expand your understanding of the world. It represents your belief systems and where you find meaning.',
    inSigns:
      'Jupiter\'s sign placement shows where you experience growth, good fortune, and how you seek meaning. It reveals your philosophical approach and what you believe in.',
    retrograde:
      'Jupiter retrograde occurs annually for about 4 months. During this time, growth is internal rather than external. It\'s excellent for spiritual development and reconsidering beliefs.',
    orbitalPeriod: '12 years',
  },
  saturn: {
    name: 'Saturn',
    symbol: '♄',
    rules: ['Capricorn'],
    represents: ['Structure', 'Discipline', 'Responsibility', 'Limitation', 'Time'],
    keywords: ['Karma', 'Boundaries', 'Authority', 'Maturity', 'Achievement'],
    description:
      'Saturn represents structure, discipline, and responsibility. It governs limitations, boundaries, and the hard work required for achievement. Saturn shows where you face challenges, develop discipline, and build lasting structures. It\'s the taskmaster of the zodiac, concerned with maturity, wisdom gained through experience, and karmic lessons. Saturn teaches through restriction and challenge, ultimately bringing wisdom and mastery.',
    inSigns:
      'Saturn\'s sign placement shows where you face challenges, need to develop discipline, and build lasting achievements. It reveals your approach to responsibility and authority.',
    retrograde:
      'Saturn retrograde occurs annually for about 4.5 months. During this time, lessons are internalized, and structures are reviewed. It\'s a time to reassess commitments and responsibilities.',
    orbitalPeriod: '29.5 years',
  },
  uranus: {
    name: 'Uranus',
    symbol: '♅',
    rules: ['Aquarius'],
    represents: ['Revolution', 'Innovation', 'Freedom', 'Awakening', 'Rebellion'],
    keywords: ['Change', 'Technology', 'Genius', 'Eccentricity', 'Liberation'],
    description:
      'Uranus represents revolution, innovation, and sudden change. It governs freedom, individuality, and awakening consciousness. Uranus shows where you break free from convention, embrace your uniqueness, and experience sudden insights. It\'s the planet of the unexpected, bringing breakthroughs, upheavals, and liberation. Uranus is concerned with progress, technology, and collective evolution. It disrupts the status quo to create positive change.',
    inSigns:
      'Uranus\'s sign placement (which affects entire generations) shows collective approaches to innovation and revolution. Its house placement shows where you experience sudden changes and seek freedom.',
    retrograde:
      'Uranus retrograde occurs annually for about 5 months. During this time, revolutionary energy turns inward, prompting internal liberation and consciousness shifts.',
    orbitalPeriod: '84 years',
  },
  neptune: {
    name: 'Neptune',
    symbol: '♆',
    rules: ['Pisces'],
    represents: ['Spirituality', 'Dreams', 'Illusion', 'Compassion', 'Transcendence'],
    keywords: ['Imagination', 'Mysticism', 'Deception', 'Dissolution', 'Unity'],
    description:
      'Neptune represents spirituality, dreams, and transcendence. It governs imagination, compassion, and the dissolution of boundaries. Neptune shows where you seek connection to something greater, experience inspiration, and may face illusion or confusion. It\'s the planet of mysticism, art, and universal love. Neptune dissolves ego boundaries, bringing either spiritual awakening or escapism. It represents the realm beyond material reality.',
    inSigns:
      'Neptune\'s sign placement (affecting entire generations) shows collective spiritual and creative trends. Its house placement shows where you seek transcendence and may face illusions.',
    retrograde:
      'Neptune retrograde occurs annually for about 5 months. During this time, illusions may lift, revealing truth beneath fantasies. It\'s a time for spiritual introspection.',
    orbitalPeriod: '165 years',
  },
  pluto: {
    name: 'Pluto',
    symbol: '♇',
    rules: ['Scorpio'],
    represents: ['Transformation', 'Power', 'Death/Rebirth', 'Intensity', 'Shadow'],
    keywords: ['Regeneration', 'Obsession', 'Control', 'Deep Change', 'Psychology'],
    description:
      'Pluto represents transformation, power, and profound change. It governs death and rebirth cycles, psychological depths, and hidden power. Pluto shows where you experience intense transformation, face your shadow, and reclaim your power. It\'s the planet of destruction and regeneration, breaking down what no longer serves to create space for new growth. Pluto is concerned with power dynamics, obsession, and the underworld of the psyche.',
    inSigns:
      'Pluto\'s sign placement (affecting entire generations) shows collective transformative themes. Its house placement shows where you experience profound personal transformation.',
    retrograde:
      'Pluto retrograde occurs annually for about 5-6 months. During this time, transformative processes turn inward, prompting deep psychological work and power reclamation.',
    orbitalPeriod: '248 years',
  },
};

export const PLANET_SIGN_MEANINGS = {
  sun: {
    aries: 'Confident, pioneering, assertive leadership. Natural-born leaders with strong vitality.',
    taurus: 'Stable, determined, sensual nature. Strong sense of values and material security.',
    gemini: 'Versatile, communicative, intellectually curious. Thrives on mental stimulation.',
    cancer: 'Nurturing, intuitive, emotionally sensitive. Strong connection to family and home.',
    leo: 'Proud, creative, dramatic expression. Natural performer with magnetic personality.',
    virgo: 'Analytical, service-oriented, perfectionistic. Attention to detail and practical skills.',
    libra: 'Diplomatic, harmonious, partnership-focused. Natural mediator seeking balance.',
    scorpio: 'Intense, transformative, deeply passionate. Powerful emotional and psychological depth.',
    sagittarius: 'Optimistic, philosophical, freedom-loving. Seeker of truth and higher meaning.',
    capricorn: 'Ambitious, disciplined, goal-oriented. Natural executive with strong work ethic.',
    aquarius: 'Independent, humanitarian, innovative. Progressive thinker and social reformer.',
    pisces: 'Compassionate, imaginative, spiritually attuned. Deeply empathetic and creative.',
  },
  // Add more planet-sign combinations as needed
};
