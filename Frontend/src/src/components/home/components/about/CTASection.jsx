import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useThemeContext } from '@shared/context/ThemeContext'

export default function CTASection() {
  const { isDark } = useThemeContext()

  return (
    <section 
      className={`relative overflow-hidden py-20 sm:py-24 transition-colors duration-500 ${
        isDark ? 'bg-app-dark-gradient text-white' : ''
      }`}
      style={!isDark ? {
        background: 'linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)'
      } : undefined}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px] bg-blue-400/30" />
      <div className={`noise absolute inset-0 ${isDark ? '' : 'opacity-25'}`} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className={`font-display text-2xl font-semibold sm:text-3xl md:text-4xl leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Your line starts at zero.{' '}
          <span className={isDark ? 'text-ascent' : 'bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent'}>
            It doesn't have to stay there.
          </span>
        </h2>
        
        <p className={`mx-auto mt-3 max-w-md text-sm leading-relaxed sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-700 font-medium'
        }`}>
          Join the next cohort and start climbing — from your first commit to
          your first offer letter.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#programs"
            className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
              isDark
                ? 'bg-ascent-gradient text-white shadow-glow'
                : 'bg-slate-900 text-white shadow-lg hover:bg-slate-800'
            }`}
          >
            Explore Programs
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#mentor"
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur transition-all duration-300 ${
              isDark
                ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                : 'border-blue-900/20 bg-white/50 text-slate-900 hover:bg-white/80 shadow-sm'
            }`}
          >
            Talk to a Mentor
          </a>
        </div>
      </motion.div>
    </section>
  )
}