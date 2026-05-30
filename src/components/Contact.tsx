import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Calendar, ArrowRight } from 'lucide-react'
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

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    setSending(true)
    setError(false)
    setSent(false)

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      formRef.current.reset()
    } catch (submitError) {
      console.error('EmailJS error:', submitError)
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 max-w-6xl mx-auto">
      <SectionHeader
        label="Let's Work Together"
        title="Let's build something"
        titleAccent="amazing together."
      />

      <motion.p {...fadeUp(0.15)} className="text-muted text-sm max-w-xl mb-10 -mt-4">
        Have a project in mind or want to collaborate? I&apos;m always open to new opportunities.
      </motion.p>

      <motion.div
        {...fadeUp(0.25)}
        className="card flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 md:p-8 mb-8"
      >
        <div className="flex flex-wrap gap-6 md:gap-10">
          <a
            href="mailto:arsenemanzi13@gmail.com"
            className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <Mail size={16} className="text-accent-light" />
            arsenemanzi13@gmail.com
          </a>
          <span className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} className="text-accent-light" />
            Kigali, Rwanda
          </span>
          <a
            href="https://www.linkedin.com/in/manziarsene/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-accent-light transition-colors"
          >
            <Calendar size={16} className="text-accent-light" />
            Let&apos;s schedule a call
          </a>
        </div>
        <a href="#contact-form" className="btn-gradient flex-shrink-0">
          Send me a message
          <ArrowRight size={16} />
        </a>
      </motion.div>

      <motion.div {...fadeUp(0.35)} id="contact-form" className="card p-6 md:p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-surface-2 border border-border rounded-lg text-text text-sm px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted/60 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-surface-2 border border-border rounded-lg text-text text-sm px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-muted/60 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="bg-surface-2 border border-border rounded-lg text-text text-sm px-4 py-3 outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select a subject...</option>
                <option>Job Opportunity</option>
                <option>Freelance Project</option>
                <option>Collaboration</option>
                <option>Just Saying Hi</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted">Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
                className="bg-surface-2 border border-border rounded-lg text-text text-sm px-4 py-3 outline-none focus:border-accent transition-colors resize-none placeholder:text-muted/60 w-full"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`btn-gradient w-full sm:w-auto ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-400"
              >
                ✓ I&apos;ll get back to you within 24 hours!
              </motion.p>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
      </motion.div>
    </section>
  )
}
