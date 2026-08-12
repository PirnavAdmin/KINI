import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '@shared/context/ThemeContext'

export default function CTASection() {
  const { isDark } = useThemeContext()

  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-24 transition-colors duration-500 ${
        isDark ? 'bg-app-dark-gradient text-white' : ''
      }`}
      style={
        !isDark
          ? {
              background:
                'linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)',
            }
          : undefined
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2
          className={`font-display text-2xl font-semibold leading-tight sm:text-3xl md:text-[2.125rem] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Your line starts at zero.{' '}
          <span
            className={
              isDark
                ? 'bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-[#0877B9] via-[#278F8D] to-[#58A94B] bg-clip-text text-transparent'
            }
          >
            It doesn't have to stay there.
          </span>
        </h2>

        <p
          className={`mx-auto mt-3 max-w-md text-sm leading-relaxed sm:text-base ${
            isDark ? 'text-slate-400' : 'text-slate-700'
          }`}
        >
          Join the next cohort and start climbing — from your first commit to
          your first offer letter.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/upskill-program"
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0877B9_0%,#278F8D_50%,#58A94B_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#0877B9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Explore Programs
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/contact"
            className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#0877B9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
              isDark
                ? 'border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10'
                : 'border-slate-300/60 bg-white/60 text-slate-900 backdrop-blur-sm shadow-sm hover:bg-white/80'
            }`}
          >
            Talk to a Mentor
          </Link>
        </div>
      </motion.div>
    </section>
  )
}