import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work With Me" },
  { href: "/about", label: "My Story" },
];

// Both sized 22x22 so the hamburger and its close icon read as a matched
// pair rather than swapping to a visually different size on open.
const MOBILE_NAV_ICON_SIZE = 22;

function MenuSvg({
  width = MOBILE_NAV_ICON_SIZE,
  height = MOBILE_NAV_ICON_SIZE,
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
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
    </svg>
  );
}

function XSvg({
  width = MOBILE_NAV_ICON_SIZE,
  height = MOBILE_NAV_ICON_SIZE,
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
      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
    </svg>
  );
}

// The trigger button below is a 22px icon centered in a 38px hit target
// (p-2 padding on each side). Its icon ends up 21px from the header's top
// edge and 24px from the right edge (px-6 container padding, with the
// button's own -mr-2/p-2 cancelling out). The Sheet's close button mirrors
// that exact construction — same padding, same math — so the icon lines up
// in the same spot whether the menu is open or closed.
// No ring/outline in any focus state: Radix auto-focuses the close button when
// the drawer opens, and some mobile browsers treat that programmatic focus as
// :focus-visible, which drew a border around the icon.
const MOBILE_NAV_CLOSE_CLASSNAME =
  "top-[13px] right-4 rounded-none border-0 p-2 outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background pt-[env(safe-area-inset-top)] lg:bg-background/70 lg:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-xl tracking-tight">
          Holly Winkels
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] text-foreground/70 [--underline-trim:0.18em]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline hover:text-foreground transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop: Contact stays inline in the header. */}
        <a
          href="/#contact"
          className="hidden md:inline-flex text-xs uppercase tracking-[0.18em] px-4 py-2 bg-brand text-brand-foreground hover:opacity-60 transition duration-200"
        >
          Contact
        </a>

        {/* Mobile: Contact moves inside the menu overlay, triggered here. */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden -mr-2 inline-flex items-center justify-center p-2"
            >
              <MenuSvg />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-4/5 max-w-sm flex-col gap-0 rounded-none border-foreground/10 bg-background p-0 pt-[env(safe-area-inset-top)] shadow-none"
            closeClassName={MOBILE_NAV_CLOSE_CLASSNAME}
            closeIcon={<XSvg />}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Site navigation
            </SheetDescription>
            <nav className="flex flex-1 flex-col justify-center gap-8 px-8 font-display text-3xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-brand transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="px-8 pb-[calc(2rem_+_env(safe-area-inset-bottom))]">
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center bg-brand text-brand-foreground px-4 py-4 text-xs uppercase tracking-[0.18em] hover:opacity-60 transition duration-200"
              >
                Contact
              </a>
            </div>
          </SheetContent>
        </Sheet>
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
          founders, entrepreneurs, and people looking to make a difference.
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
