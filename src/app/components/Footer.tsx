import { Sparkles } from "lucide-react";
import { DyoxyLogo } from "./DyoxyLogo";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{
        backgroundColor: "#05070F",
        borderTop: "1px solid rgba(34, 211, 238, 0.15)",
      }}
    >
      {/* Background decoration - more subtle */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full filter blur-3xl"
          style={{ backgroundColor: "#22D3EE" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-3xl"
          style={{ backgroundColor: "#A855F7" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Company info - Elegant & Spacious */}
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6 mb-8">
              {/* DNA Helix Logo Estático Premium */}
              <DyoxyLogo size={52} showText={true} />
            </div>

            {/* Tagline Premium */}
            <div className="flex items-center gap-2.5 mb-6">
              <Sparkles
                className="w-4 h-4 text-purple-400"
                strokeWidth={2.5}
              />
              <span
                className="text-sm font-medium tracking-wide"
                style={{
                  background:
                    "linear-gradient(90deg, #22D3EE, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("footer.description")}
              </span>
            </div>

            {/* Description - More spacing */}
            <p
              className="text-gray-400 leading-relaxed max-w-md text-sm"
              style={{ lineHeight: "1.75" }}
            >
              {t("footer.longDescription")
                .split("**")
                .map((part: string, i: number) => {
                  if (i % 2 === 1) {
                    return (
                      <span
                        key={i}
                        className="text-gray-300 font-medium"
                      >
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
            </p>
          </div>

          {/* Quick Links - More spacing */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-gray-100 font-bold mb-4 text-sm tracking-wide">
              {t("footer.quickLinks.title")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("nav.methodology"), id: "methodology" },
                { label: t("nav.solutions"), id: "solutions" },
                { label: t("nav.technology"), id: "technology" },
                { label: t("nav.contact"), id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-purple-400 transition-all duration-300 text-left text-sm group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - More spacing */}
          <div className="md:col-span-3">
            <h4 className="text-gray-200 font-semibold mb-5 tracking-wide text-sm">
              {t("footer.services.title")}
            </h4>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              {t("footer.services.items").map(
                (service: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${index % 2 === 0 ? "bg-cyan-400" : "bg-purple-400"}`}
                    ></div>
                    {service}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Premium */}
        <div
          className="pt-10 mt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-6"
          style={{ borderColor: "rgba(34, 211, 238, 0.1)" }}
        >
          <div className="text-gray-500 text-xs tracking-wide text-center sm:text-left font-light">
            © 2025{" "}
            <span className="font-medium text-gray-400">
              Dyoxy
            </span>{" "}
            · {t("footer.rights")}
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "rgba(34, 211, 238, 0.03)",
              border: "1px solid rgba(34, 211, 238, 0.1)",
            }}
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">
              CNPJ
            </span>
            <span className="text-xs font-mono text-gray-400 tracking-wider">
              63.893.461/0001-50
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}