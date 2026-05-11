import Link from 'next/link'
import { CircleHelp, Compass, Info, Mail, Shield } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="mt-16 border-t border-[rgba(44,104,123,0.12)] bg-[linear-gradient(180deg,#fff9f9_0%,#fff2f2_100%)] text-[#24191a]">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div className="pin-surface rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(44,104,123,0.12)] bg-white">
              <img src="/favicon.png?v=skd2" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
            </div>
            <div className="pin-badge"><Compass className="h-3.5 w-3.5" />Visual system</div>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{SITE_CONFIG.name}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#5f4b4d]">A board-driven browsing experience built for image discovery first, creator visibility second, and every remaining route still available when you need it.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Explore</h3>
          <div className="mt-4 grid gap-3">
            <Link href="/image-sharing" className="rounded-[1.4rem] bg-white px-4 py-3 text-sm font-semibold shadow-sm">Image feed</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Resources</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: '/about', label: 'About', icon: Info },
              { href: '/help', label: 'Help', icon: CircleHelp },
              { href: '/contact', label: 'Contact', icon: Mail },
              { href: '/privacy', label: 'Privacy', icon: Shield },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,104,123,0.12)] bg-white px-4 py-2 text-sm font-semibold text-[#24191a]">
                <item.icon className="h-4 w-4 text-[#db1a1a]" />
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#5f4b4d]">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Built for visual finding audiences.</p>
        </div>
      </div>
    </footer>
  )
}
