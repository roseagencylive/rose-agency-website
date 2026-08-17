'use client';

import { useState } from 'react';
import { trackRoseEvent } from '@/lib/site-config';

const faqs = [
  {
    question: 'What is ROSE Agency?',
    answer:
      'ROSE Agency is a TikTok LIVE Creator Network focused on creator development, LIVE strategy, community, and growth.',
  },
  {
    question: 'Do I need a massive following to apply?',
    answer:
      "No. ROSE looks beyond follower count. We're looking for creators who are ready to show up, learn, build community, and grow. Final eligibility is subject to TikTok's Creator Network requirements.",
  },
  {
    question: 'Does it cost to apply?',
    answer:
      'There is no cost to submit an application to ROSE Agency.',
  },
  {
    question: 'Do I need to already go LIVE?',
    answer:
      "Not necessarily. If you're serious about developing as a LIVE creator, you can apply. Eligibility and onboarding remain subject to TikTok's requirements.",
  },
  {
    question: 'Can I join ROSE with multiple TikTok accounts?',
    answer:
      'If you manage or go LIVE on multiple TikTok accounts, your eligibility may depend on how those accounts are currently connected within TikTok LIVE. Include all relevant accounts when you apply so our team can review your situation correctly.',
  },
  {
    question: 'I’m already with another TikTok LIVE agency or Creator Network. Can I still join ROSE?',
    answer:
      'If your account is currently connected to another TikTok LIVE agency or Creator Network, you generally can’t be actively managed by two networks at the same time. You can still apply to ROSE, and we can review your current situation and explain what options may be available before you make any changes.',
  },
  {
    question: 'What happens after I apply?',
    answer:
      "Your application will be reviewed. If you're a potential fit, you'll receive next steps for the ROSE onboarding process.",
  },
  {
    question: 'What support does ROSE provide?',
    answer:
      'ROSE focuses on LIVE strategy, performance development, creator coaching, community building, and helping creators better understand their growth opportunities.',
  },
  {
    question: 'Does ROSE guarantee growth or earnings?',
    answer:
      'No. Results vary by creator. ROSE provides strategy, support, coaching, and development. Creators are responsible for their own execution and results.',
  },
  {
    question: "I'm already with ROSE and need help. Where do I go?",
    answer: 'Email support@roseagencylive.com.',
  },
];

export function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const open = openQuestion === faq.question;
        return (
          <div key={faq.question} className="rounded-lg border border-roseGold/20 bg-roseCream/[0.04]">
            <button
              type="button"
              onClick={() => {
                setOpenQuestion(open ? null : faq.question);
                if (!open) trackRoseEvent('rose_faq_open', { question: faq.question });
              }}
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-bold text-roseCream"
            >
              {faq.question}
              <span className={`text-roseGold transition ${open ? 'rotate-180' : ''}`}>⌄</span>
            </button>
            {open ? <p className="px-5 pb-5 text-sm leading-6 text-roseMuted">{faq.answer}</p> : null}
          </div>
        );
      })}
      <div className="rounded-lg border border-roseGold/30 bg-roseGold/[0.08] p-5 text-center">
        <p className="font-editorial text-2xl font-bold text-roseCream">Still have questions before applying?</p>
        <a href="mailto:support@roseagencylive.com" className="mt-2 inline-block font-black text-roseGoldSoft">
          support@roseagencylive.com
        </a>
      </div>
    </div>
  );
}
