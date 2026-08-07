import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

export default function MissionVision() {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background: 'linear-gradient(135deg, #EAF5FF 0%, #DFF5F0 45%, #F6FFF9 100%)',
      }}
    >
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-blue/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-green/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-brand-blue shadow-sm">
                <Target size={18} />
              </span>
              <p className="eyebrow text-slate-500">Our Mission</p>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Turn potential into proof — in the form of an offer letter.
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
              We help learners build strong fundamentals, real-world engineering
              skills, and genuine interview confidence, so they can compete for
              — and win — roles at top technology companies.
            </p>
          </div>

          <div className="h-px w-16 bg-ink-900/10" />

          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-brand-green shadow-sm">
                <Eye size={18} />
              </span>
              <p className="eyebrow text-slate-500">Our Vision</p>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              The top 1% of technology talent, trained here.
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
              We're building the education layer that the industry actually
              trusts — where a Kini Edx credential signals verified,
              job-ready skill, not just a completed course.
            </p>
          </div>
        </motion.div>

        {/* Right — glass card over gradient artwork. Kept intentionally
            dark: a contrast panel reads as more premium than flattening
            the whole section to light, and it's the one thing on the
            page meant to pop rather than blend in. */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3.5xl bg-gradient-to-br from-brand-blue via-ink-800 to-brand-green/40 p-1 shadow-glow">
            <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-4px)] bg-ink-900">
              <div className="noise absolute inset-0" />
              <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 500" fill="none">
                <motion.path
                  d="M20 460 C 100 460, 130 380, 200 360 S 320 240, 380 40"
                  stroke="url(#mvAscent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="mvAscent" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating glass stat card */}
              <div className="glass-dark absolute bottom-6 left-6 right-6 rounded-2xl p-5 shadow-card-lg">
                <p className="eyebrow text-slate-400">Verified outcome</p>
                <p className="mt-1 font-display text-2xl font-semibold text-white">
                  95% <span className="text-ascent">placement rate</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Across 20,000+ learners since inception
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}