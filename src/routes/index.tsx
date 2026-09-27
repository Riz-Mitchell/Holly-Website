import { createFileRoute } from "@tanstack/react-router";
import workImg2 from "@/assets/holly-work-2.jpeg";
import roleEntrepreneur from "@/assets/HollyWorking.webp";
import roleInvestor from "@/assets/HollyWithMentor.webp";
import roleAthlete from "@/assets/SwimmingPicture.webp";
import photoBees from "@/assets/HollyWorkingWithBeeFrames.webp";
import photoHive from "@/assets/HollyBuildingAHiveWithBrother.webp";
import hollyHero from "@/assets/holly-hero.webp";

import hollyPodcast from "@/assets/HollyPodcast.webp";
import hollyBlueOnStage from "@/assets/HollyBlueOnStage.webp";

import hollyGrayShirtWorking from "@/assets/HollyGrayShirtWorking.webp"
import hollyOnStage from "@/assets/HollyOnStage.webp"

import rightArrow from "@/assets/caret-right.svg";
import paperPlane from "@/assets/paper-plane-tilt.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Header,
  Footer,
  RightArrowSvg,
  useFadeIn,
  GoogleFontsPreload,
  CTA,
} from "@/components/site-layout";

type TextSegment =
  | { type: "text"; content: string; pause?: number }
  | { type: "em"; content: string; pause?: number }
  | { type: "br"; pause?: number };

function AnimatedText({
  segments,
  className,
  baseDelay = 0,
  stagger = 0.06,
}: {
  segments: TextSegment[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  let wordIndex = 0;

  const renderSegment = (seg: TextSegment, i: number) => {
    if (seg.type === "br") return <br key={`br-${i}`} />;

    const extraPause = seg.pause ?? 0;
    const words = seg.content.split(" ").filter(Boolean);

    return words.map((word) => {
      const delay = baseDelay + wordIndex * stagger + extraPause;
      wordIndex++;
      const span = (
        <span
          key={`${i}-${wordIndex}`}
          className="fade-in inline-block"
          style={{ transitionDelay: `${delay}s` }}
        >
          {word}&nbsp;
        </span>
      );
      return seg.type === "em" ? (
        <em key={`em-${i}-${wordIndex}`} className="text-brand not-italic">
          {span}
        </em>
      ) : (
        span
      );
    });
  };

  return (
    <span className={className}>
      {segments.map((seg, i) => renderSegment(seg, i))}
    </span>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Holly Winkels — Entrepreneur & Investor" },
      {
        name: "description",
        content:
          "Holly Winkels is an entrepreneur helping ambitious founders build businesses that matter. Strategy, story, and unshakeable execution.",
      },
      {
        property: "og:title",
        content: "Holly Winkels — Entrepreneur & Investor",
      },
      {
        property: "og:description",
        content:
          "Build a business that matters. Work with Holly Winkels on strategy, story, and execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useFadeIn();
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <GoogleFontsPreload />

      <Header />
      <Hero />
      <div id="roles">
        <RoleShowcase />
      </div>
      <Story />
      <PhotoStrip />
      <InTheirWords />
      <hr className="border-t border-foreground/10" />
      <WorkWithMe />
      {/* <Manifesto /> */}
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </div>
  );
}

// Eased 0..1 ramp between two values, so fades start and end gently.
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

// Scroll-driven showcase. The outer block is tall; the inner panel sticks to
// the viewport while scroll progress swaps between roles, then releases.
// Images are fixed per role (not random) so server and client render the same.
// Desktop overlay text: the same for every role; only the image changes.
const ROLES_INTRO =
  "I've spent my whole life surrounded by business and performance most recently scaling a multimillion dollar family enterprise and placing it under management.\nToday I work with ambitious entrepreneurs to unlock wealth opportunities and help build scalable businesses.\nI'm building a future to inspire the younger generations.\nI'm actively searching for potential acquisitions, partnerships and investment opportunities.\nI look forward to connecting with you!";

const ROLES = [
  {
    title: "Entrepreneur",
    text: "[PLACEHOLDER: a sentence or two on what being an entrepreneur looks like day to day.]",
    image: hollyHero,
    alt: "Holly working on a product",
  },
  {
    title: "Investor",
    text: "[PLACEHOLDER: a sentence or two on how Holly invests and what she looks for.]",
    image: roleEntrepreneur,
    alt: "Holly with a mentor",
  },
  {
    title: "Athlete",
    text: "[PLACEHOLDER: a sentence or two on swimming and the early mornings.]",
    image: roleAthlete,
    alt: "Holly swimming",
  },
];

function RoleShowcase() {
  return (
    <>
      <RoleShowcaseMobile />
      <RoleShowcaseDesktop />
    </>
  );
}

// Mobile / tablet: the panel pins and swaps one role at a time.
function RoleShowcaseMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Content stays hidden until the panel pins, and fades before it releases,
  // so it never visibly slides.
  const [side, setSide] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const pinned = -rect.top / scrollable;
      setActive(
        Math.min(
          Math.floor(Math.min(Math.max(pinned, 0), 0.999) * ROLES.length),
          ROLES.length - 1,
        ),
      );
      setSide(smoothstep(0, 0.12, pinned) * smoothstep(0, 0.12, 1 - pinned));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative h-[300vh] lg:hidden" aria-label="Roles">
      <div className="sticky top-0 h-screen overflow-hidden pt-16">
        <div className="relative h-full" style={{ opacity: side }}>
          {ROLES.map((role, i) => (
            <div
              key={role.title}
              aria-hidden={i !== active}
              className={`absolute inset-0 mx-auto grid max-w-7xl grid-rows-[auto_1fr_auto] items-center gap-6 px-6 pb-16 pt-8 text-center transition-opacity duration-700 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <p className="order-2 mx-auto max-w-sm text-[15px] leading-relaxed text-foreground/70">
                {role.text}
              </p>
              <h2 className="font-display order-1 text-center text-[clamp(2.75rem,12vw,4.25rem)] leading-none tracking-tight">
                {role.title}
              </h2>
              <img
                src={role.image}
                alt={role.alt}
                loading="lazy"
                className="order-3 mx-auto h-full max-h-[38vh] w-auto max-w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-6 left-0 right-0 flex justify-center gap-2"
          aria-hidden="true"
        >
          {ROLES.map((role, i) => (
            <span
              key={role.title}
              className={`h-1.5 rounded-full bg-foreground transition-all duration-500 ${
                i === active ? "w-8 opacity-80" : "w-1.5 opacity-20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Desktop: the titles are ordinary page content and scroll with the page (no
// pinning, so scrolling is never interrupted). The text and image are a fixed
// overlay that fades in while the section is on screen and swaps to match the
// title nearest the middle of the viewport.
function RoleShowcaseDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [overlay, setOverlay] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState<number[]>(
    ROLES.map((_, i) => (i === 0 ? 1 : 0.12)),
  );

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const mid = vh / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      let firstC = 0;
      let lastC = 0;
      const opacities = ROLES.map((_, i) => {
        const el = titleRefs.current[i];
        if (!el) return 0.12;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (i === 0) firstC = center;
        if (i === ROLES.length - 1) lastC = center;
        const dist = Math.abs(center - mid);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
        return 1 - Math.min(dist / (vh * 0.4), 1) * 0.88;
      });
      setTitleOpacity(opacities);
      setActive(nearest);
      // Every role owns an equal slice of scroll (half the title spacing either
      // side of its title). The overlay is fully on between the first and last
      // title, and fades over half a screen beyond them, so the first and last
      // images last as long as the middle one.
      const beyond = Math.max(firstC - mid, mid - lastC, 0);
      setOverlay(1 - smoothstep(0, vh * 0.5, beyond));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block" aria-label="Roles">
      {/* Fixed overlay: static text (left) and image (right). */}
      <div
        className="pointer-events-none fixed inset-0 z-10 flex items-center"
        style={{
          opacity: overlay,
          visibility: overlay > 0 ? "visible" : "hidden",
        }}
      >
        <div className="grid h-[70vh] w-full grid-cols-3 items-center gap-12 px-10 2xl:gap-24 2xl:px-16">
          <div className="relative h-full">
            <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-pre-line text-base lg:text-[clamp(1rem,1.1vw,2.25rem)] leading-relaxed text-foreground/70">
              {ROLES_INTRO}
            </p>
          </div>
          <div />
          <div className="relative h-full">
            {ROLES.map((role, i) => (
              <img
                key={role.title}
                src={role.image}
                alt={role.alt}
                aria-hidden={i !== active}
                className={`absolute inset-0 mx-auto h-full w-auto max-w-full object-cover transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Titles: normal flow, scrolling with the page. */}
      <div className="pb-[30vh] pt-[25vh]">
        {ROLES.map((role, i) => (
          <div
            key={role.title}
            ref={(el) => {
              titleRefs.current[i] = el;
            }}
            className="flex h-[50vh] items-center justify-center"
          >
            <h2
              className="font-display text-center text-[clamp(3rem,6vw,14rem)] leading-none tracking-tight"
              style={{ opacity: titleOpacity[i] }}
            >
              {role.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col items-center pt-[calc(8rem_+_env(safe-area-inset-top))] pb-8 lg:pt-44 lg:pb-8 overflow-hidden"
    >
      <div className="relative flex w-full min-h-[calc(100svh-8rem)] lg:min-h-[calc(100svh-11rem)] flex-col items-center justify-center pb-12">
        <div className="w-full px-6 lg:px-10 text-center animate-rise">
          <h1 className="font-display text-[clamp(2.75rem,12vw,4.25rem)] lg:text-[clamp(4rem,7vw,16rem)] leading-[0.92] tracking-tight pb-4">
            <AnimatedText
              baseDelay={0}
              stagger={0.1}
              segments={[
                { type: "text", content: "Building for the long term," },
                { type: "em", content: "not the quick exit.", pause: 0.25 },
              ]}
            />
          </h1>

          <figure
            className="fade-in mx-auto mt-6 max-w-2xl lg:mt-8 lg:max-w-[max(42rem,45vw)]"
            style={{ transitionDelay: "1.4s" }}
          >
            <blockquote className="font-display text-[clamp(1.05rem,4vw,1.25rem)] lg:text-[clamp(1.4rem,1.7vw,4rem)] leading-snug text-foreground/80">
              “There is no such thing as a quantum leap. There is only dogged
              persistence.”
            </blockquote>
            <figcaption className="mt-3 text-xs lg:text-[clamp(0.75rem,0.75vw,1.5rem)] uppercase tracking-[0.3em] text-foreground/60">
              — James Dyson
            </figcaption>
          </figure>
        </div>

        <div
          className="fade-in absolute bottom-6 left-0 right-0 flex justify-center"
          style={{ transitionDelay: "1.7s" }}
        >
          <a
            href="#roles"
            aria-label="Scroll down"
            className="animate-bob inline-flex rotate-90 text-foreground/70 hover:text-foreground transition-colors"
          >
            <RightArrowSvg width={20} height={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

const STORY_TEXT =
  "I grew up on a Mornington Peninsula farm watching my parents build a business, where my siblings and I helped out from an early age. A former competitive swimmer who balanced national-level training with school, I graduated in 2023 and chose to enter the workforce directly rather than attend university. After working at Rebel Sport, family health challenges led me back to join and support our family business full-time in 2025. Today, I focus on growth through business acquisitions, learning from experienced mentors, and identifying new opportunities to scale.";

function Story() {
  return (
    <section id="my-story" className="scroll-mt-16 pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-left lg:max-w-[max(36rem,38vw)]">
          <h2 className="fade-in font-display mb-10 text-center text-[clamp(2.25rem,10vw,3.25rem)] leading-none tracking-tight lg:mb-14 lg:text-[clamp(3rem,4vw,5rem)]">
            My <em className="text-brand not-italic">story</em>
          </h2>
          <p className="fade-in text-[15px] lg:text-[clamp(1rem,1.1vw,2.25rem)] text-foreground/70 leading-relaxed">
            <span
              className="font-display mr-1 inline-block align-baseline text-[3.5em] leading-[0.7] text-foreground"
              aria-hidden="true"
            >
              {STORY_TEXT[0]}
            </span>
            <span className="sr-only">{STORY_TEXT[0]}</span>
            {STORY_TEXT.slice(1)}
          </p>
        </div>
      </div>
    </section>
  );
}

// Row of five equal squares running nearly edge to edge, like YC's photo strip:
// 12px side padding, ~13px gaps, 8px corners. Swap the photos here.
const PHOTOS = [
  { src: hollyPodcast, alt: "Holly as a baby" },
  { src: hollyBlueOnStage, alt: "Holly on stage by herself" },
  { src: hollyGrayShirtWorking, alt: "Holly working at desk" },
  { src: hollyOnStage, alt: "Holly on stage with people" },
  { src: photoHive, alt: "Holly building a hive with her brother" },
];

function PhotoStrip() {
  return (
    <section aria-label="Photos" className="fade-in">
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-[13px] overflow-x-auto px-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {PHOTOS.map((photo) => (
          <li
            key={photo.alt}
            className="w-[62vw] max-w-[22rem] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="aspect-square w-full rounded-[8px] object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

const WORDS = [
  {
    quote:
      "“Holly is incredibly driven and intentional about where she’s heading. What stands out to me is her willingness to learn, seek out people who are ahead of her and then actually put that knowledge into action. She has a clear vision for what she wants to build and the determination to make it happen.”",
    name: "Mariecris",
    role: "Abundance Property",
  },
  {
    quote:
      "“Working with Holly has been such a great experience. She brings a clear vision, takes initiative and is genuinely open to ideas and feedback. She has a strong understanding of what she wants to achieve and isn’t afraid to ask questions, make decisions and take action.”",
    name: "Elsie",
    role: "New Co Digital",
  },
  {
    quote:
      "“Holly is one of those people who naturally takes initiative. She’s professional, reliable and genuinely invested in understanding business and building strong relationships. What stands out most is her drive — when Holly sets her mind to something, she follows through.”",
    name: "Martia",
    role: "@pilatesalbury",
  },
];

function InTheirWords() {
  return (
    <section className="pb-24 pt-16 lg:pb-40 lg:pt-[70px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Same column as "My story": centred block, left-aligned text. */}
        <div className="mx-auto max-w-xl text-left lg:max-w-[max(36rem,38vw)]">
          <h2 className="fade-in font-display mb-10 text-center text-[clamp(2.25rem,10vw,3.25rem)] leading-none tracking-tight lg:mb-14 lg:text-[clamp(3rem,4vw,5rem)]">
            In their <em className="text-brand not-italic">words</em>
          </h2>
          <div>
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <hr
                    aria-hidden="true"
                    className="mx-8 my-10 h-0 border-0 border-t-2 border-brand opacity-10"
                  />
                )}
                <figure className="fade-in">
                  <blockquote className="text-[15px] lg:text-[clamp(1rem,1.1vw,2.25rem)] leading-relaxed text-foreground/70">
                    <span className="font-display mr-1 inline-block align-baseline text-[3.5em] leading-[0.7] text-foreground">
                      {w.quote[0]}
                    </span>
                    {w.quote.slice(1)}
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-foreground/60">
                    <span className="text-foreground">{w.name}</span>
                    <span className="mx-2">·</span>
                    {w.role}
                  </figcaption>
                </figure>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const marqueeItems = [
  "Young Entrepreneur",
  "Farm Kid",
  "Deal Dome Speaker",
  "Inspiring The Next Generation",
  "2× Exit",
  "Investor",
];

function Marquee() {
  // Shuffle after mount only. Randomising at module scope gave the server and
  // the browser different orders, which threw a hydration error and killed
  // interactivity for the whole page.
  const [items, setItems] = useState(marqueeItems);
  useEffect(() => setItems(shuffle(marqueeItems)), []);

  return (
    <section className="border-y border-foreground/10 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl px-32 text-foreground/70 inline-flex items-center"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function WorkWithMe() {
  const services = [
    {
      no: "01",
      title: "Acquisitions",
      desc: "I'm currently looking to acquire established businesses with strong foundations, great people and opportunities for growth.",
    },
    {
      no: "02",
      title: "Partnerships",
      desc: "Open to strategic partnerships and opportunities across agriculture, food, manufacturing, retail and wholesale.",
    },
    {
      no: "03",
      title: "Speaking and Media",
      desc: "Collaborations, media and speaking opportunities across entrepreneurship, business and sport.",
    },
  ];

  return (
    <section
      id="work"
      className="min-h-screen flex py-28 lg:py-40 border-t border-foreground/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-20 gap-8">
          <div className="lg:w-1/2">
            <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-3 sm:mb-6">
              — Work With Me
            </p>
            <h2
              className="fade-in font-display text-[clamp(2.25rem,10vw,3.25rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Where I'm <em className="text-brand">focused</em>
            </h2>
          </div>
          {/* <div className="lg:w-5/12">
            <img
              src={workImg2}
              alt="Holly Winkels working"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover"
            />
          </div> */}
        </div>
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {services.map((s, i) => (
            <div
              key={s.no}
              className="fade-in"
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="bg-background p-10 lg:p-12 group rounded-[2rem] border border-foreground/10 hover:border-brand hover:bg-brand transition-colors duration-500 flex flex-col justify-between h-full">
                <div>
                  <p className="font-display text-6xl text-brand group-hover:text-brand-foreground transition-colors">
                    {s.no}
                  </p>
                  <h3 className="font-display text-[2rem] lg:text-3xl mt-6 mb-4 group-hover:text-brand-foreground transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-foreground/70 group-hover:text-brand-foreground/90 leading-relaxed transition-colors">
                    {s.desc}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 w-fit mt-8 text-xs uppercase tracking-[0.18em] border-b border-foreground/40 pb-1 group-hover:border-brand-foreground group-hover:text-brand-foreground transition-colors"
                >
                  Enquire
                  <RightArrowSvg width={12} height={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Quote = { q: string; n: string; r: string };

const quotes: Quote[] = [
  {
    q: "Holly approaches business the way great athletes approach competition with intensity, focus, and zero quit. Her energy alone will push you further than you thought possible.",
    n: "Riley Mitchell",
    r: "Founder, Swim Rebase",
  },
  {
    q: "Twelve weeks with Holly was worth more than two years of advisors, accelerators and books combined. She tells you the truth, kindly.",
    n: "David Okonkwo",
    r: "CEO, Relay Health",
  },
  {
    q: "I came in burned out and ready to sell. I left with the clearest vision of my company I've ever had. We tripled revenue in nine months.",
    n: "Sasha Reilly",
    r: "Founder, Ground & Co.",
  },
];

const AUTOPLAY_MS = 10000;

function QuoteCard({ t }: { t: Quote }) {
  return (
    <figure className="flex h-full flex-col border-t border-foreground/20 pt-8">
      <blockquote className="font-display text-[1.75rem] lg:text-2xl leading-snug flex-1">
        <span className="text-brand text-4xl leading-none mr-1">"</span>
        {t.q}
        <span className="text-brand text-4xl leading-none mr-1">"</span>
      </blockquote>
      <figcaption className="mt-8 pt-6 border-t border-foreground/10">
        <p className="text-sm uppercase tracking-[0.18em]">{t.n}</p>
        <p className="text-sm text-foreground/60 mt-1">{t.r}</p>
      </figcaption>
    </figure>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function QuoteCarousel({ items }: { items: Quote[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  // `index` is the single source of truth. The autoplay timer advances it, a
  // swipe reports back into it, and the track scroll position follows it.
  // Keeps running even while scrolled out of view, by design — pausing there
  // made it visually jarring to come back to a frozen slide.
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(id);
  }, [index, reduced, items.length]);

  // Bring the track to whatever slide `index` names. No-ops when the user
  // swiped there themselves, so a swipe never fights its own animation.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const to = index * el.clientWidth;
    if (Math.abs(el.scrollLeft - to) < 2) return;

    if (reduced || document.hidden) {
      el.scrollLeft = to;
      return;
    }

    // Hand the animation to the browser. Driving scrollLeft per frame pins the
    // motion to the main thread and visibly stutters on iOS; the native smooth
    // scroll is composited and cooperates with scroll snapping on its own.
    animatingRef.current = true;
    el.scrollTo({ left: to, behavior: "smooth" });

    // There is no widely supported completion event, so release the guard once
    // the position settles, with a ceiling that also covers browsers where
    // smooth scrolling is a no-op.
    let poll = 0;
    const done = () => {
      clearInterval(poll);
      clearTimeout(ceiling);
      animatingRef.current = false;
    };
    poll = window.setInterval(() => {
      if (Math.abs(el.scrollLeft - to) < 2) done();
    }, 100);
    const ceiling = window.setTimeout(() => {
      if (Math.abs(el.scrollLeft - to) >= 2) el.scrollLeft = to;
      done();
    }, 1500);

    return done;
  }, [index, reduced]);

  // Swipes: read the settled position back into `index`. Ignored mid-animation,
  // otherwise our own scrolling would drag the index backwards.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (animatingRef.current || !el.clientWidth) return;
      const next = Math.round(el.scrollLeft / el.clientWidth);
      setIndex((prev) => (prev === next ? prev : next));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        aria-label="Founder testimonials"
      >
        {items.map((t, i) => (
          <div key={i} className="w-full shrink-0 snap-center px-6">
            <QuoteCard t={t} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        {items.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={active ? "true" : undefined}
              className="p-2"
            >
              <span
                className={`block h-2 overflow-hidden rounded-full bg-foreground/20 transition-[width] duration-500 ease-out ${
                  active ? "w-8" : "w-2"
                }`}
              >
                {active &&
                  (reduced ? (
                    <span className="block h-full w-full rounded-full bg-foreground" />
                  ) : (
                    <span
                      key={index}
                      className="animate-dot-fill block h-full w-full rounded-full bg-foreground"
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: "running",
                      }}
                    />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="min-h-[95vh] flex py-28 lg:py-40 border-t border-foreground/10"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
          — Testimonials
        </p>
        <h2
          className="fade-in font-display text-[clamp(2.25rem,10vw,3.25rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
          style={{ transitionDelay: "0.1s" }}
        >
          What
          <br />
          people are <em className="text-brand">saying</em>
        </h2>

        {/* Mobile + tablet: auto-advancing swipe carousel */}
        <div className="fade-in mt-10" style={{ transitionDelay: "0.25s" }}>
          <QuoteCarousel items={quotes} />
        </div>

        {/* Desktop: unchanged three-column grid */}
        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-3">
          {quotes.map((t, i) => (
            <div
              key={i}
              className="fade-in"
              style={{ transitionDelay: `${0.25 + i * 0.15}s` }}
            >
              <QuoteCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
