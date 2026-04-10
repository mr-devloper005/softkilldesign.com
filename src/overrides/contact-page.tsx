import { Image as ImageIcon, Mail, Sparkles, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  const lanes = [
    { icon: ImageIcon, title: 'Visual partnerships', body: 'Creator collaborations, featured image boards, and showcase opportunities.' },
    { icon: UserRound, title: 'Profile support', body: 'Help with creator pages, visibility, and identity setup across the site.' },
    { icon: Sparkles, title: 'Campaign requests', body: 'Sponsored visual placements, curation requests, and audience growth ideas.' },
  ]

  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="pin-badge"><Mail className="h-3.5 w-3.5" />Contact {SITE_CONFIG.name}</div>
            <h1 className="pin-page-title mt-5 max-w-[10ch]">Support designed for a visual product, not a generic help desk.</h1>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="pin-surface rounded-[1.8rem] p-5">
                  <lane.icon className="h-5 w-5 text-[#db1a1a]" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#5f4b4d]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pin-surface-strong rounded-[2.4rem] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Send a message</p>
            <form className="mt-6 grid gap-4">
              <input className="pin-input" placeholder="Your name" />
              <input className="pin-input" placeholder="Email address" />
              <input className="pin-input" placeholder="What do you need help with?" />
              <textarea className="pin-textarea" placeholder="Tell us about the creator, board, campaign, or visual problem you are solving." />
              <button type="submit" className="pin-button h-12 justify-center">Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
