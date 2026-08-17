export const siteConfig = {
  brandName: 'ROSE Agency',
  tagline: 'Create. Connect. Elevate.',
  website: 'roseagencylive.com',
  applicationUrl: 'https://www.tiktok.com/t/ZTDjAARXQ/',
  tiktokUrl: 'https://www.tiktok.com/@roseagencylive',
  founderTikTokUrl: 'https://www.tiktok.com/@aleahroseee',
  tiktokHandle: '@roseagencylive',
  founderHandle: '@aleahroseee',
  contacts: {
    creators: 'creators@roseagencylive.com',
    support: 'support@roseagencylive.com',
    general: 'hello@roseagencylive.com',
  },
  assets: {
    logo: '/rose-agency-logo.png',
    founderImage: '',
    founderVideoUrl: '/videos/rose-agency-intro-web-1080.mp4',
    founderVideoPoster: '/images/rose-video-poster.jpg',
  },
  video: {
    useFounderVideoMockup: false,
    sourceMockupVideoUrl: '/videos/rose-agency-source-mockup.mov',
  },
} as const;

export type RoseEventName = 'rose_apply_cta_click' | 'rose_founder_video_play' | 'rose_faq_open';

export function trackRoseEvent(eventName: RoseEventName, payload: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
}
