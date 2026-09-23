import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import hollyWithAChicken from "@/assets/HollyWithAChicken.webp";
import hollyWorkingOnMoisturizer from "@/assets/HollyWorkingOnMoisturizer.webp";
import hollyWithMentor from "@/assets/HollyWithMentor.webp";
import hollyWithTheBeeHive from "@/assets/HollyWithWithTheBeeHive.webp";
import hollyBuildingAHive from "@/assets/HollyBuildingAHiveWithBrother.webp";
import hollyAsABaby from "@/assets/HollyAsABaby.webp";
import hollyBuildingAHiveWithBrother from '@/assets/HollyBuildingAHiveWithBrother.jpeg';
import hollyBeeFrames from '@/assets/HollyWorkingWithBeeFrames.webp';
import hollyBeehive from '@/assets/HollyWithWithTheBeeHive.webp';
import hollyPickingApples from '@/assets/HollyPickingApples.webp';
import hollySwimming from '@/assets/SwimmingPicture.webp';
import hollyWorking from '@/assets/HollyWorking.webp';

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

type ChapterImage = {
  src: string;
  alt: string;
  // Optional per-image crop. Omit for the default centred fill.
  //   position: which part of the photo stays in frame, as a CSS
  //             object-position ("top", "50% 20%", "left center", ...).
  //   zoom:     1 = fit the frame (default); 1.5 = zoom in 50% around `position`.
  crop?: { position?: string; zoom?: number };
};

type Chapter = {
  year: number;
  caption: string;
  heading: ReactNode;
  body: string[];
  // With more than one image, the photo changes part-way between this year and
  // the next; each extra image also adds one screen of scroll to the chapter.
  images: ChapterImage[];
};

// To add a section, add one object here. The scroll length, year row and
// image/text layers are all derived from this list.
const CHAPTERS: Chapter[] = [
  {
    year: 2005,
    caption: "— The beginning",
    heading: (
      <>
        Little <em className="text-brand">me</em>
      </>
    ),
    body: [
      "I grew up on a farm on the Mornington Peninsula, surrounded by animals, family and a business that was always a part of everyday life. I watched my parents build their business from the ground up and saw firsthand the work and responsibility that came with it.",
    ],
    images: [
      { src: hollyAsABaby, alt: "Placeholder image for 2005" },
      { src: hollyBuildingAHiveWithBrother, alt: "Placeholder image for 2005" },
      { src: hollyPickingApples, alt: "Placeholder image for 2005" },],
  },
  {
    year: 2011,
    caption: "— Growing Up",
    heading: (
      <>
        Early <em className="text-brand">Learning</em>
      </>
    ),
    body: [
      "Some of my earliest memories are of helping Mum and Dad around the business with my brother and sister. Whether it was making products, helping in the shop or doing whatever little jobs I could do to help out.",
    ],
    images: [
      { src: hollyBeeFrames, alt: "Placeholder image for 2011" },
      { src: hollyBeehive, alt: "Placeholder image for 2011", crop: { "position": "left center"} },
      { src: hollyWorkingOnMoisturizer, alt: "Placeholder image for 2011", crop: { "position": "left center" } },
    ],
  },
  {
    year: 2015,
    caption: "— Swimming And School",
    heading: (
      <>
        Finding my <em className="text-brand">passion</em>
      </>
    ),
    body: [
      "Swimming was my whole life during my teens. I was up at 3:45 AM most mornings to train, balancing eight sessions a week with high school so I could compete at the national level.",
    ],
    images: [
      { src: hollySwimming, alt: "Placeholder image for 2015" }],
  },
  {
    year: 2017,
    caption: "— Moving Forward",
    heading: (
      <>
        Life after <em className="text-brand">school</em>
      </>
    ),
    body: [
      "I graduated in 2023 and decided not to go to university. I didn't want to spend years studying something I didn't actually enjoy or see myself pursuing just because it was the expected next step.",
    ],
    images: [{ src: hollyBuildingAHive, alt: "Placeholder image for 2017" }],
  },
  {
    year: 2025,
    caption: "— Family Back Together",
    heading: (
      <>
        Back to <em className="text-brand">business</em>
      </>
    ),
    body: [
      "While working at Rebel Sport, my sister’s declining health shifted my priorities toward family. Seeing my parents balance caring for her with running our family business made me realise where I was needed. I left Rebel Sport to support my family and take on a greater role in the business.",
    ],
    images: [
      { src: hollyWorkingOnMoisturizer, alt: "Placeholder image for 2021" },
    ],
  },
  {
    year: 2026,
    caption: "— The Future",
    heading: (
      <>
        Where I'm <em className="text-brand">going</em>
      </>
    ),
    body: [
      "One of the biggest shifts for me has been surrounding myself with people who have already done what I want to do and learning from their experience. It's changed the way I think about what's possible and where I want to go next. My focus now is on acquisitions, finding the right opportunity and taking it to the next level.",
    ],
    images: [{ src: hollyWorking, alt: "Placeholder image for 2026" }],
  },
];

// Scroll is measured in "screens": each image is worth one, so a chapter with
// three photos takes three screens. STARTS[i] is where chapter i begins.
const UNITS = CHAPTERS.map((c) => c.images.length);
const STARTS = UNITS.map((_, i) =>
  UNITS.slice(0, i).reduce((sum, n) => sum + n, 0),
);
const TOTAL_UNITS = UNITS.reduce((sum, n) => sum + n, 0);

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
  const [activeImage, setActiveImage] = useState(0);
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
      const pos = progress * TOTAL_UNITS;
      // Connector i (year i -> i+1) is empty until chapter i activates and full
      // once chapter i+1 does, however many screens that chapter spans. Written
      // straight to the DOM so scrolling doesn't re-render.
      segmentRefs.current.forEach((el, i) => {
        if (!el) return;
        const fill = Math.min(1, Math.max(0, (pos - STARTS[i]) / UNITS[i]));
        el.style.setProperty("--p", String(fill));
      });
      let chapter = count - 1;
      while (chapter > 0 && pos < STARTS[chapter]) chapter--;
      setActive(chapter);
      setActiveImage(
        Math.min(UNITS[chapter] - 1, Math.max(0, Math.floor(pos - STARTS[chapter]))),
      );
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
    // Land exactly where the year starts (its connector empty, first image
    // showing). The extra pixel keeps rounding from putting us a hair before
    // the boundary, which would show the previous year.
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const target =
      sectionTop - HEADER_PX + (STARTS[index] / TOTAL_UNITS) * m.range + 1;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Holly's story by year"
      style={{ height: `${TOTAL_UNITS * 100}svh` }}
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

          {/* Image: every chapter's images stacked, cross-fading as the year or
              the image within a year changes. */}
          <div className="relative order-1 min-h-0 min-w-0 flex-1 overflow-hidden rounded-[2rem] sm:col-start-2 sm:row-start-2 sm:aspect-[4/5] sm:h-[80%] sm:w-auto sm:max-w-full sm:flex-none sm:self-center sm:justify-self-end">
            {CHAPTERS.flatMap((c, i) =>
              c.images.map((img, j) => {
                const visible = i === active && j === activeImage;
                return (
                  <img
                    key={`${c.year}-${j}`}
                    src={img.src}
                    alt={img.alt}
                    loading={i === 0 && j === 0 ? "eager" : "lazy"}
                    decoding="async"
                    aria-hidden={!visible}
                    style={{
                      objectPosition: img.crop?.position,
                      // Zoom around the same point the crop is anchored to. The
                      // frame above clips the overflow.
                      transform: img.crop?.zoom
                        ? `scale(${img.crop.zoom})`
                        : undefined,
                      transformOrigin: img.crop?.position,
                    }}
                    className={`absolute inset-0 h-full w-full object-cover contrast-110 transition-opacity duration-700 motion-reduce:transition-none ${
                      visible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              }),
            )}
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
                <div className="mt-5 max-w-xl space-y-6 text-[clamp(15px,3.5vw,17px)] leading-relaxed text-foreground/70 sm:text-lg lg:text-xl">
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
