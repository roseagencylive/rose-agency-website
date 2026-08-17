export type CreatorTestimonial = {
  name: string;
  handle: string;
  avatar: string;
  category: 'LIVE Growth' | 'Confidence' | 'Community' | 'Strategy' | 'Consistency' | 'Monetization' | string;
  testimonial: string;
  result?: string;
  featured?: boolean;
  isPlaceholderForDevelopment?: boolean;
};

// DEVELOPMENT ONLY:
// Replace these 6 placeholder entries with real creator testimonials before production.
// Do not remove `isPlaceholderForDevelopment: true` from fake/test content.
// Production automatically hides placeholder-only testimonials to avoid fake social proof.
export const creatorTestimonials: CreatorTestimonial[] = [
  {
    name: 'Creator Placeholder 01',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'LIVE Growth',
    testimonial:
      'Development placeholder only. Replace this with a real creator testimonial before publishing this section.',
    result: '',
    featured: true,
    isPlaceholderForDevelopment: true,
  },
  {
    name: 'Creator Placeholder 02',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'Confidence',
    testimonial:
      'Development placeholder only. Add the creator’s real words, name, username, image, category, and optional verified result.',
    result: '',
    isPlaceholderForDevelopment: true,
  },
  {
    name: 'Creator Placeholder 03',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'Community',
    testimonial:
      'Development placeholder only. This card will be hidden in production until it is replaced with real social proof.',
    result: '',
    isPlaceholderForDevelopment: true,
  },
  {
    name: 'Creator Placeholder 04',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'Strategy',
    testimonial:
      'Development placeholder only. Do not use this text as a real testimonial or imply this person is a ROSE creator.',
    result: '',
    isPlaceholderForDevelopment: true,
  },
  {
    name: 'Creator Placeholder 05',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'Consistency',
    testimonial:
      'Development placeholder only. Paste a real 2-4 sentence creator experience here when ready.',
    result: '',
    isPlaceholderForDevelopment: true,
  },
  {
    name: 'Creator Placeholder 06',
    handle: '@replace_this_creator',
    avatar: '',
    category: 'Monetization',
    testimonial:
      'Development placeholder only. Optional results must be specific, verified, and supplied by the real creator.',
    result: '',
    isPlaceholderForDevelopment: true,
  },
];
