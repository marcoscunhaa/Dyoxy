import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { DyoxyLogo } from "./DyoxyLogo";
import { useLanguage } from "../contexts/LanguageContext";

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const navItems = [
    {
      label: t("nav.methodology"),
      action: () => handleNavClick("methodology"),
    },
    {
      label: t("nav.solutions"),
      action: () => handleNavClick("solutions"),
    },
    {
      label: t("nav.technology"),
      action: () => handleNavClick("technology"),
    },
    {
      label: t("nav.contact"),
      action: () => handleNavClick("contact"),
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
      style={{
        background: scrolled
          ? "rgba(5, 7, 15, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(34, 211, 238, 0.1)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* DNA Helix Logo Animado */}
          <div onClick={() => handleNavClick("hero")}>
            <DyoxyLogo
              size={48}
              showText={true}
              className="cursor-pointer"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10">
                  {link.label}
                </span>
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: "rgba(34, 211, 238, 0.15)",
                  }}
                ></div>
              </button>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="relative ml-2 px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 group flex items-center gap-2 rounded-lg"
              style={{
                border: "1px solid rgba(34, 211, 238, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(34, 211, 238, 0.15)";
                e.currentTarget.style.borderColor =
                  "rgba(34, 211, 238, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.borderColor =
                  "rgba(34, 211, 238, 0.2)";
              }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {language === "en" ? "EN" : "PT"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-300 hover:text-white transition-colors flex items-center gap-1 rounded-lg"
              style={{
                border: "1px solid rgba(34, 211, 238, 0.2)",
              }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {language === "en" ? "EN" : "PT"}
              </span>
            </button>

            <button
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t"
          style={{ borderColor: "rgba(34, 211, 238, 0.2)" }}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="block w-full text-left px-4 py-3 rounded-lg transition-all"
                style={{ color: "#EDEDED" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 211, 238, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "transparent";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}