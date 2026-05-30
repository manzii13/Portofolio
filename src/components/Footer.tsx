import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="border-t border-border px-6 md:px-12 lg:px-16 py-8 max-w-6xl mx-auto">
        <p className="text-xs text-muted text-center lg:text-left">
          Built with React & Tailwind · © {new Date().getFullYear()} Manzi Arsene
        </p>
      </footer>

      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-lg
            border border-border text-muted bg-surface
            flex items-center justify-center text-lg
            hover:border-accent hover:text-accent-light transition-colors shadow-card"
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </>
  )
}
