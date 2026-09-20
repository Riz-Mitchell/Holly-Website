import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/holly-hero.webp";
import heroPortraitV2 from "@/assets/holly-hero-v2.webp";
import workImg from "@/assets/holly-work.webp";
import workImg2 from "@/assets/holly-work-2.webp";
import hollyWorking from "@/assets/HollyWorking.webp";
import hollyBeeFrames from "@/assets/HollyWorkingWithBeeFrames.webp";
import hollyBeehive from "@/assets/HollyWithWithTheBeeHive.webp";
import hollyChicken from "@/assets/HollyWithAChicken.webp";
import hollyMoisturizer from "@/assets/HollyWorkingOnMoisturizer.webp";
import hollyBeehiveBrother from "@/assets/HollyBuildingAHiveWithBrother.webp";
import hollyMentor from "@/assets/HollyWithMentor.webp";
import hollySwimming from "@/assets/SwimmingPicture.webp";
import rightArrow from "@/assets/caret-right.svg";
import paperPlane from "@/assets/paper-plane-tilt.svg";
import { useEffect, useRef, useState } from "react";
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
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <GoogleFontsPreload />

      <Header />
      <Hero />
      <ImageCarousel />
      <About />
      <WorkWithMe />
      {/* <Manifesto /> */}
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[95vh] flex items-center pt-[calc(8rem_+_env(safe-area-inset-top))] pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl lg:max-h-lvh px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-rise">
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-8">
            Entrepreneur · Investor · Athlete
          </p>
          <h1 className="font-display text-[clamp(3.25rem,13vw,4.25rem)] lg:text-[clamp(4rem,6vw,7rem)] leading-[0.88] tracking-tight pb-4">
            <AnimatedText
              baseDelay={0}
              stagger={0.1}
              segments={[
                { type: "text", content: "Building the next" },
                { type: "em", content: "chapter", pause: 0.25 },
              ]}
            />
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="fade-in" style={{ transitionDelay: "1.5s" }}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-brand text-brand-foreground px-7 py-4 text-sm uppercase tracking-[0.18em] hover:opacity-60 duration-200"
              >
                Let's Connect
                <RightArrowSvg width={16} height={16} />
              </a>
            </div>
            <div className="fade-in" style={{ transitionDelay: "1.75s" }}>
              <a
                href="/about"
                className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition duration-500"
              >
                My Story
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="py-20 relative overflow-hidden flex justify-center">
            <img
              src={heroPortrait}
              alt="Portrait of Holly Winkels"
              width="100%"
              height="100%"
              className="w-3/4 h-auto object-cover contrast-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const carouselImages = [
  { src: heroPortraitV2, alt: "Portrait of Holly Winkels" },
  { src: hollyWorking, alt: "Holly Winkels at work" },
  { src: hollyBeeFrames, alt: "Holly Winkels working with bee frames" },
  { src: hollyBeehive, alt: "Holly Winkels with the bee hive" },
  { src: hollyChicken, alt: "Holly Winkels with a chicken on the farm" },
  { src: hollyMoisturizer, alt: "Holly Winkels working on moisturizer" },
  {
    src: hollyBeehiveBrother,
    alt: "Holly Winkels building a beehive with her brother",
  },
  { src: hollyMentor, alt: "Holly Winkels with her mentor" },
  { src: hollySwimming, alt: "Holly Winkels swimming competitively" },
];

// Drag/swipe strip with spring physics. Position `x` is driven manually so we
// can layer on: rubber-band resistance when pulled past either end, momentum
// after release (velocity + friction), and a damped spring that pulls it back
// to the edge when it has overshot. The rAF loop only runs while something is
// moving, and it never moves on its own or in response to page scroll.
const CAROUSEL_RUBBER = 0.4; // fraction of finger travel that applies past an edge
const CAROUSEL_FRICTION = 3.2; // momentum decay rate (1/s)
const CAROUSEL_SPRING_K = 170; // edge spring stiffness
const CAROUSEL_SPRING_C = 2 * Math.sqrt(CAROUSEL_SPRING_K) * 0.85; // slightly underdamped

function ImageCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const physics = useRef({
    x: 0,
    v: 0,
    min: 0, // most-negative x (fully scrolled to the end)
    dragging: false,
    startPointerX: 0,
    startX: 0,
    lastPointerX: 0,
    lastTime: 0,
    frame: 0,
    run: () => {},
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const p = physics.current;

    const render = () => {
      track.style.transform = `translate3d(${p.x}px,0,0)`;
    };
    const measure = () => {
      p.min = Math.min(0, viewport.clientWidth - track.scrollWidth);
      if (!p.dragging && p.x < p.min) p.x = p.min;
      render();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);

    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (p.dragging) {
        p.frame = 0;
        return;
      }

      const bound = p.x > 0 ? 0 : p.x < p.min ? p.min : null;
      if (bound !== null) {
        if (reducedRef.current) {
          p.x = bound;
          p.v = 0;
        } else {
          const a = -CAROUSEL_SPRING_K * (p.x - bound) - CAROUSEL_SPRING_C * p.v;
          p.v += a * dt;
          p.x += p.v * dt;
        }
      } else {
        p.v *= Math.exp(-CAROUSEL_FRICTION * dt);
        p.x += p.v * dt;
      }
      render();

      const settled =
        Math.abs(p.v) < 4 &&
        (bound === null ? true : Math.abs(p.x - bound) < 0.3);
      if (settled) {
        if (bound !== null) p.x = bound;
        p.v = 0;
        render();
        p.frame = 0;
        return;
      }
      p.frame = requestAnimationFrame(tick);
    };
    p.run = () => {
      if (p.frame) return;
      last = performance.now();
      p.frame = requestAnimationFrame(tick);
    };

    // Trackpad / horizontal wheel: nudge the strip; the loop springs it back
    // if it goes past an edge. Vertical wheel is left alone so the page scrolls.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      p.v = 0;
      p.x -= e.deltaX;
      p.x = Math.max(p.min - 80, Math.min(80, p.x));
      render();
      p.run();
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(p.frame);
      p.frame = 0;
      ro.disconnect();
      viewport.removeEventListener("wheel", onWheel);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const p = physics.current;
    p.dragging = true;
    p.v = 0;
    p.startPointerX = p.lastPointerX = e.clientX;
    p.startX = p.x;
    p.lastTime = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physics.current;
    if (!p.dragging || !trackRef.current) return;
    const now = performance.now();
    const dtMs = now - p.lastTime;
    if (dtMs > 0) {
      // Smoothed release velocity in px/s.
      const inst = ((e.clientX - p.lastPointerX) / dtMs) * 1000;
      p.v = p.v * 0.6 + inst * 0.4;
    }
    p.lastPointerX = e.clientX;
    p.lastTime = now;

    const target = p.startX + (e.clientX - p.startPointerX);
    // Resist (rubber-band) only the portion dragged past an edge.
    p.x =
      target > 0
        ? target * CAROUSEL_RUBBER
        : target < p.min
          ? p.min + (target - p.min) * CAROUSEL_RUBBER
          : target;
    trackRef.current.style.transform = `translate3d(${p.x}px,0,0)`;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physics.current;
    if (!p.dragging) return;
    p.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Holding still before letting go shouldn't fling.
    if (performance.now() - p.lastTime > 80) p.v = 0;
    if (reducedRef.current) p.v = 0;
    p.run();
  };

  return (
    <section
      aria-label="Photos of Holly Winkels"
      className="w-full border-y border-foreground/10"
    >
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab touch-pan-y select-none overflow-clip active:cursor-grabbing"
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              draggable={false}
              decoding="async"
              loading={i < 3 ? "eager" : "lazy"}
              className="h-64 sm:h-80 lg:h-[26rem] w-auto shrink-0 object-cover mx-1"
            />
          ))}
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

function About() {
  return (
    <section
      id="about"
      className="min-h-[95vh] flex py-28 lg:py-40 items-center"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <div className="fade-in lg:col-span-5">
          <img
            src={workImg}
            alt="Holly Winkels working"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="lg:col-span-7 ap-8">
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
            — About
          </p>
          <h2
            className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            I chose a
            <br />
            <em className="text-brand">different path.</em>
          </h2>
          <div
            className="fade-in space-y-6 w-full max-w-xl text-[clamp(15px,3.5vw,16px)] text-foreground/70 leading-relaxed mt-10"
            style={{ transitionDelay: "0.25s" }}
          >
            <p>
	            I've never been particularly interested in doing things the 
              usual way. When I finished school I chose business over university and 
              pursued swimming at a national level. Now I'm building 
              businesses, exploring acquisitions and looking for opportunities 
              to build and grow.
            </p>
            {/* <p className="font-display italic text-2xl text-foreground">
              That's what I work on. The person, then the business.
            </p> */}
          </div>
          <div className="fade-in mt-8" style={{ transitionDelay: "0.35s" }}>
            <a
              href="/about"
              className="link-underline [--underline-trim:0.18em] inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/50 transition hover:text-foreground/80"
            >
              Read My Story
              <RightArrowSvg width={12} height={12} />
            </a>
          </div>
        </div>
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
            <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
              — Work With Me
            </p>
            <h2
              className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
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
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {services.map((s, i) => (
            <div
              key={s.no}
              className="fade-in"
              style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="bg-background p-10 lg:p-12 group hover:bg-brand transition-colors duration-500 flex flex-col justify-between h-full">
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
          className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
          style={{ transitionDelay: "0.1s" }}
        >
          What
          <br/> 
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

