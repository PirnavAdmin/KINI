import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp.js'

const stats = [
  { target: 20000, suffix: '+', label: 'Students trained', decimals: 0 },
  { target: 500, suffix: '+', label: 'Hiring partners', decimals: 0 },
  { target: 95, suffix: '%', label: 'Placement success rate', decimals: 0 },
  { target: 9.2, suffix: ' LPA', label: 'Average package', decimals: 1 },
]

// Wordmark-style placeholders — swap for real partner logo assets
const partners = ['Microsoft', 'Amazon', 'Google', 'Flipkart', 'Adobe', 'Paytm']

export default function TrustSection() {
  return (
    <section
      className="relative pb-28"
      style={{
        background: 'linear-gradient(135deg, #B5DBFF 0%, #C4EFF6 55%, #D8FBF5 100%)',
      }}
    >
      {/* Softens the seam against whatever section sits above — fades
          from white into the gradient over the first ~64px instead of
          starting the blue at a hard edge. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-6 border-y border-slate-900/10 py-14 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} {...s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="eyebrow text-slate-600">Our students now work at</p>
          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80 grayscale">
            {partners.map((p) => (
              <span key={p} className="font-display text-lg font-medium text-slate-600">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ target, suffix, label, decimals, index }) {
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
      <p className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
        {value}
        <span className="text-ascent">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </motion.div>
  )
}