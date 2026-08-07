import { memo, useMemo } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { useThemeContext } from "@shared/context/ThemeContext";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { testimonials } from "../data/homeData";

function ReviewCard({ item, isDark }) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-card border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-4 ${
        isDark
          ? "border-white/10 bg-white/[0.04] hover:border-primary-500/20 hover:shadow-[0_16px_48px_rgba(8,95,167,0.12)]"
          : "border-ink-900/[0.06] bg-white/90 shadow-sm hover:border-primary-500/20 hover:shadow-[0_16px_48px_rgba(8,95,167,0.08)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-xs ${i < item.rating ? "text-amber-400" : isDark ? "text-white/15" : "text-ink-900/15"}`} />
          ))}
        </div>
        <FaQuoteRight aria-hidden="true" className="text-2xl text-primary-500/10 transition-all duration-300 group-hover:text-primary-500/20" />
      </div>

      <p className={`mb-4 line-clamp-4 flex-1 overflow-hidden text-xs leading-6 ${isDark ? "text-white/70" : "text-ink-900/60"}`}>
        &ldquo;{item.text}&rdquo;
      </p>

      <div className="mb-4 h-px w-full bg-gradient-to-r from-primary-500/20 via-secondary-500/10 to-transparent" />

      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary-500/20">
            <img src={item.avatar} alt={`Photo of ${item.name}`} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="min-w-0">
            <h3
              className={`truncate font-display text-sm font-bold transition-colors duration-200 ${
                isDark ? "text-white group-hover:text-primary-400" : "text-ink-900 group-hover:text-primary-500"
              }`}
            >
              {item.name}
            </h3>
            <p className={`truncate text-xs ${isDark ? "text-white/40" : "text-ink-900/40"}`}>
              {item.role} @ <span className="font-medium text-secondary-600">{item.company}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

const Testimonials = memo(function Testimonials() {
  const { isDark } = useThemeContext();
  const doubled = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <Section
      className={isDark ? "bg-ink-950" : "bg-porcelain"}
      decoration={
        <>
          <div className="absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-primary-500/[0.06] blur-[160px] dark:bg-primary-500/[0.07]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-secondary-500/[0.06] blur-[160px] dark:bg-secondary-500/[0.07]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundSize: "60px 60px",
              backgroundImage: isDark
                ? "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            }}
          />
        </>
      }
    >
      <SectionHeader
        eyebrowIcon={FaStar}
        eyebrow="Student Testimonials"
        heading={
          <>
            What Our{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Students Say
            </span>
          </>
        }
        subheading="Real stories from real students who transformed their careers through our programs."
      />

      {/* Auto-scrolling marquee: pure-CSS keyframe so hover/focus can pause it
          natively without the jump-to-start that framer-motion's looping
          `animate` keyframes cause on stop/resume. Disabled entirely under
          prefers-reduced-motion via Tailwind's motion-reduce: variant. */}
      <div className="mt-6 overflow-hidden">
        <div className="flex w-max animate-[testimonial-marquee_30s_linear_infinite] gap-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          {doubled.map((item, index) => (
            <div key={`${item.name}-${index}`} className="w-[320px] flex-shrink-0">
              <ReviewCard item={item} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonial-marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  );
});

export default Testimonials;
