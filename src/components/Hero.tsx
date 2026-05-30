import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'

const roles = ['Software Engineer', 'Full-Stack Developer']

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = roles[roleIndex]
    const speed = deleting ? 55 : 90

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(word.slice(0, displayed.length + 1))
        if (displayed.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        setDisplayed(word.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-20 lg:py-24 overflow-hidden bg-hero-bg"
    >
      <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2.5 w-fit px-4 py-2 rounded-full
              border border-border bg-surface text-sm text-muted"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            Available for new opportunities
          </motion.div>

          <motion.h1
            {...fadeUp(0.25)}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-text"
          >
            Building robust software solutions{' '}
            <span className="gradient-text">that scale.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className="text-muted text-base leading-relaxed max-w-lg">
            <span className="text-accent-light font-medium">{displayed}</span>
            <span className="inline-block w-0.5 h-4 bg-accent-light ml-0.5 align-middle animate-pulse" />
            {' — '}
            Full-Stack Developer with 2+ years of experience building fast, scalable web
            applications. I turn complex problems into clean, efficient solutions.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="btn-gradient">
              View my work
              <ArrowRight size={16} />
            </a>
            <a href="/Resume.pdf" download className="btn-outline">
              Download resume
              <Download size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5]">
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
            >
              <img
                src="/hero.png"
                alt="Manzi Arsene"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hero-bg to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
