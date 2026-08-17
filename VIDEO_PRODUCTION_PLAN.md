# ROSE Agency Founder Brand Video Production Plan

Purpose: create a 50-60 second faceless luxury brand film for the ROSE Agency hero video. This is a production blueprint, not a claim of guaranteed results or TikTok endorsement.

| Timestamp | Voiceover | On-Screen Text | Visual | Animation | Transition | Sound Effect | B-Roll Needed |
|---|---|---|---|---|---|---|---|
| 0-2 sec | If you're going LIVE consistently... | GOING LIVE... | Phone mockup with LIVE badge, comments, viewer count, dark burgundy/black background | Fast push-in, comment flicker, subtle screen shake | Hard flash cut | Low boom, quick digital click | Phone on tripod, TikTok LIVE interface-style screen recording if available |
| 2-6 sec | ...but still feel like you're guessing your way through growth, I built ROSE for you. | BUT STILL GUESSING? | Rapid creator-work visuals: phone, notes, analytics, LIVE interface | Kinetic type lands in two beats, gold light streak | Whip transition into problem sequence | Whoosh, bass hit | Hands setting up phone, notebook/strategy notes, screen scrolls |
| 6-9 sec | Maybe you're showing up, but people aren't staying. | WHY AREN'T PEOPLE STAYING? | LIVE interface gets interrupted by large question text | Question slams over comments, background blurs | Mask wipe | Glitch tap, soft impact | LIVE comments or abstract comment bubbles |
| 9-12 sec | Maybe your community is growing, but your LIVE isn't. | WHY ISN'T MY LIVE GROWING? | Viewer/community nodes grow, then analytics line stalls | Node animation, line chart hesitation | Fast blur cut | Digital rise then drop | Community/chat interface, analytics-style graph |
| 12-16 sec | Or maybe you know you have potential. You just don't know what you're missing. | WHAT AM I MISSING? | Multiple interface layers overlap: comments, metrics, notes | Parallax stack, slight chaos, text interruption | Abrupt audio/visual cut to silence | Glitch stop, breath pause | Screen recordings, desk clips, phone close-ups |
| 16-21 sec | That's why ROSE exists. | THAT'S WHY ROSE EXISTS. | Minimal black/burgundy screen with transparent ROSE logo | Gold light sweep across logo, slow reveal | Clean fade from chaos to calm | Warm cinematic swell | ROSE logo animation asset |
| 21-24 sec | Because going LIVE shouldn't feel like throwing content at the wall and hoping something works. | LIVE STRATEGY | Phone/LIVE layout becomes organized into clear sections | UI grid snaps into place | Slide cut | Interface snap | Phone mockup, planned LIVE notes |
| 24-27 sec | ROSE helps creators understand their performance... | PERFORMANCE | Animated analytics card with bars, retention-style graph, viewer signals | Bars grow, line smooths upward without numeric promises | Speed ramp | Soft data ticks | Analytics screen-style footage or motion graphic |
| 27-30 sec | ...strengthen their LIVE strategy... | COACHING | Scorecard/audit card with checkmarks and notes | Gold checkmarks draw on | Match cut | Pen mark, soft chime | Coaching notes, audit worksheet, laptop/desk |
| 30-33 sec | ...build real community... | COMMUNITY | Connected creator/viewer nodes and comment bubbles | Nodes connect with gold lines | Light sweep | Connection pulse | Community chat, comments, creator interaction |
| 33-36 sec | ...and know what to work on next. | GROWTH | Progress pathway from create to connect to elevate | Path draws forward, final point glows | Push transition | Rising pulse | Planning board, phone setup, creator workspace |
| 36-39 sec | We're not looking for perfect creators. | CONSISTENT. | Dark cinematic screen, one word at a time | Word appears with subtle scale and blur resolve | Beat cut | Soft hit | Abstract brand background |
| 39-42 sec | And you don't need the biggest following in the room. | COACHABLE. | Second trait appears, slightly slower | Kinetic type, gold underline | Beat cut | Soft hit | Creator notes or training/coaching visual |
| 42-44 sec | We're looking for creators who are consistent, coachable... | COMMUNITY-DRIVEN. | Connected node graphic returns | Nodes pulse around word | Beat cut | Pulse | Community/comment visual |
| 44-48 sec | ...community-driven, and ready to become better. | READY TO GROW. | Four traits stack together | Text locks into a premium frame | Fade to centerpiece | Cinematic rise | Hero logo background or abstract ROSE texture |
| 48-53 sec | Because your potential isn't determined by where you're starting. | YOUR POTENTIAL ISN'T DETERMINED BY WHERE YOU START. | Most cinematic moment: black/burgundy field, gold line, subtle particles | Slow zoom, light sweep, long pause | Slow crossfade | Deep swell, airy shimmer | Clean ROSE texture, logo elements |
| 53-56 sec | It's determined by what you're willing to build. | IT'S DETERMINED BY WHAT YOU'RE WILLING TO BUILD. | Text replaces previous line, gold emphasis on BUILD | Word BUILD glows subtly | Speed ramp into payoff | Impact + riser | Abstract brand footage |
| 56-58 sec | Create. Connect. Elevate. | CREATE. CONNECT. ELEVATE. | Three words animate in sequence | One word per beat, gold accents | Gold flash | Three crisp hits | ROSE logo motion asset |
| 58-60 sec | If you're ready to take your LIVE seriously, apply to ROSE. | ROSE AGENCY / YOUR NEXT LEVEL ON LIVE STARTS HERE. / APPLY TO JOIN ROSE → | End card with ROSE logo and CTA direction | Logo settles, CTA arrow slides in | Hold on end card | Final resolve | Final logo animation |

## Editing Notes

- Keep the pace fast from 0-16 seconds, then create contrast with a calm ROSE reveal.
- Do not use fake founder footage or AI people.
- Keep all metrics abstract. Do not show real earnings, follower promises, or fabricated performance claims.
- Captions should be large, high contrast, and readable at 375px mobile width.
- Use metallic gold sparingly for emphasis, not decoration everywhere.

## Final MP4 Placement

When the finished video is exported, place it here:

`public/videos/rose-founder-brand-film.mp4`

Then update:

`lib/site-config.ts`

Set:

```ts
video: {
  useFounderVideoMockup: false,
},
assets: {
  founderVideoUrl: '/videos/rose-founder-brand-film.mp4',
  founderVideoPoster: '/videos/rose-founder-brand-film-poster.jpg',
}
```
