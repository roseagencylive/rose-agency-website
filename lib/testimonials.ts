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

// Add real creator reviews here.
// Recommended avatar path format: /testimonials/creator-handle.jpg
// Example: /testimonials/itsashley-yall.jpg
export const creatorTestimonials: CreatorTestimonial[] = [
  {
    name: 'ItsAshley_Yall',
    handle: '@ItsAshley_Yall',
    avatar: '/testimonials/itsashley-yall.jpg',
    category: 'LIVE Creator + Community Member',
    testimonial:
      "I became more comfortable, more natural, and started focusing on the people who ARE there instead of worrying about how many aren't. The relationships I've built through Aleah's community have turned into this amazing little family that genuinely shows up for me.",
    featured: true,
  },
];
