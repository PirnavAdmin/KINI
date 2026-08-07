import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, ArrowUpRight, Zap, Building2, RefreshCw, ShieldCheck } from "lucide-react";
import Navbar from "@shared/components/navbar";
import Footer from "@shared/components/Footer";
import GetInTouchFormFields from "@shared/components/Getintouchformfields";
import { useThemeContext } from "@shared/context/ThemeContext";

// ─── Design tokens ───────────────────────────────────────────────────────────
// Motion: a single "linear-ish" ease-out curve used everywhere for cohesion.
const EASE = [0.16, 0.8, 0.3, 1];

// ─── FAQ Data ────────────────────────────────────────────────────────────────
// Icons are purely visual groupings of the existing copy — no content changed.

const FAQS = [
  {
    icon: Zap,
    q: "How quickly can I get started?",
    a: "Immediately. After registering, you'll have instant access to all platform features.",
  },
  {
    icon: Building2,
    q: "Do you offer enterprise pricing?",
    a: "Yes. Contact our sales team for custom enterprise plans tailored to your organization's size and needs.",
  },
  {
    icon: RefreshCw,
    q: "Can I change my plan later?",
    a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time.",
  },
  {
    icon: ShieldCheck,
    q: "Is my data secure?",
    a: "Enterprise-grade security with SOC 2 compliance, end-to-end encryption, and role-based access controls.",
  },
];

const OFFICE_ADDRESS = "407, 4th Floor, Capital Park, Madhapur, Hyderabad, 500081";
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.267013004733!2d78.3863243!3d17.4469296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910d8d1c4f8b%3A0x6ef1b184af90fa3f!2sCapital%20Park!5e0!3m2!1sen!2sin!4v1786012520819!5m2!1sen!2sin";
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function Contact() {
  const { isDark } = useThemeContext();
  const prefersReducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  // Respect reduced-motion: collapse entrance offsets to a plain fade.
  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  return (
    <>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 text-slate-900 sm:pt-32 sm:pb-24"
        style={{
          background: "linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)",
        }}
      >
        {/* fine dot-grid — a quiet nod to "finding your way here" */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(rgba(15,23,42,0.14) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)",
          }}
        />

        <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-purple-300/20 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-5 text-center">
          <motion.span
            {...rise(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-5 py-2 text-sm font-semibold tracking-wide text-slate-700 shadow-sm backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Get in Touch
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mx-auto mb-5 max-w-3xl text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            We'd Love to
            <span className="block bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              Hear From You
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Have a question, need support, or want to discuss enterprise plans? Our team is here to help.
          </motion.p>
        </div>
      </section>

      {/* ─── STICKY FORM SIDEBAR + SCROLLING CONTENT ─────────
          Pure CSS sticky (no scroll listeners): the aside is a grid
          child that stretches to the row's full height by default, and
          `lg:sticky lg:top-[110px] lg:h-fit` pins the card inside that
          tall cell until the cell itself ends. */}
      <section className={`py-20 sm:py-28 ${isDark ? "bg-[#020617]" : "bg-slate-50"}`}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-[440px_1fr] lg:gap-12">
            {/* ── LEFT: sticky — just the form ── */}
            <aside className="lg:sticky lg:top-[110px] lg:h-fit">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative overflow-hidden rounded-[28px] border shadow-elevated"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)",
                  boxShadow: isDark
                    ? "0 24px 60px -20px rgba(0,0,0,0.6)"
                    : "0 24px 60px -20px rgba(37,99,235,0.25)",
                }}
              >
                {/* single soft corner glow instead of a full-surface rainbow wash */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                {/* hairline inner highlight for a glass edge */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/40" />

                <div className={`relative p-7 backdrop-blur-xl sm:p-8 ${isDark ? "bg-slate-950/60" : "bg-white/70"}`}>
                  <GetInTouchFormFields heading="Get In Touch" />
                </div>
              </motion.div>
            </aside>

            {/* ── RIGHT: normally-scrolling content ── */}
            <div className="min-w-0 space-y-16 lg:space-y-20">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="mb-5 flex items-end justify-between gap-4">
                  <h2 className={`text-2xl font-extrabold sm:text-3xl ${isDark ? "text-white" : "text-slate-900"}`}>
                    Visit Our Office
                  </h2>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group hidden shrink-0 items-center gap-1 text-sm font-semibold transition-colors sm:inline-flex ${
                      isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 rounded-md`}
                  >
                    Get directions
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <div
                  className={`relative min-h-[320px] overflow-hidden rounded-[28px] border shadow-lg transition-shadow duration-300 hover:shadow-xl ${
                    isDark ? "border-white/[0.08]" : "border-slate-200"
                  }`}
                >
                  <iframe
                    title="Kini EduHub office location"
                    src={MAP_SRC}
                    className="absolute inset-0 h-full w-full grayscale-[15%]"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />

                  <div
                    className={`absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-xl sm:right-auto sm:max-w-xs ${
                      isDark ? "border-white/10 bg-slate-950/85" : "border-slate-200 bg-white/90"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isDark ? "bg-blue-500/15 text-blue-400" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>
                        {OFFICE_ADDRESS}
                      </p>
                      <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold sm:hidden ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Get directions <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-6"
                >
                  <h2 className={`text-2xl font-extrabold sm:text-3xl ${isDark ? "text-white" : "text-slate-900"}`}>
                    Frequently Asked Questions
                  </h2>
                  <p className={`mt-2 text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>
                    Can't find what you're looking for? Send us a message.
                  </p>
                </motion.div>

                <div className="space-y-3">
                  {FAQS.map((faq, i) => {
                    const isOpen = openFaq === i;
                    const Icon = faq.icon;
                    return (
                      <motion.div
                        key={faq.q}
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                        className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                          isDark
                            ? `bg-white/[0.03] ${isOpen ? "border-blue-500/30" : "border-white/[0.06]"}`
                            : `bg-white shadow-sm ${isOpen ? "border-blue-300" : "border-slate-200"}`
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          className="flex w-full items-center gap-4 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                              isOpen
                                ? isDark
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-blue-100 text-blue-600"
                                : isDark
                                ? "bg-white/5 text-white/40"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>

                          <span
                            className={`flex-1 text-sm font-semibold sm:text-base ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {faq.q}
                          </span>

                          <ArrowUpRight
                            className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-45" : "rotate-0"
                            } ${isDark ? "text-white/40" : "text-slate-400"}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-panel-${i}`}
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <p
                                className={`px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed ${
                                  isDark ? "text-white/50" : "text-slate-500"
                                }`}
                              >
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
