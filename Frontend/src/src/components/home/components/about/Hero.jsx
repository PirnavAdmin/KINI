import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '@shared/context/ThemeContext'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { isDark } = useThemeContext()

  return (
    <section
      className={`relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32 transition-colors duration-500 ${
        isDark ? 'bg-app-dark-gradient text-white' : ''
      }`}
      style={!isDark ? {
        background: 'linear-gradient(180deg, #B5DBFF 0%, #BCE4FD 25%, #C4EFF6 50%, #CDF5F5 75%, #D8FBF5 100%)'
      } : undefined}
    >
      {/* Ambient gradient wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-32 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full blur-[120px] ${
          isDark ? 'bg-brand-blue/20' : 'bg-blue-400/20'
        }`} />
        <div className={`absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full blur-[100px] ${
          isDark ? 'bg-brand-green/15' : 'bg-emerald-400/15'
        }`} />
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      </div>
      <div className={`noise absolute inset-0 ${isDark ? '' : 'opacity-30'}`} />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* ——— BADGE ——— */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className={`eyebrow inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs shadow-sm backdrop-blur-md ${
            isDark
              ? 'border-white/10 bg-white/5 text-slate-300'
              : 'border-blue-900/10 bg-white/60 text-slate-800'
          }`}
        >
          <Sparkles size={12} className={isDark ? "text-brand-green" : "text-emerald-600"} />
          Industry-Ready Tech Education
        </motion.div>

        {/* ——— HEADING ——— */}
        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className={`mx-auto mt-3.5 max-w-4xl text-[2.25rem] font-semibold leading-[1.1] sm:text-5xl md:text-[3.75rem] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          We don't just teach.
          <br />
          <span className={isDark ? "text-ascent" : "bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent"}>
            We build careers.
          </span>
        </motion.h1>

        {/* ——— DESCRIPTION ——— */}
        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base ${
            isDark ? 'text-slate-400' : 'text-slate-700 font-medium'
          }`}
        >
          Learn through live training, real-world projects, 1:1 mentorship, and
          practical career guidance designed for the modern tech industry.
        </motion.p>

        {/* ——— CTAs ——— */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/upskill-program"
            className="
              group
              relative
              inline-flex
              items-center
              gap-2
              overflow-hidden
              rounded-full
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:-translate-y-0.5
              shadow-[0_12px_30px_rgba(29,114,190,0.28)]
              hover:shadow-[0_18px_40px_rgba(29,114,190,0.38)]
            "
            style={{
              background:
                "linear-gradient(90deg, #1D72BE 0%, #2B8FC6 30%, #33A8A0 68%, #5AB347 100%)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Programs
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold backdrop-blur transition-all duration-300 ${
              isDark
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-blue-900/20 bg-white/50 text-slate-900 hover:bg-white/80 shadow-sm"
            }`}
          >
            <MessageCircle
              size={15}
              className={isDark ? "" : "text-blue-700"}
            />
            Talk to a Mentor
          </Link>
        </motion.div>

        {/* ——— VALUE CARDS (replaces statistics) ——— */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="relative mx-auto mt-10 hidden max-w-3xl sm:block pb-4"
        >
          <FloatingCard
            className="left-2 top-0 -rotate-3"
            delay={0}
            label="LIVE TRAINING"
            value="100%"
            description="Instructor-led"
            accent={isDark ? "text-brand-blue" : "text-blue-700"}
            isDark={isDark}
          />
          <FloatingCard
            className="right-2 top-0 rotate-2"
            delay={0.6}
            label="MENTORSHIP"
            value="1:1"
            description="Industry Experts"
            accent={isDark ? "text-brand-green" : "text-emerald-700"}
            isDark={isDark}
          />
          <FloatingCard
            className="left-1/2 top-4 -translate-x-1/2 -rotate-1"
            delay={1.1}
            label="PROJECTS"
            value="REAL-WORLD"
            description="Hands-on Learning"
            accent={isDark ? "text-brand-gold" : "text-amber-700"}
            isDark={isDark}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Floating Card (with optional description) ───
function FloatingCard({ className, delay, label, value, description, accent, isDark }) {
  return (
    <div
      className={`absolute w-40 animate-float rounded-xl px-3.5 py-2.5 text-left ${
        isDark
          ? 'glass-dark shadow-card-lg'
          : 'bg-white/80 backdrop-blur-md border border-white/80 shadow-lg'
      } ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400 eyebrow' : 'text-slate-500'}`}>
        {label}
      </p>
      <p className={`mt-0.5 font-display text-lg font-bold ${accent}`}>
        {value}
      </p>
      {description && (
        <p className={`mt-0.5 text-[10px] font-medium ${isDark ? 'text-slate-400/70' : 'text-slate-500/70'}`}>
          {description}
        </p>
      )}
    </div>
  )
}