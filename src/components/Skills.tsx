import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

type Tab = 'technical' | 'technologies' | 'soft'

const skills = [
  { name: 'React.js', pct: 80 },
  { name: 'TypeScript', pct: 75 },
  { name: 'Node.js', pct: 80 },
  { name: 'Tailwind CSS', pct: 88 },
  { name: 'PostgreSQL', pct: 72 },
  { name: 'JavaScript', pct: 75 },
  { name: 'Docker', pct: 65 },
  { name: 'AWS', pct: 60 },
  { name: 'Java', pct: 75 },
  { name: 'Python', pct: 70 },
]

const techs = [
  { label: 'TypeScript', icon: '/icons8-typescript-50.png' },
  { label: 'React', icon: '/icons8-react-50.png' },
  { label: 'Node.js', icon: '/icons8-node-js-50.png' },
  { label: 'Tailwind', icon: '/icons8-tailwind-css-50.png' },
  { label: 'PostgreSQL', icon: '/icons8-postgresql-50.png' },
  { label: 'AWS', icon: '/icons8-aws-50.png' },
  { label: 'Docker', icon: '/icons8-docker-50.png' },
  { label: 'MongoDB', icon: '/icons8-mongodb-50.png' },
  { label: 'Git', icon: '/icons8-git-50.png' },
  { label: 'Java', icon: '/icons8-java-50.png' },
  { label: 'Python', icon: '/icons8-python-50.png' },
  { label: 'Linux', icon: '/icons8-linux-50.png' },
]

const softSkills = [
  { num: '01', title: 'Communication', desc: 'Clear communication across technical and non-technical stakeholders.' },
  { num: '02', title: 'Problem Solving', desc: 'Breaking complex challenges into manageable, elegant solutions.' },
  { num: '03', title: 'Collaboration', desc: 'Thriving in agile teams, pair programming, and knowledge sharing.' },
  { num: '04', title: 'Adaptability', desc: 'Quickly learning new technologies and adapting to change.' },
  { num: '05', title: 'Attention to Detail', desc: 'Obsessing over pixel-perfect UI and edge case handling.' },
  { num: '06', title: 'Leadership', desc: 'Mentoring junior devs and driving technical decisions confidently.' },
]

function SkillBar({ name, pct, animate }: { name: string; pct: number; animate: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text">{name}</span>
        <span className="text-xs text-accent-light">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
          style={{ width: animate ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [tab, setTab] = useState<Tab>('technologies')
  const [animate, setAnimate] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (tab === 'technical') {
      const resetTimer = window.setTimeout(() => setAnimate(false), 0)
      const animateTimer = window.setTimeout(() => setAnimate(true), 100)
      return () => {
        window.clearTimeout(resetTimer)
        window.clearTimeout(animateTimer)
      }
    }
  }, [tab])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'technologies', label: 'Tech Stack' },
    { key: 'technical', label: 'Proficiency' },
    { key: 'soft', label: 'Soft Skills' },
  ]

  return (
    <section id="skills" ref={ref} className="relative z-10 px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto">
      <SectionHeader label="Tech Stack" title="Tools & technologies I work with" />

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`text-xs font-medium px-4 py-2 rounded-lg border transition-all
              ${tab === key
                ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-accent/50 text-text'
                : 'border-border text-muted hover:text-text hover:border-accent/30'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'technologies' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {techs.map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-center gap-2.5 group cursor-default"
            >
              <div
                className="w-14 h-14 rounded-xl border border-border bg-surface-2 flex items-center justify-center
                  group-hover:border-accent/40 group-hover:-translate-y-0.5 transition-all"
              >
                <img
                  src={t.icon}
                  alt={t.label}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs text-muted group-hover:text-text transition-colors">
                {t.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {tab === 'technical' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((s) => (
            <SkillBar key={s.name} {...s} animate={animate} />
          ))}
        </motion.div>
      )}

      {tab === 'soft' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {softSkills.map((s) => (
            <div key={s.num} className="card hover:bg-surface-2/50">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold gradient-text">{s.num}</span>
                <span className="font-semibold text-text">{s.title}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
