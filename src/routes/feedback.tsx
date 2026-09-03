import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { birdPhotos, deepSkyPhotos, initialFeedbackList, ViewerFeedbackItem } from '@/data/photography'
import { 
  MessageSquareText, Star, Send, CheckCircle2, 
  Sparkles, Feather, Telescope, Heart, MessageCircle, 
  Filter, HelpCircle, User, MapPin, Mail, AlertCircle 
} from 'lucide-react'

export const Route = createFileRoute('/feedback')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      photo: typeof search.photo === 'string' ? search.photo : undefined,
    }
  },
  component: FeedbackPage,
})

function FeedbackPage() {
  const { photo: preselectedPhoto } = Route.useSearch()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState<'General' | 'Birds' | 'Deep Sky' | 'Print Inquiry' | 'Technique'>('General')
  const [targetPhoto, setTargetPhoto] = useState(preselectedPhoto || '')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [botField, setBotField] = useState('')

  // UI state
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [feedbackList, setFeedbackList] = useState<ViewerFeedbackItem[]>(initialFeedbackList)
  const [guestbookFilter, setGuestbookFilter] = useState<string>('All')

  // Rating labels
  const ratingLabels: Record<number, string> = {
    1: 'Constructive Critique',
    2: 'Promising Work',
    3: 'Good Capture',
    4: 'Inspiring Portfolio',
    5: 'Exceptional Masterwork',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    // Honeypot check
    if (botField) {
      setSubmitting(false)
      return
    }

    const payload: Record<string, string> = {
      'form-name': 'feedback',
      name,
      email,
      location,
      category,
      targetPhoto: targetPhoto || 'General Portfolio',
      rating: rating.toString(),
      message,
    }

    try {
      await fetch('/feedback.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      })
    } catch (err) {
      // In local preview or offline, continue gracefully
      console.warn('Netlify form submission note:', err)
    }

    // Add to real-time client display
    const newFeedback: ViewerFeedbackItem = {
      id: `fb-${Date.now()}`,
      name: name.trim() || 'Anonymous Visitor',
      location: location.trim() || 'Global Observer',
      date: 'Just now',
      category,
      targetPhoto: targetPhoto ? targetPhoto : undefined,
      rating,
      message,
      verified: true,
    }

    setFeedbackList([newFeedback, ...feedbackList])
    setSubmitting(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setLocation('')
    setMessage('')
    setTargetPhoto('')
    setSubmitted(false)
  }

  const filteredGuestbook = guestbookFilter === 'All'
    ? feedbackList
    : feedbackList.filter(f => f.category === guestbookFilter)

  return (
    <div className="min-h-screen cosmic-gradient-bg py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-8 mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-telemetry uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
          <MessageSquareText className="w-3.5 h-3.5" />
          Viewer Dialogue &amp; Critique Section
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold text-slate-100">
          Viewer Feedback &amp; Guestbook
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
          Art thrives on honest observation. Whether you have technical feedback on optical tracking and exposure, observations on bird behavior, print inquiries, or kind words—your critique is deeply appreciated.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Feedback Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-900/85 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-slate-100">
                  Feedback Received with Gratitude!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-amber-300 font-semibold">{name || 'fellow viewer'}</span>. Your comments have been securely submitted to the photographer via Netlify Forms and added to the community wall below.
                </p>

                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Submit Another Comment or Critique
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot field for spam prevention */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out:
                    <input 
                      name="bot-field" 
                      value={botField} 
                      onChange={(e) => setBotField(e.target.value)} 
                    />
                  </label>
                </p>
                <input type="hidden" name="form-name" value="feedback" />

                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif-display text-xl font-bold text-slate-100">
                      Share Your Thoughts
                    </h2>
                    <p className="text-slate-400 text-xs mt-0.5">
                      All fields except Name &amp; Message are optional.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                {/* Rating Picker */}
                <div>
                  <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-2">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-slate-600 hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              (hoverRating || rating) >= star
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-mono-telemetry text-amber-300/90 pl-2">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* Category & Target Photo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                      Feedback Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/60 transition-colors"
                    >
                      <option value="General">General Portfolio Impression</option>
                      <option value="Birds">Avian Wildlife Photography</option>
                      <option value="Deep Sky">Deep Sky Astrophotography</option>
                      <option value="Technique">Technical / Equipment Inquiries</option>
                      <option value="Print Inquiry">Print / Gallery Acquisition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                      Referenced Plate (Optional)
                    </label>
                    <select
                      value={targetPhoto}
                      onChange={(e) => setTargetPhoto(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/60 transition-colors truncate"
                    >
                      <option value="">General (Whole Portfolio)</option>
                      <optgroup label="Avian Specimens (Birds)">
                        {birdPhotos.map((b) => (
                          <option key={b.id} value={b.title}>
                            {b.title} ({b.species})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Deep Sky Objects (Cosmos)">
                        {deepSkyPhotos.map((d) => (
                          <option key={d.id} value={d.title}>
                            {d.title} ({d.catalogId.split('/')[0]})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Name & Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For reply / print info"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                      City / Country
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Edinburgh, UK"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono-telemetry uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Message / Critique <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your detailed critique on dynamic range, plumage detail, narrowband palette color balance, framing, or ask a question..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs font-mono-telemetry uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-950/40 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting to Netlify Forms...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Feedback &amp; Publish to Guestbook</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

        {/* Right Column: Critique Guide & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Critique Guidelines Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
            <h3 className="font-serif-display text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Photographer Critique Welcome
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Constructive technical feedback helps hone future expeditions and processing sessions. Consider commenting on:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Feather className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Avian Lighting &amp; Timing:</strong> Was the motion frozen appropriately? Does the depth-of-field isolate the subject effectively?</span>
              </li>
              <li className="flex items-start gap-2">
                <Telescope className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Astro Processing:</strong> How is the star profile deconvolution? Is the SHO narrowband palette balanced naturally without star bloating?</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Print Intent:</strong> Would a specific plate translate well to fine art Hahnemühle cotton rag or ChromaLuxe aluminum?</span>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
            <h4 className="text-xs font-mono-telemetry uppercase tracking-wider text-slate-400 mb-4">
              Archive Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-2xl font-serif-display font-bold text-amber-400">8</span>
                <span className="block text-[10px] font-mono-telemetry text-slate-400 uppercase mt-0.5">Avian Plates</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-2xl font-serif-display font-bold text-sky-400">8</span>
                <span className="block text-[10px] font-mono-telemetry text-slate-400 uppercase mt-0.5">Deep Sky Plates</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-2xl font-serif-display font-bold text-slate-200">232h</span>
                <span className="block text-[10px] font-mono-telemetry text-slate-400 uppercase mt-0.5">Total Integration</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-2xl font-serif-display font-bold text-emerald-400">100%</span>
                <span className="block text-[10px] font-mono-telemetry text-slate-400 uppercase mt-0.5">Wild &amp; Ethical</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Community Guestbook / Reviews Wall */}
      <div className="mt-16 pt-12 border-t border-slate-900">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-100">
              Community Guestbook &amp; Reviews
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Reflections, critique, and inquiries shared by viewers and fellow photographers.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Deep Sky', 'Birds', 'Print Inquiry', 'General'].map((filter) => (
              <button
                key={filter}
                onClick={() => setGuestbookFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-telemetry transition-colors ${
                  guestbookFilter === filter
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuestbook.map((fb) => (
            <div
              key={fb.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono-telemetry px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {fb.category}
                  </span>
                </div>

                {fb.targetPhoto && (
                  <div className="text-[11px] font-mono-telemetry text-amber-300/80 truncate">
                    Target: {fb.targetPhoto}
                  </div>
                )}

                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{fb.message}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium text-slate-200">{fb.name}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-600" />
                  <span>{fb.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
