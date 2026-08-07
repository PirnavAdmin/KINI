import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import kinilogo from '../../../../assets/Kini (7).svg'

const rows = [
  { label: 'Live Classes', us: 'yes', others: 'no' },
  { label: 'Structured Curriculum', us: 'yes', others: 'no' },
  { label: '1:1 Mentorship', us: 'yes', others: 'no' },
  { label: 'Placement Support', us: 'yes', others: 'no' },
  { label: 'Real, Reviewed Projects', us: 'yes', others: 'partial' },
  { label: 'Mock Interviews', us: 'yes', others: 'no' },
]

const statusMap = {
  yes: { icon: CheckCircle2, className: 'text-brand-green' },
  no: { icon: XCircle, className: 'text-red-500/80' },
  partial: { icon: AlertTriangle, className: 'text-brand-gold' },
}

export default function ComparisonSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-36"
      style={{
        background: 'linear-gradient(135deg, #EAF6FF 0%, #DDF3FF 40%, #E8FBF8 100%)',
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

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="eyebrow text-brand-blue">Why choose us</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            More than a course
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-500">
            Learn from industry experts, build real projects, and get complete,
            hands-on placement support — start to offer letter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-ink-900/10">
            <div className="p-5 sm:p-6" />
            <div className="relative flex items-center justify-center bg-ascent-gradient p-5 shadow-glow sm:p-6">
              <img
                src={kinilogo}
                alt="Kini Edx Hub Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="p-5 text-center sm:p-6">
              <p className="font-display text-sm font-semibold text-ink-500 sm:text-base">
                Other Platforms
              </p>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 items-center transition-colors duration-300 hover:bg-ink-900/[0.03] ${
                i !== rows.length - 1 ? 'border-b border-ink-900/[0.06]' : ''
              }`}
            >
              <div className="p-5 text-sm text-ink-700 sm:p-6">{row.label}</div>
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
      className={`flex justify-center p-5 sm:p-6 ${
        highlighted ? 'bg-brand-blue/[0.09]' : ''
      }`}
    >
      <Icon size={20} className={className} />
    </div>
  )
}