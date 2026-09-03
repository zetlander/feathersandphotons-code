import { Link } from '@tanstack/react-router'
import { Feather, Sparkles, Telescope, Heart, MessageSquareText, Camera, ShieldCheck } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-sky-500/30 border border-slate-700 flex items-center justify-center">
                <Feather className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif-display font-bold text-slate-100 text-lg tracking-wider">
                ASTRA &amp; WING
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A dual-domain photographic exploration bridging the microsecond precision of avian wildlife photography with the patient multi-hour photon collection of deep space astrophotography.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono-telemetry text-amber-300/80">
                Avian: 1/4000s High Speed
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono-telemetry text-sky-300/80">
                Astro: 32+ Hr Integration
              </span>
            </div>
          </div>

          {/* Galleries Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-telemetry uppercase tracking-wider text-slate-200">
              Galleries &amp; Sections
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/birds" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <Feather className="w-3.5 h-3.5 text-amber-400" />
                  <span>Avian Wildlife Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/deep-sky" className="hover:text-sky-300 transition-colors flex items-center gap-2">
                  <Telescope className="w-3.5 h-3.5 text-sky-400" />
                  <span>Deep Sky Astrophotography</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Viewer Feedback &amp; Guestbook</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Telemetry & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-telemetry uppercase tracking-wider text-slate-200">
              Equipment &amp; Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ethical wildlife protocol: No baiting, no artificial playback, strictly remote hides. Astrophotography: True narrowband emission spectrum calibration (SHO / LRGB).
            </p>
            <div className="pt-2">
              <Link
                to="/feedback"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                Critique an image or ask gear questions &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Astra &amp; Wing Photographic Archive. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              Built with TanStack Start &amp; Netlify Forms
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
