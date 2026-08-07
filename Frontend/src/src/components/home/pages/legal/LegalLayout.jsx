import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@shared/components/navbar";
import Footer from "@shared/components/Footer";
import Badge from "@shared/components/ui/Badge";
import { EASE_PREMIUM, fadeUp, staggerContainer } from "@shared/hooks/useScrollAnimation";

export function LegalList({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalCallout({ title, children }) {
  return (
    <div className="mt-4 rounded-2xl border border-brand-coral/20 bg-brand-coral/5 p-4">
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

// Deliberately loud — flags legal copy that must be reviewed/filled in
// by counsel before the page goes live, so it can't be missed in a diff.
export function TODOPlaceholder({ children }) {
  return (
    <span className="rounded-md border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 font-mono text-xs font-semibold text-amber-700">
      {children}
    </span>
  );
}

/**
 * Shared chrome for legal/compliance pages (Terms, Privacy, Cookies).
 * Content area is intentionally plain light/white regardless of the
 * site's dark-mode toggle — long-form legal text prioritizes readability
 * over thematic consistency, the same reasoning that keeps the Footer
 * permanently dark rather than theme-toggling.
 */
export function LegalLayout({ eyebrow, title, intro, sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="relative overflow-hidden bg-porcelain py-8 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-[140px]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Badge tone="coral">{eyebrow}</Badge>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-900/60 sm:text-base">{intro}</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid lg:grid-cols-[240px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <nav className="sticky top-24 flex flex-col gap-1" aria-label="Sections on this page">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? "true" : undefined}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    activeId === section.id
                      ? "bg-primary-50 text-primary-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <section.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-12"
          >
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                    <section.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h2 className="font-display text-lg font-bold text-ink-900">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">{section.content}</div>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
