import Link from 'next/link'
import { ArrowRight, Clock, Image as ImageIcon, Mail, MapPin, MessageSquare, Sparkles, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    icon: ImageIcon,
    title: 'Visual & board partnerships',
    body: 'Sponsorships, curated takeovers, and co-designed drops that keep imagery at the center of the story.',
  },
  {
    icon: UserRound,
    title: 'Creator & studio support',
    body: 'Profile verification questions, portfolio imports, and guidance on how to present teams alongside their boards.',
  },
  {
    icon: Sparkles,
    title: 'Press & brand inquiries',
    body: 'Logos, screenshots, product facts, and speaking opportunities for teams covering design-led tooling.',
  },
]

const hours = [
  { day: 'Mon–Thu', time: '9:00–18:00 local' },
  { day: 'Fri', time: '9:00–15:00 local' },
  { day: 'Weekend', time: 'Async email only' },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="pin-badge">
              <Mail className="h-3.5 w-3.5" />
              Contact {SITE_CONFIG.name}
            </div>
            <h1 className="pin-page-title mt-5 max-w-[12ch]">Tell us what you are building—we reply with context, not scripts.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">
              Share the board, campaign, or profile you are working on. We route messages to the right teammate so you get a thoughtful answer instead of a ticket number.
            </p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="pin-surface rounded-[1.9rem] p-5 sm:p-6">
                  <lane.icon className="h-5 w-5 text-[#db1a1a]" />
                  <h2 className="mt-3 text-xl font-semibold text-[#24191a]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#5f4b4d]">{lane.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="pin-surface-strong flex gap-3 rounded-[1.6rem] p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#2c687b]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2c687b]">Studio</p>
                  <p className="mt-1 text-sm font-medium text-[#24191a]">Remote-first team</p>
                  <p className="mt-1 text-sm text-[#5f4b4d]">We collaborate across time zones and meet in person for creative reviews when projects need it.</p>
                </div>
              </div>
              <div className="pin-surface-strong flex gap-3 rounded-[1.6rem] p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#2c687b]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2c687b]">Response windows</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#5f4b4d]">
                    {hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4 border-b border-[rgba(44,104,123,0.08)] pb-1.5 last:border-0 last:pb-0">
                        <span className="font-medium text-[#24191a]">{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="pin-surface-strong rounded-[2.4rem] p-7 sm:p-9">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">
              <MessageSquare className="h-4 w-4" />
              Send a message
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5f4b4d]">Include links to boards or profiles when relevant—we review the same surfaces you see in the product.</p>
            <form className="mt-6 grid gap-4">
              <input className="pin-input" placeholder="Your name" name="name" autoComplete="name" />
              <input className="pin-input" placeholder="Email address" name="email" type="email" autoComplete="email" />
              <input className="pin-input" placeholder="Topic (e.g., partnership, bug, press)" name="topic" />
              <textarea className="pin-textarea min-h-[160px]" placeholder="Tell us what you need, timelines, and anything you already tried." name="message" />
              <button type="submit" className="pin-button h-12 justify-center">
                Send message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-[#5f4b4d]">
              Prefer self-serve?{' '}
              <Link href="/help" className="font-semibold text-[#2c687b] underline-offset-4 hover:underline">
                Browse the help center
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
