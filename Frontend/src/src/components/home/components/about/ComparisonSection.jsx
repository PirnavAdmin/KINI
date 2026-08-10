import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { useThemeContext } from '@shared/context/ThemeContext'
import kinilogo from '../../../../assets/Kini (7).svg'

const rows = [
  { label: 'Live Classes', us: 'yes', others: 'no' },
  { label: 'Structured Curriculum', us: 'yes', others: 'no' },
  { label: '1:1 Mentorship', us: 'yes', others: 'no' },
  { label: 'Placement Support', us: 'yes', others: 'no' },
  { label: 'Guaranteed Internships', us: 'yes', others: 'no' },
  { label: 'Real, Reviewed Projects', us: 'yes', others: 'partial' },
  { label: 'Mock Interviews', us: 'yes', others: 'no' },
]

const statusMap = {
  yes: { icon: CheckCircle2, className: 'text-brand-green' },
  no: { icon: XCircle, className: 'text-red-500/80' },
  partial: { icon: AlertTriangle, className: 'text-brand-gold' },
}

// Label column gets more room than the two icon columns — this matters most
// on narrow viewports, where an even 3-way split crowds longer labels like
// "Guaranteed Internships" against the status icons.
const ROW_GRID = 'grid grid-cols-[1.3fr_1fr_1fr]'

export default function ComparisonSection() {
  const { isDark } = useThemeContext()

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-36"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0F172A 0%, #111827 50%, #0B1120 100%)'
          : 'linear-gradient(135deg, #EAF6FF 0%, #DDF3FF 40%, #E8FBF8 100%)',
      }}
    >
      {/* Ambient tint */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[140px]" />

      {/* Logo watermark */}
      <img
        src={kinilogo}
        alt="Kini Edx Hub Logo"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] select-none opacity-[0.05] sm:h-[520px] sm:w-[520px]"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="eyebrow text-brand-blue dark:text-primary-300">Why choose us</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl md:text-4xl">
            More than a course
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-500 dark:text-slate-400 sm:text-[15px]">
            Learn from industry experts, build real projects, and get complete,
            hands-on placement support — start to offer letter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl"
        >
          {/* Header row */}
          <div className={`${ROW_GRID} border-b border-ink-900/10 dark:border-white/10`}>
            <div className="p-3 sm:p-5 md:p-6" />
            {/* Logo cell – now transparent */}
            <div className="relative flex items-center justify-center p-2 sm:p-5 md:p-6">
              <img
                src={kinilogo}
                alt="Kini Edx Hub Logo"
                className="h-7 w-auto object-contain sm:h-10 md:h-12"
              />
            </div>
            <div className="p-2 text-center sm:p-5 md:p-6">
              <p className="font-display text-[11px] font-semibold leading-tight text-ink-500 dark:text-slate-400 sm:text-sm md:text-base">
                Other Platforms
              </p>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`${ROW_GRID} items-center transition-colors duration-300 hover:bg-ink-900/[0.03] dark:hover:bg-white/[0.03] ${
                i !== rows.length - 1 ? 'border-b border-ink-900/[0.06] dark:border-white/10' : ''
              }`}
            >
              <div className="p-3 text-xs leading-snug text-ink-700 dark:text-slate-300 sm:p-5 sm:text-sm md:p-6">
                {row.label}
              </div>
              <StatusCell status={row.us} highlighted />
              <StatusCell status={row.others} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatusCell({ status, highlighted }) {
  const { icon: Icon, className } = statusMap[status]
  return (
    <div
      className={`flex justify-center p-3 sm:p-5 md:p-6 ${
        highlighted ? 'bg-brand-blue/[0.09]' : ''
      }`}
    >
      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${className}`} />
    </div>
  )
}