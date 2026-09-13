import { useEffect } from "react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background pt-[env(safe-area-inset-top)] lg:bg-background/70 lg:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-xl tracking-tight">
          Holly Winkels
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] text-foreground/70 [--underline-trim:0.18em]">
          <a
            href="/"
            className="link-underline hover:text-foreground transition"
          >
            Home
          </a>
          <a
            href="/about"
            className="link-underline hover:text-foreground transition"
          >
            About
          </a>
          <a
            href="/#work"
            className="link-underline hover:text-foreground transition"
          >
            Work With Me
          </a>
          <a
            href="/#testimonials"
            className="link-underline hover:text-foreground transition"
          >
            Testimonials
          </a>
        </nav>
        <a
          href="/#contact"
          className="text-xs uppercase tracking-[0.18em] px-4 py-2 bg-brand text-brand-foreground hover:opacity-60 transition duration-200"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12 pb-[calc(3rem_+_env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-2xl">Holly Winkels</p>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground/50 text-center">
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
            href="https://www.facebook.com/hollywinkelsofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition"
          >
            Facebook
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

export function RightArrowSvg({
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
      height={height}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
    </svg>
  );
}

// Any page using the `fade-in` utility class needs this observer running once
// to flip elements to `visible` as they scroll into frame.
export function useFadeIn() {
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

export function GoogleFontsPreload() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </>
  );
}

export function CTA() {
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
          className="fade-in font-display text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(3rem,4vw,5rem)] leading-[0.9] tracking-tight"
          style={{ transitionDelay: "0.1s" }}
        >
          Get in touch
        </h2>
        <p
          className="fade-in w-full max-w-md text-[clamp(15px,3.5vw,16px)] text-foreground/70 leading-relaxed mt-10 opacity-90"
          style={{ transitionDelay: "0.25s" }}
        >
          Tell me about your company, what you're building, or any ideas you
          want to explore. I'm always open to connecting with ambitious
          founders, entrepreneurs, and teams looking to make a difference.
        </p>
        <div className="fade-in" style={{ transitionDelay: "0.4s" }}>
          <a
            href="mailto:contact@hollywinkels.com"
            className="mt-12 flex w-full flex-wrap items-center justify-center gap-2 bg-foreground px-4 py-5 text-xs uppercase tracking-[0.08em] text-background transition duration-200 hover:opacity-60 sm:inline-flex sm:w-auto sm:flex-nowrap sm:gap-3 sm:px-10 sm:text-sm sm:tracking-[0.18em]"
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
      </div>
    </section>
  );
}
