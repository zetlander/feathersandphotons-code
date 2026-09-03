import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Send, CheckCircle2, MessageSquareText, Feather, Telescope } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  if (submitted) {
    return (
      <div className="min-h-screen cosmic-gradient-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif-display font-bold text-slate-100">
            Inquiry Dispatched
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Thank you, {name}. Your inquiry has been transmitted to the photographer. We will be in touch shortly.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700 transition-colors text-xs font-mono-telemetry uppercase tracking-wider"
            >
              Send Another Note
            </button>
            <Link
              to="/feedback"
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              Or browse the public viewer feedback guestbook &rarr;
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-gradient-bg py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-telemetry uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
          <Mail className="w-3.5 h-3.5" />
          Direct Inquiries
        </span>
        <h1 className="font-serif-display text-4xl font-extrabold text-slate-100">
          Contact &amp; Print Acquisitions
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
          For archival print orders, licensing, optical gear consultations, or private gallery inquiries.
        </p>
      </div>

      <div className="rounded-3xl bg-slate-900/85 border border-slate-800 p-8 shadow-2xl">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const formData = new FormData(form)
            fetch('/contact.html', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(
                formData as unknown as Record<string, string>,
              ).toString(),
            }).then(() => setSubmitted(true))
          }}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label
              htmlFor="name"
              className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors"
              placeholder="e.g. Liam Sterling"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors"
              placeholder="liam@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5"
            >
              Inquiry / Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors resize-none leading-relaxed"
              placeholder="Inquire regarding fine-art metallic prints, exhibitions, or optical technique..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-semibold text-xs font-mono-telemetry uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40"
            >
              <Send size={14} />
              <span>Send Direct Inquiry</span>
            </button>

            <Link
              to="/feedback"
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-mono-telemetry"
            >
              <MessageSquareText size={14} />
              <span>View Public Feedback &amp; Guestbook &rarr;</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
