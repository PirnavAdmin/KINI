import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, RotateCcw, Search, Users2, X } from "lucide-react";
import { useThemeContext } from "@shared/context/ThemeContext";
import { useEnrollment } from "@shared/context/ModalProvider";
import { fadeUp, staggerContainer } from "@shared/hooks/useScrollAnimation";
import Section from "@shared/components/ui/Section";
import SectionHeader from "@shared/components/ui/SectionHeader";
import { featuredCourses } from "../data/homeData";

// ─── Badge styles ─────────────────────────────────────────────────────────────
const BADGE_TONE = {
  Hot: "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300",
  New: "bg-secondary-50 text-secondary-600 dark:bg-secondary-500/10 dark:text-secondary-300",
};
const DEFAULT_BADGE_TONE = "bg-ink-900/5 text-ink-900/60 dark:bg-white/10 dark:text-white/70";

// ─── Course Card ─────────────────────────────────────────────────────────────
function CourseCard({ course, isFlipped, onFlip, isDark }) {
  const { openEnrollment } = useEnrollment();

  return (
    <div className="relative h-[320px] w-full [perspective:1200px]">
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <button
          type="button"
          onClick={() => onFlip(true)}
          aria-hidden={isFlipped}
          tabIndex={isFlipped ? -1 : 0}
          aria-label={`View outcomes for ${course.title}`}
          className={`absolute inset-0 h-full w-full rounded-3xl p-[2px] bg-gradient-to-br ${course.gradient} transition-all duration-300 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 [backface-visibility:hidden]`}
        >
          <div
            className={`flex h-full w-full flex-col rounded-[22px] p-5 text-left ${
              isDark ? "bg-ink-900" : "bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/20 bg-gradient-to-br ${course.gradient} text-base font-bold text-white shadow-sm`}
                aria-hidden="true"
              >
                {course.title.charAt(0)}
              </div>
              <span className={`rounded-pill px-3 py-1 text-[11px] font-bold ${BADGE_TONE[course.badge] ?? DEFAULT_BADGE_TONE}`}>
                {course.badge}
              </span>
            </div>

            <h3 className={`mt-3 line-clamp-2 font-display text-base font-bold leading-snug ${isDark ? "text-white" : "text-ink-900"}`}>
              {course.title}
            </h3>
            <p className={`mt-1.5 line-clamp-2 text-sm leading-relaxed ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
              {course.desc}
            </p>

            <div className={`mt-3 flex flex-wrap gap-3 text-xs font-semibold ${isDark ? "text-white/50" : "text-ink-900/50"}`}>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users2 className="h-3.5 w-3.5" aria-hidden="true" />
                {course.sessions}
              </span>
            </div>

            <div className={`mt-auto flex items-center justify-center border-t pt-3 ${isDark ? "border-white/10" : "border-ink-900/[0.06]"}`}>
              <span className="flex items-center gap-1 text-xs font-bold text-primary-500">
                See outcomes <RotateCcw className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>

        {/* BACK — "View Curriculum" removed */}
        <div
          aria-hidden={!isFlipped}
          className={`absolute inset-0 flex h-full w-full flex-col rounded-3xl border border-white/20 p-5 text-white shadow-2xl [backface-visibility:hidden] bg-gradient-to-br ${course.gradient}`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Program outcomes</p>
          <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug">{course.title}</h3>

          <ul className="mt-3 flex-1 space-y-2 overflow-y-auto">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 text-sm font-medium text-white/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" aria-hidden="true" />
                {outcome}
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-2 border-t border-white/20 pt-3">
            <button
              type="button"
              onClick={() => openEnrollment(course)}
              tabIndex={isFlipped ? 0 : -1}
              className="w-full rounded-pill bg-white px-4 py-2.5 text-xs font-bold text-ink-900 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Enroll Now
            </button>
            {/* "View Curriculum" link is removed; only the flip‑back button remains */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onFlip(false)}
                tabIndex={isFlipped ? 0 : -1}
                aria-label={`Back to ${course.title} overview`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function FeaturedCourses() {
  const { isDark } = useThemeContext();
  const [flippedSlug, setFlippedSlug] = useState(null);
  const [search, setSearch] = useState("");

  // Filter courses – trimmed search
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return featuredCourses;
    return featuredCourses.filter((course) =>
      [course.title, course.desc].join(" ").toLowerCase().includes(term)
    );
  }, [search]);

  // Handlers
  const handleSearchChange = (value) => {
    setSearch(value);
    setFlippedSlug(null);
  };

  const clearSearch = () => {
    setSearch("");
    setFlippedSlug(null);
  };

  return (
    <Section id="courses" className={isDark ? "bg-app-dark-gradient" : "bg-white"}>
      <SectionHeader
        eyebrow="Career Programs"
        heading={
          <>
            Programs Built Around{" "}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Outcomes
            </span>
          </>
        }
        subheading="Every track ships real projects, live mentorship, and a placement target, not just a syllabus."
      />

      {/* Search Bar with Clear Button */}
      <div className="mx-auto mt-8 max-w-md">
        <label htmlFor="course-search" className="sr-only">
          Search programs
        </label>
        <div
          className={`flex items-center gap-2 rounded-pill border px-4 py-2.5 transition-colors focus-within:border-primary-500/50 ${
            isDark ? "border-white/10 bg-white/[0.03]" : "border-ink-900/[0.08] bg-white shadow-sm"
          }`}
        >
          <Search className={`h-4 w-4 ${isDark ? "text-white/40" : "text-ink-900/40"}`} aria-hidden="true" />
          <input
            id="course-search"
            type="text"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search programs by name or skill..."
            className={`w-full bg-transparent text-sm outline-none ${
              isDark ? "text-white placeholder:text-white/30" : "text-ink-900 placeholder:text-ink-900/30"
            }`}
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-ink-900/5"
              }`}
            >
              <X className={`h-4 w-4 ${isDark ? "text-white/50" : "text-ink-900/40"}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        key={search}
      >
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <motion.div key={course.slug} variants={fadeUp}>
              <CourseCard
                course={course}
                isDark={isDark}
                isFlipped={flippedSlug === course.slug}
                onFlip={(next) => setFlippedSlug(next ? course.slug : null)}
              />
            </motion.div>
          ))
        ) : (
          <div
            className={`col-span-full rounded-card border p-10 text-center ${
              isDark ? "border-white/10 bg-white/[0.02]" : "border-ink-900/[0.06] bg-white shadow-sm"
            }`}
          >
            <p className={`text-sm font-semibold ${isDark ? "text-white/70" : "text-ink-900/60"}`}>
              No programs match your search.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-3 text-sm font-medium text-primary-500 underline underline-offset-2 hover:text-primary-600"
            >
              Clear search and show all
            </button>
          </div>
        )}
      </motion.div>
    </Section>
  );
}