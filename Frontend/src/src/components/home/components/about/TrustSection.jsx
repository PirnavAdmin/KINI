import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp.js'
import { useThemeContext } from '@shared/context/ThemeContext'

const stats = [
  { target: 20000, suffix: '+', label: 'Students trained', decimals: 0 },
  { target: 500, suffix: '+', label: 'Hiring partners', decimals: 0 },
  { target: 95, suffix: '%', label: 'Placement success rate', decimals: 0 },
  { target: 9.2, suffix: ' LPA', label: 'Average package', decimals: 1 },
]

// Wordmark-style placeholders — swap for real partner logo assets
const partners = ['Microsoft', 'Amazon', 'Google', 'Flipkart', 'Adobe', 'Paytm']

export default function TrustSection() {
  const { isDark } = useThemeContext()

  return (
    <section
      className="relative pb-28"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0F172A 0%, #111827 50%, #0B1120 100%)'
          : 'linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)',
      }}
    >
      {/* Softens the seam — dark gradient for dark mode */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(15,23,42,0.95) 0%, transparent 100%)'
            : 'linear-gradient(to bottom, white 0%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid grid-cols-2 gap-6 border-y py-14 sm:grid-cols-4 ${
            isDark ? 'border-white/10' : 'border-slate-900/10'
          }`}
        >
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} index={i} isDark={isDark} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className={`eyebrow ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Our students now work at
          </p>
          <div
            className={`mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 ${
              isDark ? 'opacity-70' : 'opacity-80'
            } grayscale`}
          >
            {partners.map((p) => (
              <span
                key={p}
                className={`font-display text-lg font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ target, suffix, label, decimals, index, isDark }) {
  const { ref, value } = useCountUp(target, 1600 + index * 150, decimals)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="text-center"
    >
      <p
        className={`font-display text-3xl font-semibold sm:text-4xl ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {value}
        <span className="text-ascent">{suffix}</span>
      </p>
      <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {label}
      </p>
    </motion.div>
  )
}