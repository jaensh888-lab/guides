export type GuideType = 'place' | 'area' | 'itinerary' | 'transport' | 'collection';

export interface GuideSection {
  id: string;
  kind:
    | 'intro'
    | 'summary'
    | 'what_is'
    | 'how_to_get'
    | 'entrance'
    | 'parking'
    | 'tickets'
    | 'opening_hours'
    | 'with_kids'
    | 'what_to_take'
    | 'nearby'
    | 'other';
  title: string;
  body: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface Guide {
  id: string;
  slug: string;
  locale: 'ru' | 'en';
  country: 'uae' | 'turkey' | 'thailand' | 'other';
  city?: string;
  region?: string;
  type: GuideType;
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  durationCategory?: 'short' | 'half_day' | 'day' | 'multi_day';
  budgetCategory?: 'budget' | 'mid' | 'premium';
  transportOptions?: ('metro' | 'bus' | 'car' | 'taxi' | 'transfer')[];
  kidsAges?: ('0-3' | '4-7' | '8-12' | '13+')[];
  stressLevel?: 'low' | 'medium' | 'high';
  updatedAt: string;
  heroImageUrl?: string;
  sections: GuideSection[];
  faq?: GuideFaqItem[];
  seo?: {
    title?: string;
    description?: string;
  };
}
