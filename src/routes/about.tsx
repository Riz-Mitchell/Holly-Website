import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/holly-hero.webp";
import stageImg from "@/assets/holly-work-2.jpeg";
import {
  Header,
  Footer,
  RightArrowSvg,
  useFadeIn,
  GoogleFontsPreload,
} from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Holly Winkels" },
      {
        name: "description",
        content:
          "The story behind Holly Winkels — from national-level swimmer to entrepreneur building and acquiring businesses that matter.",
      },
      { property: "og:title", content: "About — Holly Winkels" },
      {
        property: "og:description",
        content:
          "From national-level swimmer to entrepreneur. The story behind Holly Winkels.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [
      { rel: "canonical", href: "/about" },
      { rel: "icon", href: "/favicon.svg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useFadeIn();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GoogleFontsPreload />

      <Header />

      <section className="relative min-h-[70vh] flex items-center pt-[calc(8rem_+_env(safe-area-inset-top))] pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6">
            — About
          </p>
          <h1
            className="fade-in font-display text-[clamp(2.75rem,13vw,4.25rem)] lg:text-[clamp(4rem,7vw,6.5rem)] leading-[0.95] tracking-tight max-w-4xl"
            style={{ transitionDelay: "0.1s" }}
          >
            From the pool to
            <br />
            <em className="text-brand">the business.</em>
          </h1>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
          <div className="fade-in lg:col-span-5 lg:sticky lg:top-32">
            <img
              src={heroPortrait}
              alt="Portrait of Holly Winkels"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full aspect-[4/5] object-cover contrast-110"
            />
          </div>

          <div className="lg:col-span-7">
            <p
              className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6"
              style={{ transitionDelay: "0.15s" }}
            >
              — My Journey
            </p>
            <h2
              className="fade-in font-display text-[clamp(2.1rem,7vw,2.75rem)] lg:text-[clamp(2.75rem,3.2vw,3.75rem)] leading-tight tracking-tight mb-8"
              style={{ transitionDelay: "0.2s" }}
            >
              Business and <em className="text-brand">sport.</em>
            </h2>
            <div
              className="fade-in space-y-8 text-[clamp(15px,3.5vw,17px)] text-foreground/70 leading-relaxed max-w-2xl"
              style={{ transitionDelay: "0.3s" }}
            >
              <p>
                I didn't follow the traditional university path. I've built my
                foundation on two things: business and sport
              </p>
              <p>
                Growing up in the family business taught me early that building
                a company is about far more than numbers, it's about people,
                decisions, risk, resilience and the courage to keep moving when
                things don't work out. Competing in swimming at a national level
                reinforced the importance of discipline, consistency, and that
                marginal gains compound over time.
              </p>
              <p>
                Today, I'm focused on building and growing businesses, exploring
                acquisitions, and learning from the people around me. I'm still
                early in this journey and it's something I embrace. I'm more
                interested in learning quickly, taking action and building
                something meaningful along the way.
              </p>
              <p className="font-display italic text-2xl text-foreground">
                I care less about how a business looks from the outside, and
                more about whether the person running it is willing to do what
                it takes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto max-w-7xl">
          <img
            src={stageImg}
            alt="Holly Winkels at work"
            loading="lazy"
            width={1920}
            height={1080}
            className="fade-in w-full aspect-video object-cover"
          />
        </div>
      </section>

      <section className="py-28 lg:py-40 border-t border-foreground/10 bg-brand text-brand-foreground">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="fade-in text-xs uppercase tracking-[0.3em] mb-8 opacity-80">
            — Let's Talk
          </p>
          <h2
            className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-[0.9] tracking-tight"
            style={{ transitionDelay: "0.1s" }}
          >
            Building something?
          </h2>
          <p
            className="fade-in w-full max-w-md mx-auto text-[clamp(15px,3.5vw,16px)] leading-relaxed mt-10 opacity-90"
            style={{ transitionDelay: "0.25s" }}
          >
            I'm always open to connecting with ambitious founders,
            entrepreneurs, and teams looking to make a difference.
          </p>
          <div className="fade-in mt-12" style={{ transitionDelay: "0.4s" }}>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-3 bg-foreground text-background px-7 py-4 text-sm uppercase tracking-[0.18em] hover:opacity-60 duration-200"
            >
              Get In Touch
              <RightArrowSvg width={16} height={16} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
