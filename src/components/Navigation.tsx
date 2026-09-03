import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Sparkles, Feather, Telescope, MessageSquareText, Menu, X, Camera } from 'lucide-react'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const routerState = useRouterState()
  const pathname = routerState.location.pathname

  const navLinks = [
    {
      to: '/',
      label: 'Overview',
      icon: Sparkles,
      tag: 'Curated',
    },
    {
      to: '/birds',
      label: 'Sonoma County Birds',
      icon: Feather,
      tag: '8 Plates',
      accent: 'text-amber-400',
    },
    {
      to: '/deep-sky',
      label: 'Deep Sky Images',
      icon: Telescope,
      tag: '8 Plates',
      accent: 'text-sky-400',
    },
    {
      to: '/feedback',
      label: 'Viewer Feedback',
      icon: MessageSquareText,
      tag: 'Guestbook',
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-sky-500/20 border border-slate-700/60 p-2.5 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-amber-400/50 transition-colors">
              <Feather className="w-5 h-5 text-amber-400 absolute -top-0.5 -left-0.5 opacity-90 transition-transform group-hover:scale-110" />
              <Sparkles className="w-3.5 h-3.5 text-sky-300 absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>
            <div>
              <div className="font-serif-display text-lg font-bold tracking-wider text-slate-100 flex items-center gap-2">
                <span>DEEP SKY</span>
                <span className="text-amber-400/90">&amp;</span>
                <span>BIRDS</span>
              </div>
              <div className="text-[11px] font-mono-telemetry uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Bird &amp; Deep Sky Archive
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-800/90 text-white shadow-inner border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.accent || 'text-slate-400'} ${isActive ? 'text-amber-300' : ''}`} />
                  <span>{item.label}</span>
                  {item.tag && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono-telemetry ${
                      isActive 
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {item.tag}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-sky-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Action: Quick Feedback CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/feedback"
              className="inline-flex items-center gap-2 text-xs font-mono-telemetry uppercase tracking-wider px-3.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all shadow-sm"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Leave Feedback</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-slate-800 text-amber-300 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${item.accent || 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.tag && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono-telemetry">
                    {item.tag}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
