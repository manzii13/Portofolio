import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionHeader from './SectionHeader'

type FadeUpAnimation = {
  initial: { opacity: number; y: number }
  animate: { opacity: number; y: number }
  transition: { duration: number; delay: number; ease: 'easeOut' }
}

const fadeUp = (delay: number): FadeUpAnimation => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

type Category = 'all' | 'fullstack' | 'frontend' | 'backend' | 'python'

interface Project {
  id: number
  title: string
  desc: string
  tags: string[]
  category: Category
  demo: string
  github: string
  image: string
  iconColor: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Restaurant Web',
    desc: 'A modern restaurant website built with React featuring menu display, reservation system, and responsive design.',
    tags: ['React', 'CSS', 'JavaScript'],
    category: 'frontend',
    demo: 'https://restaurant-web-steel.vercel.app/',
    github: 'https://github.com/manzii13/restaurant-web.git',
    image: '/restaurant.png',
    iconColor: '#ef4444',
    featured: true,
  },
  {
    id: 2,
    title: 'Vendai',
    desc: 'Full-stack e-commerce platform with React frontend, Express.js backend, Prisma ORM, and Docker containerization.',
    tags: ['React', 'Express.js', 'Prisma', 'Docker'],
    category: 'fullstack',
    demo: '#',
    github: 'https://github.com/manzii13/Vendai.git',
    image: '/vendxx-logo.png',
    iconColor: '#8b5cf6',
    featured: true,
  },
  {
    id: 3,
    title: 'Uber Analysis',
    desc: 'Data analysis project using Python to analyze Uber ride patterns and visualize transportation insights.',
    tags: ['Python', 'Data Analysis', 'Visualization'],
    category: 'python',
    demo: '#',
    github: 'https://github.com/manzii13/Uber_Analysis.git',
    image: '/uber analysis.png',
    iconColor: '#3776ab',
  },
  {
    id: 4,
    title: 'Base Ball Game',
    desc: 'Interactive baseball game developed in Python with game logic and user interface.',
    tags: ['Python', 'Game Development'],
    category: 'python',
    demo: '#',
    github: 'https://github.com/manzii13/Base-Ball-Game.git',
    image: '/baseball game.png',
    iconColor: '#f59e0b',
  },
  {
    id: 5,
    title: 'Real Estate Platform',
    desc: 'Currently developing a comprehensive real estate platform with property listings, search functionality, and user authentication.',
    tags: ['React', 'SpringBoot', 'PostgreSQL', 'In Progress'],
    category: 'fullstack',
    demo: '#',
    github: '#',
    image: '/realestate.png',
    iconColor: '#10b981',
    featured: true,
  },
  {
    id: 6,
    title: 'AM-TECH',
    desc: 'Online tech store built with React and TypeScript — product catalog, shopping experience, and a responsive storefront.',
    tags: ['React', 'TypeScript', 'Vite', 'CSS'],
    category: 'frontend',
    demo: 'https://am-techh.netlify.app/',
    github: 'https://github.com/manzii13/AM-TECH.git',
    image: '/AM-TECHLogo.png',
    iconColor: '#3b82f6',
    featured: true,
  },
  {
    id: 7,
    title: 'AmiraScents',
    desc: 'Luxury perfume brand website with hero carousel, product catalog, cart UI, and contact form — built with vanilla HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'frontend',
    demo: 'https://amirascents.netlify.app/',
    github: 'https://github.com/manzii13/AmiraScents.git',
    image: '/amirascents.png',
    iconColor: '#d97706',
    featured: true,
  },
]

const filters: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'python', label: 'Python' },
]

export default function Projects() {
  const [active, setActive] = useState<Category>('all')

  const filtered = projects.filter((p) => active === 'all' || p.category === active)

  return (
    <section id="projects" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto">
      <SectionHeader
        label="Featured Projects"
        title="Selected work &"
        titleAccent="case studies"
        action={{ label: 'View all projects', href: '#projects' }}
      />

      <motion.div {...fadeUp(0.15)} className="flex gap-2 flex-wrap mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={`text-xs font-medium px-4 py-2 rounded-lg border transition-all
              ${active === f.key
                ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-accent/50 text-text'
                : 'border-border text-muted hover:text-text'}`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card group overflow-hidden p-0 flex flex-col"
            >
              <div className="h-44 flex items-center justify-center relative overflow-hidden bg-surface-2">
                {p.featured && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-violet-500 text-white px-2 py-1 rounded z-10">
                    Featured
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg text-text group-hover:text-accent-light transition-colors">
                    {p.title}
                  </h3>
                  <a
                    href={p.demo}
                    className="text-muted hover:text-accent-light flex-shrink-0 mt-0.5"
                    aria-label={`Open ${p.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <a href={p.demo} className="text-xs font-medium text-accent-light hover:underline">
                    Live demo
                  </a>
                  <span className="text-border">·</span>
                  <a href={p.github} className="text-xs font-medium text-muted hover:text-text">
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  )
}
