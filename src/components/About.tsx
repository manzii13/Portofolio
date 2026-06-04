import { motion } from 'framer-motion'
import { Calendar, Code2, Users, Star } from 'lucide-react'
import SectionHeader from './SectionHeader'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

const stats = [
  { icon: Calendar, value: '2+', label: 'Years experience' },
  { icon: Code2, value: '7+', label: 'Projects completed' },
  { icon: Users, value: '10+', label: 'Happy clients' },
  { icon: Star, value: '5★', label: 'Client rating' },
]

const doCards = [
  {
    icon: 'FE',
    title: 'Frontend Development',
    desc: 'Building responsive, performant UIs with React, TypeScript & Tailwind CSS.',
  },
  {
    icon: 'BE',
    title: 'Backend Development',
    desc: 'Designing RESTful APIs and scalable server-side systems with Node.js.',
  },
  {
    icon: 'UI',
    title: 'UI/UX Implementation',
    desc: 'Translating designs into pixel-perfect, accessible interfaces.',
  },
]

const chips = ['Clean Code', 'Problem Solver', 'Team Player', 'Fast Learner', 'Open Source']

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto">
      <SectionHeader
        label="About Me"
        title="I build products that"
        titleAccent="solve real problems."
      />

      <motion.p
        {...fadeUp(0.1)}
        className="text-muted text-sm leading-relaxed max-w-2xl mb-10 -mt-4"
      >
        I&apos;m a Full-Stack Developer based in Kigali, focused on building scalable,
        high-performance web applications. I combine clean code with thoughtful design to
        create seamless, user-centered experiences.
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            {...fadeUp(0.15 + i * 0.05)}
            className="card flex flex-col items-center text-center gap-3 py-6"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-soft flex items-center justify-center">
              <Icon size={20} className="text-accent-light" />
            </div>
            <span className="text-2xl font-bold text-text">{value}</span>
            <span className="text-xs text-muted">{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-4">
          <p className="text-muted text-sm leading-relaxed">
            I&apos;m driven by continuous learning and a passion for turning complex ideas into
            simple, elegant solutions. Whether it&apos;s developing robust APIs or crafting
            responsive interfaces, I aim to build products that are both functional and impactful.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            When I&apos;m not writing APIs or pushing pixels, you&apos;ll find me contributing to
            open-source, exploring new tech, or sharing knowledge with the dev community.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {chips.map((chip) => (
              <span key={chip} className="tag">
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3">
          {doCards.map((card) => (
            <div
              key={card.title}
              className="card flex items-start gap-4 hover:bg-surface-2/50"
            >
              <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-soft flex items-center justify-center text-xs font-bold text-accent-light">
                {card.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-text mb-1">{card.title}</p>
                <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="/Resume.pdf" download className="btn-gradient text-xs px-5 py-2.5">
              Download Resume
            </a>
            <a href="#contact" className="btn-outline text-xs px-5 py-2.5">
              Let&apos;s Talk →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
