import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  Layers,
  Mail,
  Menu,
  X,
} from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Layers },
  { label: 'Contact', href: '#contact', icon: Mail },
]

const socials = [
  { label: 'GH', href: 'https://github.com/manzii13', title: 'GitHub' },
  { label: 'IN', href: 'https://www.linkedin.com/in/manziarsene/', title: 'LinkedIn' },
  { icon: Mail, href: 'mailto:arsenemanzi13@gmail.com', title: 'Email' },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const imgHeight = size === 'sm' ? 'h-9' : 'h-11'

  return (
    <a
      href="#home"
      aria-label="Manzi Arsene — Home"
      className="group inline-flex items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl
          bg-[#070b14] ring-1 ring-white/10 shadow-card
          transition-all duration-300 ease-out
          group-hover:ring-accent/45 group-hover:shadow-glow
          group-hover:scale-[1.02] active:scale-[0.98]`}
      >
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/25 via-indigo-500/15 to-violet-500/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <img
          src="/MALogo.png"
          alt="Manzi Arsene"
          draggable={false}
          className={`relative ${imgHeight} w-auto object-contain px-1.5 py-1`}
        />
      </span>
    </a>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const offset = 120
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NavContent = () => (
    <>
      <div className="px-6 py-7">
        <BrandLogo />
      </div>

      <nav className="flex-1 px-4">
        <ul className="flex flex-col gap-1">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const id = href.slice(1)
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? 'text-text bg-white/5'
                      : 'text-muted hover:text-text hover:bg-white/[0.03]'}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gradient-to-b from-blue-400 to-violet-500" />
                  )}
                  <Icon size={18} className={isActive ? 'text-accent-light' : ''} />
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-6 py-6 border-t border-border mt-auto">
        <div className="flex items-center gap-3 mb-4">
          {socials.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.title}
              className="text-muted hover:text-accent-light transition-colors text-xs font-semibold w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-accent/40"
            >
              {'icon' in s && s.icon ? <s.icon size={16} /> : s.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Manzi Arsene.
          <br />
          All rights reserved.
        </p>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[260px] flex-col
          border-r border-border bg-bg/95 backdrop-blur-md"
      >
        <NavContent />
      </motion.aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-5 h-14
        border-b border-border bg-bg/90 backdrop-blur-md">
        <BrandLogo size="sm" />
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="text-muted hover:text-text p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden fixed inset-x-0 top-14 z-40 bottom-0 bg-bg border-t border-border flex flex-col overflow-y-auto"
          >
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
