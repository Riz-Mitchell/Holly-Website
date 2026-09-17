import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import hollyWithAChicken from "@/assets/HollyWithAChicken.jpeg";
import swimmingPicture from "@/assets/SwimmingPicture.png";
import hollyWorkingOnMoisturizer from "@/assets/HollyWorkingOnMoisturizer.jpeg";
import hollyWithMentor from "@/assets/HollyWithMentor.jpeg";
import {
  Header,
  Footer,
  useFadeIn,
  GoogleFontsPreload,
  CTA,
} from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Holly Winkels" },
      {
        name: "description",
        content:
          "The story behind Holly Winkels — from a bee farm on the Mornington Peninsula to national-level swimming and building her own business.",
      },
      { property: "og:title", content: "About — Holly Winkels" },
      {
        property: "og:description",
        content:
          "From a bee farm on the Mornington Peninsula to national-level swimming. The story behind Holly Winkels.",
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

function StorySection({
  image,
  alt,
  caption,
  heading,
  reverse = false,
  imagePosition = "object-center",
  children,
}: {
  image: string;
  alt: string;
  caption: string;
  heading: ReactNode;
  reverse?: boolean;
  imagePosition?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-20 lg:py-32 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-start">
        <div
          className={`fade-in lg:col-span-5 lg:sticky lg:top-32 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="w-4/5 mx-auto aspect-[4/5] flex items-center justify-center">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              width={1024}
              height={1280}
              className={`w-3/4 h-3/4 object-cover contrast-110 ${imagePosition}`}
            />
          </div>
        </div>

        <div
          className={`lg:col-span-7 flex flex-col items-start text-left ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <p
            className="fade-in text-xs uppercase tracking-[0.3em] text-brand mb-6"
            style={{ transitionDelay: "0.15s" }}
          >
            {caption}
          </p>
          <h2
            className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-none tracking-tight"
            style={{ transitionDelay: "0.2s" }}
          >
            {heading}
          </h2>
          <div
            className="fade-in space-y-6 text-[clamp(15px,3.5vw,17px)] text-foreground/70 leading-relaxed max-w-xl mt-10"
            style={{ transitionDelay: "0.3s" }}
          >
            {children}
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

      <section className="relative flex items-center justify-center text-center pt-[calc(8rem_+_env(safe-area-inset-top))] pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
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

      <StorySection
        image={hollyWithAChicken}
        alt="Holly with a chicken on the family farm"
        caption="— Where It Started"
        heading={
          <>
            A childhood on the <em className="text-brand">farm</em>
          </>
        }
      >
        <p>
          I grew up on a farm on the Mornington Peninsula, surrounded by
          animals and a family business. Business was a normal part of my
          life growing up. I watched my parents build Pure Peninsula Honey
          from the ground up, but I never really thought it would become my
          own path.
        </p>
      </StorySection>

      <StorySection
        image={swimmingPicture}
        alt="Holly competing in swimming"
        caption="— The Pool & After School"
        heading={
          <>
            Chasing swimming, choosing my own{" "}
            <em className="text-brand">path</em>
          </>
        }
        reverse
      >
        <p>
          For most of my teenage years, swimming was what I loved. I trained
          and competed at a national level, and for a long time, I thought it
          might be the path I followed. I still wanted to keep my options
          open because, honestly, I had no idea what I wanted to do after
          school.
        </p>
        <p>
          I graduated Year 12 and decided not to go to university. I didn't
          want to spend years studying something I didn't actually enjoy
          just because it was the expected next step. At the same time, I
          was training heavily in swimming while helping out in the family
          business wherever I was needed, from making beeswax candles and
          honey straws to bottling honey and filling in at the shop.
        </p>
        <p>
          I was waking up around 3:45am most mornings and driving 45 minutes
          to an hour to training.
        </p>
      </StorySection>

      <StorySection
        image={hollyWorkingOnMoisturizer}
        alt="Holly working on a moisturizer product"
        caption="— A Shift & Family First"
        heading={
          <>
            Wanting more, stepping <em className="text-brand">up</em>
          </>
        }
      >
        <p>
          I also started working at Rebel Sport. I really enjoyed the people
          and the experience, but I began to realise I wanted more. I just
          didn't know exactly what that looked like yet.
        </p>
        <p>
          Then I went to a business event that opened my eyes to a
          completely different side of business. It made me start thinking
          more seriously about what was happening inside my own family's
          business and whether I could play a bigger role in it.
        </p>
        <p>
          Around the same time, my sister became unwell, and I could see how
          much of Mum's time and energy was being taken up supporting her. I
          started helping Mum more directly while becoming increasingly
          involved in the family business.
        </p>
        <p>
          I eventually decided to put my focus into helping my parents manage
          the business while also supporting my sister.
        </p>
      </StorySection>

      <StorySection
        image={hollyWithMentor}
        alt="Holly with a mentor"
        imagePosition="object-top"
        caption="— Learning To Build & What's Next"
        heading={
          <>
            Finding my mentors, building my own{" "}
            <em className="text-brand">chapter</em>
          </>
        }
        reverse
      >
        <p>
          The more involved I became, the more interested I got. I started
          learning from people who had built businesses themselves, seeking
          out mentors and putting myself in rooms where I could learn. I was
          exposed to ideas and ways of thinking that I hadn't come across
          before.
        </p>
        <p>
          I became particularly interested in building the systems,
          structure and team around the business so it could operate
          successfully without everything falling back on my parents.
          Helping take the business into its next chapter and creating more
          freedom for them has become a big part of what I do.
        </p>
        <p>
          But working in the family business also made me realise something
          else: I want to build something of my own.
        </p>
        <p>
          I'm continuing to help grow and transition the family business
          while exploring opportunities to acquire an established business of
          my own.
        </p>
        <p>I don't have every step mapped out.</p>
        <p>
          But somewhere along the way, I stopped worrying so much about
          having the perfect plan and started paying attention to what I
          actually enjoyed.
        </p>
        <p>
          And I realised I really love business.
        </p>
        <p>
          I wanted more then.
          <br />
          I still do.
        </p>
      </StorySection>

      <CTA />

      <Footer />
    </div>
  );
}
