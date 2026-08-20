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
    avatar: '/testimonials/ashley-testimonial-profile.png',
    category: 'LIVE Creator + Community Member',
    testimonial:
      "I became more comfortable, more natural, and started focusing on the people who ARE there instead of worrying about how many aren't. The relationships I've built through Aleah's community have turned into this amazing little family that genuinely shows up for me.",
    featured: true,
  },
  {
    name: 'Tia | Homeschool Mom Baddie',
    handle: '@homeschoolmombaddie',
    avatar: '/testimonials/tia-homeschool-mom-baddie-testimonial-profile.png',
    category: 'LIVE Creator + Community Member',
    testimonial:
      "When I first found Aleah, I was just a supporter and wasn't sure if going LIVE was something I wanted to do. After meeting her at the Built Different Summit and attending her workshop, I left feeling inspired. I applied the tips she teaches, my confidence has significantly improved, and I'm seeing the results in both my content and LIVEs.",
    featured: true,
  },
];
