/**
 * StructuredData Component
 *
 * Adds JSON-LD structured data for SEO.
 * Helps search engines understand the content and context of the page.
 */

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Predefined structured data for common pages
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AstroMood',
  description: 'Personalized astrological insights and mood forecasts based on real astronomical data',
  url: 'https://astro-mood-wheat.vercel.app',
  logo: 'https://astro-mood-wheat.vercel.app/logo.png',
  sameAs: [
    // Add social media profiles here when available
  ],
};

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AstroMood',
  description: 'Discover personalized monthly mood forecasts powered by real astronomical calculations. Understand how planetary transits influence your energy, focus, and emotions.',
  url: 'https://astro-mood-wheat.vercel.app',
  applicationCategory: 'LifestyleApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Personalized natal chart calculations',
    'Daily planetary transit tracking',
    'Monthly mood forecasts',
    'Astrological aspect interpretations',
    'Real astronomical data integration',
  ],
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
