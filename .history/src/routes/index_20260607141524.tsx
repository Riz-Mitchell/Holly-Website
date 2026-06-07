import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/holly-hero.jpg";
import stageImg from "@/assets/holly-stage.jpg";
import workImg from "@/assets/holly-work.jpg";

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
          className="text-xs uppercase tracking-[0.18em] px-4 py-2 bg-brand text-brand-foreground hover:opacity-60 transition"
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
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-rise">
          <p className="text-xs uppercase tracking-[0.3em] text-brand mb-8">
            Entrepreneur · Founder · Operator
          </p>
          <h1 className="font-display text-[clamp(3rem,13vw,4rem)] lg:text-[clamp(7rem,5vw,12rem)] leading-[0.88] tracking-tight">
            Build a<br />
            business that
            <br />
            <em className="text-brand">matters.</em>
          </h1>
          <p className="mt-10 max-w-xl text-[clamp(14px,2vw,18px)] text-foreground/70 leading-relaxed">
            I'm Holly Winkels — I help ambitious founders turn quiet conviction
            into companies people can't ignore. No fluff. No formulas. Just the
            work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-brand text-brand-foreground px-7 py-4 text-sm uppercase tracking-[0.18em] hover:translate-x-1 transition-transform"
            >
              Work With Me
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition"
            >
              My Story
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-brand/20 blur-3xl" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={heroPortrait}
              alt="Portrait of Holly Winkels"
              width={1024}
              height={1280}
              className="w-full h-full object-cover grayscale contrast-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <p className="font-display italic text-2xl">
                "Soft heart. Sharp edges."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Featured in Forbes",
    "Inc. 5000 Mentor",
    "TEDx Speaker",
    "100+ Founders Coached",
    "2× Exit",
    "Published in Fast Company",
  ];
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
    <section id="about" className="min-h-screen flex py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <img
            src={workImg}
            alt="Holly Winkels working"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full aspect-square object-cover grayscale"
          />
        </div>
        <div className="lg:col-span-7 lg:pt-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
            — About
          </p>
          <h2 className="font-display text-5xl lg:text-7xl leading-[1] mb-10">
            I've built the
            <br />
            companies I now
            <br />
            <em className="text-brand">help others build.</em>
          </h2>
          <div className="space-y-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
            <p>
              Three companies. Two exits. One very expensive lesson about doing
              it the wrong way for too long. I've sat in every chair — founder,
              operator, investor, advisor — and I've learned that the difference
              between a business that works and one that wins is almost never
              the idea.
            </p>
            <p>
              It's the person behind it. Their clarity. Their nerve. Their
              refusal to soften what they actually believe.
            </p>
            <p className="font-display italic text-2xl text-foreground">
              That's what I work on. The person, then the business.
            </p>
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
      title: "1:1 Advisory",
      desc: "Twelve weeks. Just us. We rebuild your strategy, your story, and the way you show up — from the inside out.",
    },
    {
      no: "02",
      title: "Founder Intensives",
      desc: "A two-day deep dive in person. We solve the thing that's been keeping you up at night. You leave with a plan.",
    },
    {
      no: "03",
      title: "Keynotes & Workshops",
      desc: "For teams that want to be lit on fire — in the good way. Talks on conviction, decision-making, and building things that last.",
    },
  ];

  return (
    <section
      id="work"
      className="min-h-screen flex py-28 lg:py-40 border-t border-foreground/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
              — Work With Me
            </p>
            <h2 className="font-display text-5xl lg:text-7xl leading-[1]">
              Three ways
              <br />
              we can <em className="text-brand">work together.</em>
            </h2>
          </div>
          <p className="max-w-sm text-foreground/70">
            Everything I do is built on the same belief: your business will only
            ever be as bold as you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {services.map((s) => (
            <div
              key={s.no}
              className="bg-background p-10 lg:p-12 group hover:bg-brand transition-colors duration-500"
            >
              <p className="font-display text-6xl text-brand group-hover:text-brand-foreground transition-colors">
                {s.no}
              </p>
              <h3 className="font-display text-3xl mt-6 mb-4 group-hover:text-brand-foreground transition-colors">
                {s.title}
              </h3>
              <p className="text-foreground/70 group-hover:text-brand-foreground/90 leading-relaxed transition-colors">
                {s.desc}
              </p>
              <a
                href="#contact"
                className="inline-block mt-8 text-xs uppercase tracking-[0.18em] border-b border-foreground/40 pb-1 group-hover:border-brand-foreground group-hover:text-brand-foreground transition-colors"
              >
                Enquire →
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
      q: "Holly didn't fix my business. She made me unrecognisable to myself — in the best possible way. The business followed.",
      n: "Maya Chen",
      r: "Founder, Northbound Studio",
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
        <p className="text-xs uppercase tracking-[0.3em] text-brand mb-6">
          — Stories
        </p>
        <h2 className="font-display text-5xl lg:text-7xl leading-[1] mb-16 max-w-3xl">
          What founders
          <br />
          <em className="text-brand">are saying.</em>
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {quotes.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col border-t border-foreground/20 pt-8"
            >
              <blockquote className="font-display text-2xl leading-snug flex-1">
                <span className="text-brand text-4xl leading-none mr-1">"</span>
                {t.q}
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
        <p className="text-xs uppercase tracking-[0.3em] mb-8 opacity-80">
          — Contact Me
        </p>
        <h2 className="font-display text-6xl lg:text-9xl leading-[0.9]">
          Ready when
          <br />
          <em>you are.</em>
        </h2>
        <p className="mt-10 text-xl max-w-xl mx-auto opacity-90">
          Tell me about your company, your stuck point, or the thing you've been
          afraid to say out loud. I read every note.
        </p>
        <a
          href="mailto:contact@hollywinkels.com"
          className="inline-block mt-12 bg-foreground text-background px-10 py-5 text-sm uppercase tracking-[0.18em] hover:opacity-60 transition"
        >
          contact@hollywinkels.com
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
