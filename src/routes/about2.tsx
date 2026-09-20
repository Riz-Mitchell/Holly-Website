import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import hollyWithAChicken from "@/assets/HollyWithAChicken.webp";
import swimmingPicture from "@/assets/SwimmingPicture.webp";
import hollyWorkingOnMoisturizer from "@/assets/HollyWorkingOnMoisturizer.webp";
import hollyWithMentor from "@/assets/HollyWithMentor.webp";
import hollyWithTheBeeHive from "@/assets/HollyWithWithTheBeeHive.webp";
import hollyBuildingAHive from "@/assets/HollyBuildingAHiveWithBrother.webp";
import {
  Header,
  Footer,
  useFadeIn,
  GoogleFontsPreload,
  CTA,
} from "@/components/site-layout";

export const Route = createFileRoute("/about2")({
  head: () => ({
    meta: [
      { title: "About — Holly Winkels" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content:
          "The story behind Holly Winkels — from a bee farm on the Mornington Peninsula to national-level swimming and building her own business.",
      },
      { property: "og:title", content: "About — Holly Winkels" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about2" },
    ],
    links: [
      { rel: "canonical", href: "/about2" },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  component: AboutPage,
});

type Chapter = {
  year: number;
  caption: string;
  heading: ReactNode;
  body: string[];
  image: string;
  alt: string;
};

// To add a section, add one object here. The scroll length, year row and
// image/text layers are all derived from this list.
const CHAPTERS: Chapter[] = [
  {
    year: 2005,
    caption: "— Chapter One",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    image: hollyWithAChicken,
    alt: "Placeholder image for 2005",
  },
  {
    year: 2011,
    caption: "— Chapter Two",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    image: swimmingPicture,
    alt: "Placeholder image for 2011",
  },
  {
    year: 2015,
    caption: "— Chapter Three",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
    image: hollyWithTheBeeHive,
    alt: "Placeholder image for 2015",
  },
  {
    year: 2017,
    caption: "— Chapter Four",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    image: hollyBuildingAHive,
    alt: "Placeholder image for 2017",
  },
  {
    year: 2021,
    caption: "— Chapter Five",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    ],
    image: hollyWorkingOnMoisturizer,
    alt: "Placeholder image for 2021",
  },
  {
    year: 2026,
    caption: "— Chapter Six",
    heading: (
      <>
        Placeholder <em className="text-brand">heading</em>
      </>
    ),
    body: [
      "Placeholder paragraph. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    ],
    image: hollyWithMentor,
    alt: "Placeholder image for 2026",
  },
];

// Height of the fixed header (h-16); the pinned stage sits directly below it.
const HEADER_PX = 64;

// Pins a single stage to the viewport while normal page scrolling steps
// through the chapters. Nothing hijacks the scroll: the tall outer section is
// just runway, and the sticky stage is released once the last year is reached.
function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const count = CHAPTERS.length;

  // Scrollable distance while pinned, and how far into it we currently are.
  const getScrollRange = () => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return null;
    const range = section.offsetHeight - stage.offsetHeight;
    const scrolled = HEADER_PX - section.getBoundingClientRect().top;
    return { range, scrolled };
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const m = getScrollRange();
      if (!m || m.range <= 0) return;
      const progress = Math.min(1, Math.max(0, m.scrolled / m.range));
      // Connector i (year i -> i+1) is empty until chapter i activates and full
      // once chapter i+1 does. Written straight to the DOM so scrolling doesn't
      // re-render.
      segmentRefs.current.forEach((el, i) => {
        if (!el) return;
        const fill = Math.min(1, Math.max(0, progress * count - i));
        el.style.setProperty("--p", String(fill));
      });
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const goTo = (index: number) => {
    const m = getScrollRange();
    const section = sectionRef.current;
    if (!m || !section) return;
    // Aim for the middle of the chapter's slice so it lands unambiguously.
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const target = sectionTop - HEADER_PX + ((index + 0.5) / count) * m.range;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Holly's story by year"
      style={{ height: `${count * 100}svh` }}
      className="border-t border-foreground/10"
    >
      <div
        ref={stageRef}
        className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden"
      >
        {/* Mobile: column of [image | vertical timeline] then text.
            sm and up: column of [timeline, row of (text, image)]. */}
        <div className="mx-auto flex h-full w-full max-w-7xl min-h-0 flex-col gap-5 px-6 py-6 sm:grid sm:grid-cols-2 sm:grid-rows-[auto_minmax(0,1fr)] sm:gap-x-16 sm:gap-y-8 lg:gap-x-24 lg:px-10 lg:py-10">
          {/* sm:contents lets the timeline and image join the grid above. */}
          <div className="flex h-[40svh] min-h-0 flex-none flex-row gap-8 sm:contents">
          {/* Year indicator: every year visible, the current one emphasised. */}
          <ol className="order-2 flex shrink-0 flex-col items-center font-display sm:col-span-2 sm:row-start-1 sm:flex-row">
            {CHAPTERS.map((c, i) => (
              <Fragment key={c.year}>
                <li>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    // Years already scrolled through (and the current one) are
                    // brand-coloured; upcoming ones stay faded.
                    className={`cursor-pointer text-lg transition-colors duration-500 motion-reduce:transition-none sm:text-3xl lg:text-4xl ${
                      i <= active
                        ? "text-brand"
                        : "text-foreground/30 hover:text-foreground/60"
                    }`}
                  >
                    {c.year}
                  </button>
                </li>
                {/* Connector to the next year; fills as you scroll between them. */}
                {i < count - 1 && (
                  <li
                    aria-hidden
                    className="my-1.5 min-h-4 w-[2px] flex-1 bg-foreground/15 sm:mx-5 sm:my-0 sm:h-[2px] sm:min-h-0 sm:w-auto"
                  >
                    {/* --p (0..1) is set on scroll; it scales down the line on
                        mobile and along it from sm up. */}
                    <div
                      ref={(el) => {
                        segmentRefs.current[i] = el;
                      }}
                      className="h-full w-full origin-top bg-brand will-change-transform [transform:scaleY(var(--p))] sm:origin-left sm:[transform:scaleX(var(--p))]"
                      style={{ "--p": 0 } as React.CSSProperties}
                    />
                  </li>
                )}
              </Fragment>
            ))}
          </ol>

          {/* Image: one per year, cross-fading as the active year changes. */}
          <div className="relative order-1 min-h-0 min-w-0 flex-1 sm:col-start-2 sm:row-start-2 sm:aspect-[4/5] sm:h-[80%] sm:w-auto sm:max-w-full sm:flex-none sm:self-center sm:justify-self-end">
            {CHAPTERS.map((c, i) => (
              <img
                key={c.year}
                src={c.image}
                alt={c.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                aria-hidden={i !== active}
                className={`absolute inset-0 h-full w-full object-cover contrast-110 transition-opacity duration-700 motion-reduce:transition-none ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          </div>

          {/* Text: layers share one grid cell so the block is as tall as the
              longest chapter and never jumps when swapping. Spacing matches the
              rest of the site (caption mb-6, paragraph mt-10). */}
          <div className="grid shrink-0 sm:col-start-1 sm:row-start-2 sm:self-center">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.year}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 flex flex-col items-start text-left transition-opacity duration-500 motion-reduce:transition-none ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <p className="mb-6 text-xs uppercase tracking-[0.3em] text-brand">
                  {c.caption}
                </p>
                <h2 className="font-display text-[clamp(1.75rem,7vw,2.5rem)] leading-none tracking-tight sm:text-[clamp(2.5rem,5vw,5rem)] lg:text-[clamp(3rem,5vw,5.5rem)]">
                  {c.heading}
                </h2>
                <div className="mt-10 max-w-xl space-y-6 text-[clamp(15px,3.5vw,17px)] leading-relaxed text-foreground/70 sm:text-lg lg:text-xl">
                  {c.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  useFadeIn();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GoogleFontsPreload />

      <Header />

      <section className="relative flex min-h-[80svh] items-center justify-center text-center pt-[calc(8rem_+_env(safe-area-inset-top))] pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
            — About
          </p>
          <h1
            className="fade-in font-display text-[clamp(2.75rem,13vw,4.25rem)] lg:text-[clamp(4rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            My <em className="text-brand">story</em>
          </h1>
        </div>
      </section>

      <StoryTimeline />

      <CTA />

      <Footer />
    </div>
  );
}
