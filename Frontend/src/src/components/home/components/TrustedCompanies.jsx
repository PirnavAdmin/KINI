import { motion } from "framer-motion";
import { useThemeContext } from "@shared/context/ThemeContext";

const LOGOS = [
  {
    name: "Pirnav Software Solutions",
    url: "https://pirnav.com/assets/logo-DrIy_Kr9.png",
  },
  {
    name: "IBM",
    url: "https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg",
  },
  {
    name: "WIPRO",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  },
  {
    name: "DELOITTE",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
  },
  {
    name: "MISTIMINDS",
    url: "https://logo.clearbit.com/mistminds.com",
  },
  {
    name: "HONEYWELL",
    url: "https://logos-world.net/wp-content/uploads/2021/02/Honeywell-Logo.png",
  },
];

export default function Partners() {
  const { isDark } = useThemeContext();

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    if (parent && !parent.querySelector(".fallback-text")) {
      const span = document.createElement("span");
      span.className = "fallback-text text-xs font-bold tracking-wider uppercase opacity-60";
      span.innerText = e.target.alt;
      parent.appendChild(span);
    }
  };

  return (
    <section
      className={`relative overflow-hidden py-12 md:py-16 lg:py-20 transition-colors duration-500 ${
        isDark ? "bg-app-dark-gradient" : "bg-gradient-to-b from-white to-slate-50"
      }`}
    >
      {/* Background glow (stronger in dark mode) */}
      <div
        className={`absolute top-0 left-1/2 w-[500px] h-[500px] rounded-full -translate-x-1/2 pointer-events-none blur-[150px] ${
          isDark
            ? "bg-[#4F46E5]/20"
            : "bg-[#4F46E5]/5"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${
              isDark
                ? "border-[#4F46E5]/40 bg-[#4F46E5]/15 text-[#A5B4FC]"
                : "border-[#4F46E5]/20 bg-[#4F46E5]/5 text-[#4F46E5]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            Our Partners
          </span>

          <h2
            className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Trusted by Industry{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>

          <p
            className={`mt-3 max-w-xl mx-auto text-sm ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Our graduates have gone on to build careers at the world&apos;s most
            innovative companies.
          </p>
        </motion.div>

        {/* Glass Container – improved for dark mode */}
        <div
          className={`relative overflow-hidden rounded-2xl border ${
            isDark
              ? "bg-white/[0.04] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/50 border-slate-200"
          }`}
        >
          {/* Fade Edges – darker overlay for dark mode */}
          <div
            className={`absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r ${
              isDark ? "from-[#0F172A]/90" : "from-white"
            } to-transparent pointer-events-none`}
          />

          <div
            className={`absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l ${
              isDark ? "from-[#0F172A]/90" : "from-white"
            } to-transparent pointer-events-none`}
          />

          {/* Marquee Track */}
          <div className="py-8 sm:py-10 overflow-hidden flex">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex items-center justify-around gap-12 sm:gap-16 w-[200%] flex-shrink-0"
            >
              {[...LOGOS, ...LOGOS].map((company, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08 }}
                  className="flex-shrink-0 flex items-center justify-center px-2 min-w-[120px]"
                >
                  <img
                    src={company.url}
                    alt={company.name}
                    loading="lazy"
                    onError={handleImageError}
                    className={`h-7 sm:h-9 w-auto object-contain transition-all duration-300 ${
                      isDark
                        ? "opacity-70 grayscale hover:opacity-100 hover:grayscale-0 filter brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]"
                        : "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <p
            className={`text-xs ${
              isDark ? "text-slate-400" : "text-slate-400"
            }`}
          >
            <span className="font-semibold text-[#4F46E5]">500+</span> hiring
            partners •{" "}
            <span className="font-semibold text-[#4F46E5]">95%</span> placement
            rate
          </p>
        </motion.div>
      </div>
    </section>
  );
}