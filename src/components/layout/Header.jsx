import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

/*
|--------------------------------------------------------------------------
| Header — Obsidian / Signal Mint
|--------------------------------------------------------------------------
|
| Visual direction:
| - Obsidian black
| - Soft ivory typography
| - Signal mint accent
| - Editorial spacing
| - Minimal glass effect
| - High readability
| - Clear navigation hierarchy
|
|--------------------------------------------------------------------------
*/

const navigation = [
  {
    id: "about",
    label: {
      en: "About",
      de: "Über mich",
    },
    href: "#about",
  },
  {
    id: "projects",
    label: {
      en: "Projects",
      de: "Projekte",
    },
    href: "#projects",
  },
  {
    id: "skills",
    label: {
      en: "Skills",
      de: "Skills",
    },
    href: "#skills",
  },
  {
    id: "blog",
    label: {
      en: "Blog",
      de: "Blog",
    },
    route: "/blog",
  },
  {
    id: "resume",
    label: {
      en: "Resume",
      de: "Lebenslauf",
    },
    href: "#resume",
  },
];

function SunIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />

      <path
        strokeLinecap="round"
        d="
          M12 2v2
          M12 20v2
          M4.93 4.93l1.42 1.42
          M17.65 17.65l1.42 1.42
          M2 12h2
          M20 12h2
          M4.93 19.07l1.42-1.42
          M17.65 6.35l1.42-1.42
        "
      />
    </svg>
  );
}

function MoonIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5
           A8.5 8.5 0 1 0 20.5 14.5Z"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path
            strokeLinecap="round"
            d="M6 6l12 12"
          />

          <path
            strokeLinecap="round"
            d="M18 6L6 18"
          />
        </>
      ) : (
        <>
          <path
            strokeLinecap="round"
            d="M4 7h16"
          />

          <path
            strokeLinecap="round"
            d="M4 12h16"
          />

          <path
            strokeLinecap="round"
            d="M4 17h16"
          />
        </>
      )}
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="
        h-4
        w-4
        transition-transform
        duration-300
        group-hover:-translate-y-0.5
        group-hover:translate-x-0.5
      "
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15L15 5"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 5h8v8"
      />
    </svg>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";

  /*
  |--------------------------------------------------------------------------
  | Scroll state
  |--------------------------------------------------------------------------
  */

  useEffect(() =>

{
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Lock body scroll while mobile menu is open
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /*
  |--------------------------------------------------------------------------
  | Escape key
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Anchor navigation
  |--------------------------------------------------------------------------
  */

  const handleAnchorClick = (event, href) => {
    event.preventDefault();

    setMobileMenuOpen(false);

    if (!isHome) {
      navigate(`/${href}`);
      return;
    }

    const element = document.querySelector(href);

    if (!element) {
      return;
    }

    const headerOffset = 88;

    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY;

    const offsetPosition =
      elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      href
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Contact
  |--------------------------------------------------------------------------
  */

  const handleContactClick = (event) => {
    handleAnchorClick(event, "#contact");
  };

  /*
  |--------------------------------------------------------------------------
  | Language
  |--------------------------------------------------------------------------
  */

  const handleLanguageChange = (nextLanguage) => {
    if (nextLanguage === language) {
      return;
    }

    setLanguage(nextLanguage);
  };

  /*
  |--------------------------------------------------------------------------
  | Theme
  |--------------------------------------------------------------------------
  */

  const isDark = theme === "dark";

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-500

        ${
          scrolled
            ? `
              border-b
              border-white/[0.10]
              bg-[#0B0D0F]/90
              shadow-[0_12px_40px_rgba(0,0,0,0.20)]
              backdrop-blur-xl
            `
            : `
              border-b
              border-transparent
              bg-[#0B0D0F]/45
              backdrop-blur-md
            `
        }
      `}
    >
      {/* Subtle top signal line */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#72F2C2]/35
          to-transparent
          opacity-80
        "
      />

      <nav
        className="
          mx-auto
          flex
          h-[72px]
          w-full
          max-w-[1440px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
        aria-label="Main navigation"
      >
        {/* =========================================================
            LOGO

========================================================= */}

        <Link
          to="/"
          className="
            group
            relative
            flex
            shrink-0
            items-center
            rounded-lg
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[#72F2C2]
            focus-visible:ring-offset-4
            focus-visible:ring-offset-[#0B0D0F]
          "
          aria-label="Ali Armani — Home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/images/logo.png"
            alt="Ali Armani"
            className="
              h-8
              w-auto
              max-w-[150px]
              object-contain
              transition
              duration-300
              group-hover:opacity-90
              sm:h-9
            "
          />
        </Link>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================= */}

        <div
          className="
            hidden
            items-center
            gap-2
            lg:flex
          "
        >
          {navigation.map((item) => {
            const label =
              item.label[language] ||
              item.label.en;

            const isActive =
              item.route
                ? location.pathname.startsWith(
                    item.route
                  )
                : isHome &&
                  location.hash === item.href;

            if (item.route) {
              return (
                <Link
                  key={item.id}
                  to={item.route}
                  className={`
                    group
                    relative
                    rounded-lg
                    px-3.5
                    py-2.5
                    text-[15px]
                    font-medium
                    tracking-[-0.01em]
                    outline-none
                    transition-all
                    duration-300
                    focus-visible:ring-2
                    focus-visible:ring-[#72F2C2]

                    ${
                      isActive
                        ? "text-[#F2F0E8]"
                        : "text-[#D0D5D7] hover:text-[#F2F0E8]"
                    }
                  `}
                >
                  {label}

                  <span
                    className={`
                      absolute
                      bottom-1
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-[#72F2C2]
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "w-4 opacity-100"
                          : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                      }
                    `}
                  />
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) =>
                  handleAnchorClick(
                    event,
                    item.href
                  )
                }
                className={`
                  group
                  relative
                  rounded-lg
                  px-3.5
                  py-2.5
                  text-[15px]
                  font-medium
                  tracking-[-0.01em]
                  outline-none
                  transition-all
                  duration-300
                  focus-visible:ring-2
                  focus-visible:ring-[#72F2C2]

                  ${
                    isActive
                      ? "text-[#F2F0E8]"
                      : "text-[#D0D5D7] hover:text-[#F2F0E8]"
                  }
                `}
              >
                {label}

                <span
                  className={`
                    absolute

bottom-1
                    left-1/2
                    h-px
                    -translate-x-1/2
                    bg-[#72F2C2]
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "w-4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                    }
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* =========================================================
            DESKTOP ACTIONS
        ========================================================= */}

        <div
          className="
            hidden
            items-center
            gap-2.5
            lg:flex
          "
        >
          {/* Language switcher */}

          <div
            className="
              flex
              items-center
              rounded-full
              border
              border-white/[0.16]
              bg-white/[0.04]
              p-1
              shadow-[0_4px_20px_rgba(0,0,0,0.12)]
            "
            role="group"
            aria-label="Language"
          >
            {["en", "de"].map((item) => {
              const active = language === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleLanguageChange(item)
                  }
                  className={`
                    min-w-[40px]
                    rounded-full
                    px-3
                    py-2
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    outline-none
                    transition-all
                    duration-300
                    focus-visible:ring-2
                    focus-visible:ring-[#72F2C2]

                    ${
                      active
                        ? `
                          bg-white/[0.12]
                          text-[#72F2C2]
                          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]
                        `
                        : `
                          text-[#A7ADB1]
                          hover:bg-white/[0.06]
                          hover:text-[#F2F0E8]
                        `
                    }
                  `}
                  aria-pressed={active}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Theme toggle */}

          <button
            type="button"
            onClick={toggleTheme}
            className="
              group
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.16]
              bg-white/[0.04]
              text-[#C8CDD0]
              shadow-[0_4px_20px_rgba(0,0,0,0.12)]
              outline-none
              transition-all
              duration-300
              hover:border-[#72F2C2]/40
              hover:bg-[#72F2C2]/[0.08]
              hover:text-[#72F2C2]
              focus-visible:ring-2
              focus-visible:ring-[#72F2C2]
            "
            aria-label={
              isDark
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {isDark ? (
              <SunIcon className="h-[19px] w-[19px]" />
            ) : (
              <MoonIcon className="h-[19px] w-[19px]" />
            )}
          </button>

          {/* Contact CTA */}

          <a
            href="#contact"
            onClick={handleContactClick}
            className="
              group
              ml-2
              inline-flex
              h-10
              items-center
              gap-2
              rounded-full
              bg-[#72F2C2]
              px-4
              text-[12p

x]
              font-bold
              tracking-[0.01em]
              text-[#07100C]
              outline-none
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#8AF7D0]
              hover:shadow-[0_8px_30px_rgba(114,242,194,0.18)]
              focus-visible:ring-2
              focus-visible:ring-[#72F2C2]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0B0D0F]
            "
          >
            <span>
              {language === "de"
                ? "Kontakt"
                : "Contact"}
            </span>

            <ArrowUpRightIcon />
          </a>
        </div>

        {/* =========================================================
            MOBILE ACTIONS
        ========================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            lg:hidden
          "
        >
          {/* Mobile theme */}

          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.16]
              bg-white/[0.04]
              text-[#C8CDD0]
              outline-none
              transition-all
              duration-300
              hover:border-[#72F2C2]/40
              hover:bg-[#72F2C2]/[0.08]
              hover:text-[#72F2C2]
              focus-visible:ring-2
              focus-visible:ring-[#72F2C2]
            "
            aria-label={
              isDark
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {isDark ? (
              <SunIcon className="h-[19px] w-[19px]" />
            ) : (
              <MoonIcon className="h-[19px] w-[19px]" />
            )}
          </button>

          {/* Mobile menu button */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                (current) => !current
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.16]
              bg-white/[0.04]
              text-[#F2F0E8]
              outline-none
              transition-all
              duration-300
              hover:border-[#72F2C2]/40
              hover:bg-[#72F2C2]/[0.08]
              hover:text-[#72F2C2]
              focus-visible:ring-2
              focus-visible:ring-[#72F2C2]
            "
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <MenuIcon
              open={mobileMenuOpen}
            />
          </button>
        </div>
      </nav>

      {/* ===========================================================
          MOBILE NAVIGATION
      =========================================================== */}

      <div
        id="mobile-navigation"
        className={`
          overflow-hidden
          border-t
          border-white/[0.08]
          bg-[#0B0D0F]/95
          backdrop-blur-2xl
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hidden

          ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-72px)] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-4 sm:px-8">
          {/* Mobile nav links */}

          <div className="flex flex-col">
            {navigation.map((item, index) => {
              const label =
                item.label[language] ||
                item.label.en;

              const isActive =
                item.route
                  ? location.pathname.startsWith(
                      item.route
                    )
                  : isHome &&
                    location.hash ===
                      item.href;

              if (item.route) {
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`
                      group
                      flex
                      min-h-[56px]
                      items-center
                      justify-between
                      border-b
                      border-white/[0.055]
                      text-lg
                      font-medium
                      tracking-[-0.025em]
                      outline-none
                      transition-colors
                      duration-300
                      focus-visible:text-[#72F2C2]

                      ${
                        isActive
                          ? "text-[#72F2C2]"
                          : "text-[#D5D8D9] hover:text-[#72F2C2]"
                      }
                    `}
                    style={{
                      transitionDelay: mobileMenuOpen
                        ? `${index * 25}ms`
                        : "0ms",
                    }}
                  >
                    <span>{label}</span>

                    <ArrowUpRightIcon />
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(event) =>
                    handleAnchorClick(
                      event,
                      item.href
                    )
                  }
                  className={`
                    group
                    flex
                    min-h-[56px]
                    items-center
                    justify-between
                    border-b
                    border-white/[0.055]
                    text-lg
                    font-medium
                    tracking-[-0.025em]
                    outline-none
                    transition-colors
                    duration-300
                    focus-visible:text-[#72F2C2]

                    ${
                      isActive
                        ? "text-[#72F2C2]"
                        : "text-[#D5D8D9] hover:text-[#72F2C2]"
                    }
                  `}
                  style={{
                    transitionDelay: mobileMenuOpen
                      ? `${index * 25}ms`
                      : "0ms",
                  }}
                >
                  <span>{label}</span>

                  <ArrowUpRightIcon />
                </a>
              );
            })}
          </div>

          {/* Mobile bottom actions */}

          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Language */}

            <div
              className="
                flex
                items-center
                rounded-full
                border
                border-white/[0.16]
                bg-white/[0.04]
                p-1
                shadow-[0_4px_20px_rgba(0,0,0,0.12)]
              "
              role="group"
              aria-label="Language"
            >
              {["en", "de"].map((item) => {
                const active =
                  language === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      handleLanguageChange(
                        item
                      )
                    }
                    className={`
                      min-w-[42px]
                      rounded-full
                      px-3
                      py-2
                      text-[12px]

font-bold
                      uppercase
                      tracking-[0.08em]
                      outline-none
                      transition-all
                      duration-300
                      focus-visible:ring-2
                      focus-visible:ring-[#72F2C2]

                      ${
                        active
                          ? `
                            bg-white/[0.12]
                            text-[#72F2C2]
                          `
                          : `
                            text-[#A7ADB1]
                            hover:bg-white/[0.06]
                            hover:text-[#F2F0E8]
                          `
                      }
                    `}
                    aria-pressed={active}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Contact */}

            <a
              href="#contact"
              onClick={handleContactClick}
              className="
                group
                inline-flex
                h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#72F2C2]
                px-5
                text-sm
                font-bold
                text-[#07100C]
                outline-none
                transition-all
                duration-300
                hover:bg-[#8AF7D0]
                hover:shadow-[0_10px_35px_rgba(114,242,194,0.16)]
                focus-visible:ring-2
                focus-visible:ring-[#72F2C2]
              "
            >
              <span>
                {language === "de"
                  ? "Kontakt aufnehmen"
                  : "Let's talk"}
              </span>

              <ArrowUpRightIcon />
            </a>
          </div>

          {/* Small signature */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#697177]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#72F2C2]
                shadow-[0_0_12px_rgba(114,242,194,0.5)]
              "
            />

            <span>
              Ali Armani · Frontend Developer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;