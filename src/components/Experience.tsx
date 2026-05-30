import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface Job {
  company: string
  period: string
  role: string
  type: 'Full-Time' | 'Contract' | 'Part-Time'
  desc: string
  responsibilities: string[]
  tags: string[]
}

interface Edu {
  degree: string
  school: string
  year: string
}

const jobs: Job[] = [
  {
    company: 'Personal Projects',
    period: '2023 — Present',
    role: 'Full-Stack Developer',
    type: 'Full-Time',
    desc: 'Focused on building practical applications to strengthen technical skills and solve real-world problems through self-directed projects.',
    responsibilities: [
      'Developed a restaurant website with React featuring menu display and reservation system.',
      'Built a full-stack e-commerce platform (Vendai) using React, Express.js, Prisma, and Docker.',
      'Created data analysis projects using Python to analyze transportation patterns and visualize insights.',
      'Developed interactive games and applications to explore different programming paradigms.',
      'Currently working on a real estate platform with property listings and user authentication.',
    ],
    tags: ['React', 'Node.js', 'Python', 'Express.js', 'Docker', 'Prisma'],
  },
]

const education: Edu[] = [
  { degree: 'BSc in Software Engineering', school: 'Adventist University of Central Africa – AUCA', year: '2023 — Present (Expected 2027)' },
]

const engineerLines = [
  '  name: "Manzi Arsene",',
  '  role: "Full-Stack Developer",',
  '  passion: "Building scalable apps",',
  '  goal: "Solve real problems",',
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const job = jobs[active]

  return (
    <section id="experience" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto">
      <SectionHeader
        label="Experience"
        title="Where I've"
        titleAccent="worked"
        action={{ label: 'View full resume', href: '/Resume.pdf' }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr_280px] gap-10 items-start">
        {/* Timeline */}
        <div className="relative flex flex-col gap-0 xl:pt-2">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden xl:block" />
          {jobs.map((j, i) => (
            <button
              key={j.company}
              type="button"
              onClick={() => setActive(i)}
              className={`relative flex items-start gap-4 text-left py-4 pl-0 xl:pl-6 transition-all
                ${active === i ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
            >
              <span
                className={`hidden xl:block absolute left-0 top-6 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 z-10
                  ${active === i
                    ? 'border-accent bg-accent shadow-glow'
                    : 'border-muted bg-bg'}`}
              />
              <div>
                <p className={`font-semibold text-sm ${active === i ? 'text-text' : 'text-muted'}`}>
                  {j.role}
                </p>
                <p className="text-xs text-muted mt-0.5">{j.company}</p>
                <p className="text-xs text-muted/80 mt-1">{j.period}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Job details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="text-xl font-bold text-text mb-1">
                {job.role}
                <span className="text-muted font-normal"> @ {job.company}</span>
              </h3>
              <p className="text-xs text-muted">{job.period} · {job.type}</p>
            </div>

            <p className="text-sm text-muted leading-relaxed">{job.desc}</p>

            <ul className="flex flex-col gap-2.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-text/90">
                  <span className="text-accent-light mt-1">▹</span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-1">
              {job.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative panel */}
        <div className="hidden xl:flex flex-col gap-4">
          <div className="card p-4 font-mono text-xs leading-relaxed overflow-x-auto">
            <pre className="text-muted whitespace-pre">
              <span className="text-violet-400">const</span>{' '}
              <span className="text-blue-400">engineer</span>
              <span className="text-text"> = {'{'}</span>
              {'\n'}
              {engineerLines.map((line) => (
                <span key={line} className="block text-muted">
                  {line}
                </span>
              ))}
              <span className="text-text">{'}'};</span>
            </pre>
          </div>
          <blockquote className="card relative pl-6">
            <span className="absolute left-4 top-3 text-3xl text-violet-500/40 font-serif">&ldquo;</span>
            <p className="text-sm text-muted italic leading-relaxed pt-2">
              The best error message is the one that never shows up.
            </p>
            <footer className="text-xs text-muted mt-3 not-italic">— Thomas Fuchs</footer>
          </blockquote>
        </div>
      </div>

      {/* Education */}
      <div className="mt-16 pt-12 border-t border-border">
        <p className="section-label mb-6">Education</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((e) => (
            <div key={e.degree} className="card hover:bg-surface-2/50">
              <p className="font-semibold text-text mb-1">{e.degree}</p>
              <p className="text-xs text-accent-light mb-1">{e.school}</p>
              <p className="text-xs text-muted">{e.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
