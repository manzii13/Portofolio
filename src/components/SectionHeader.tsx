import { motion } from 'framer-motion'

type SectionHeaderProps = {
  label: string
  title: string
  titleAccent?: string
  action?: { label: string; href: string }
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

export default function SectionHeader({ label, title, titleAccent, action }: SectionHeaderProps) {
  return (
    <motion.div {...fadeUp(0)} className="flex items-end justify-between gap-4 mb-10">
      <div>
        <p className="section-label">{label}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="gradient-text">{titleAccent}</span>
            </>
          )}
        </h2>
      </div>
      {action && (
        <a
          href={action.href}
          className="hidden sm:inline-flex text-sm text-muted hover:text-accent-light transition-colors whitespace-nowrap"
        >
          {action.label} →
        </a>
      )}
    </motion.div>
  )
}
