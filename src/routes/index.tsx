import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/holly-hero.webp";
import stageImg from "@/assets/holly-stage.jpg";
import workImg from "@/assets/holly-work.jpeg";
import workImg2 from "@/assets/holly-work-2.jpeg";
import rightArrow from "@/assets/caret-right.svg";
import paperPlane from "@/assets/paper-plane-tilt.svg";
import { useEffect } from "react";

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
      { title: "Holly Winkels — Entrepreneur & Founder" },
      {
        name: "description",
        content:
          "Holly Winkels is an entrepreneur helping ambitious founders build businesses that matter. Strategy, story, and unshakeable execution.",
      },
      {
        property: "og:title",
        content: "Holly Winkels — Entrepreneur & Founder",
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
    <div className="min-h-screen bg-background text-foreground">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Header />
      <Hero />
      <Marquee />
      <About />
      <WorkWithMe />
      {/* <Manifesto /> */}
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 backdrop-blur-md bg-background/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-tight">
          Holly Winkels
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] text-foreground/70">
          <a href="#about" className="hover:text-foreground transition">
            About
          </a>
          <a href="#work" className="hover:text-foreground transition">
            Work With Me
          </a>
          <a href="#testimonials" className="hover:text-foreground transition">
            Stories
          </a>
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.18em] px-4 py-2 bg-brand text-brand-foreground hover:opacity-60 transition duration-200"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl lg:max-h-lvh px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-rise">
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-8">
            Entrepreneur · Investor · Athlete
          </p>
          <h1 className="font-display text-[clamp(3rem,12vw,4rem)] lg:text-[clamp(4rem,6vw,7rem)] leading-[0.88] tracking-tight">
            <AnimatedText
              baseDelay={0.1}
              stagger={0.2}
              segments={[
                { type: "text", content: "Build a" },
                { type: "br" },
                { type: "text", content: "business that" },
                { type: "br" },
                { type: "em", content: "matters.", pause: 1 },
              ]}
            />
          </h1>
          {/* <p
            className="fade-in mt-10 w-full max-w-sm text-[clamp(12px,3vw,16px)] text-foreground/70 leading-relaxed"
            style={{ transitionDelay: "4.0s" }}
          >
            Holly Winkels is a 20-year old entrepreneur from Melbourne
          </p> */}
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="fade-in" style={{ transitionDelay: "3.0s" }}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-brand text-brand-foreground px-7 py-4 text-sm uppercase tracking-[0.18em] hover:translate-x-1 transition-transform duration-500"
              >
                Work With Me
                <RightArrowSvg width={16} height={16} />
              </a>
            </div>
            <div className="fade-in" style={{ transitionDelay: "3.4s" }}>
              <a
                href="#about"
                className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition duration-500"
              >
                My Story
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-brand/20 blur-3xl" aria-hidden />
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

function RightArrowSvg({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      className="text-brand-foreground"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
    </svg>
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

const marqueeItems = shuffle([
  "Young Entrepreneur",
  "Farm Kid",
  "Deal Dome Speaker",
  "Inspiring The Next Generation",
  "2× Exit",
  "Investor",
]);

function Marquee() {
  return (
    <section className="border-y border-foreground/10 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
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
      className="min-h-screen flex py-28 lg:py-40 items-center"
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
            className="fade-in font-display text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            Create a life
            <br />
            that feels
            <br />
            <em className="text-brand">meaningful.</em>
          </h2>
          <div className="space-y-6 w-full max-w-xl text-[clamp(12px,3vw,16px)] text-foreground/70 leading-relaxed mt-10">
            <p>
              {/* My focus is simple: growth, learning and building a legacy over
              time. I've gained hands-on experience working within a family
              business while developing my own direction in entrepreneurship.
              I'm now focused on scaling, acquisitions, and long-term
              opportunities that create real impact, freedom, and fulfillment. */}
              My focus is simple: growth, execution, and building meanigful
              companies. I've partnered with multimillion-dollar businesses
              overseeing strategy, operations and growth. Now I focus on
              entrepreneurship, acquisitions and scaling companies for a real
              impact.
            </p>
            <p></p>
            {/* <p className="font-display italic text-2xl text-foreground">
              That's what I work on. The person, then the business.
            </p> */}
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
      desc: "I'm actively seeking opportunities to acquire established businesses with strong foundations and clear potential for operational improvement, growth, and long term value creation.",
    },
    {
      no: "02",
      title: "Partnerships",
      desc: "Open to strategic partnerships and opportunities across agriculture food manufacturing retail and wholesale.",
    },
    {
      no: "03",
      title: "Media Opportunities",
      desc: "Collaborations, media features, and brand opportunities that align with entrepreneurship, business growth, and inspiring for the next generation.",
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
              className="fade-in font-display text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Three ways
              <br />
              we can <em className="text-brand">work together.</em>
            </h2>
            <p className="space-y-6 w-full max-w-sm text-[clamp(12px,3vw,16px)] text-foreground/70 leading-relaxed mt-10">
              Everything I do is built on the same belief: your business will
              only ever be as bold as you are.
            </p>
          </div>
          <div className="lg:w-5/12">
            <img
              src={workImg2}
              alt="Holly Winkels working"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {services.map((s) => (
            <div
              key={s.no}
              className="bg-background p-10 lg:p-12 group hover:bg-brand transition-colors duration-500 flex flex-col justify-between h-full"
            >
              <div>
                <p className="font-display text-6xl text-brand group-hover:text-brand-foreground transition-colors">
                  {s.no}
                </p>
                <h3 className="font-display text-3xl mt-6 mb-4 group-hover:text-brand-foreground transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={stageImg}
          alt=""
          loading="lazy"
          width={1280}
          height={896}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-soft mb-8">
          — Manifesto
        </p>
        <p className="font-display text-3xl lg:text-5xl leading-[1.15] text-white">
          I don't believe in <em className="text-brand-soft">hustle</em>. I
          believe in conviction.
          <br />I don't believe in <em className="text-brand-soft">hacks</em>. I
          believe in craft.
          <br />I don't believe in{" "}
          <em className="text-brand-soft">personal brands</em>.<br />I believe
          in people who are{" "}
          <span className="underline decoration-brand-soft decoration-4 underline-offset-8">
            unmistakably themselves
          </span>{" "}
          — and then build the business to match.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
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

  return (
    <section
      id="testimonials"
      className="min-h-screen flex py-28 lg:py-40 border-t border-foreground/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
          — Stories
        </p>
        <h2
          className="fade-in font-display text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
          style={{ transitionDelay: "0.1s" }}
        >
          What founders
          <br />
          <em className="text-brand">are saying.</em>
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-10">
          {quotes.map((t, i) => (
            <figure
              key={i}
              className="fade-in flex flex-col border-t border-foreground/20 pt-8"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <blockquote className="font-display text-2xl leading-snug flex-1">
                <span className="text-brand text-4xl leading-none mr-1">"</span>
                {t.q}
                <span className="text-brand text-4xl leading-none mr-1">"</span>
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-foreground/10">
                <p className="text-sm uppercase tracking-[0.18em]">{t.n}</p>
                <p className="text-sm text-foreground/60 mt-1">{t.r}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="contact"
      className="min-h-screen flex py-32 lg:py-48 bg-brand text-brand-foreground"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <p className="fade-in text-xs uppercase tracking-[0.3em] mb-8 opacity-80">
          — Contact Me
        </p>
        <h2
          className="fade-in font-display text-[clamp(2rem,8vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-[0.9] tracking-tight"
          style={{ transitionDelay: "0.1s" }}
        >
          Get in touch
        </h2>
        <p className="w-full max-w-md text-[clamp(12px,3vw,16px)] text-foreground/70 leading-relaxed mt-10 opacity-90">
          Tell me about your company, what you're building, or any ideas you
          want to explore. I'm always open to connecting with ambitious
          founders, entrepreneurs, and teams looking to make a difference.
        </p>
        <a
          href="mailto:contact@hollywinkels.com"
          className="inline-flex items-center gap-3 mt-12 bg-foreground text-background px-10 py-5 text-sm uppercase tracking-[0.18em] hover:opacity-60 transition duration-200"
        >
          contact@hollywinkels.com
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="inline-block"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-2xl">Holly Winkels</p>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">
          © {new Date().getFullYear()} Holly Winkels. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.18em] text-foreground/70">
          <a
            href="https://www.instagram.com/holly.winkels/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/holly-winkels-930a1a360/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
