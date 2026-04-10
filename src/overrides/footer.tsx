import Link from 'next/link'
import { Bookmark, Compass, Image as ImageIcon, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="mt-16 border-t border-[rgba(44,104,123,0.12)] bg-[linear-gradient(180deg,#fff9f9_0%,#fff2f2_100%)] text-[#24191a]">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div className="pin-surface rounded-[2rem] p-6">
          <div className="pin-badge"><Compass className="h-3.5 w-3.5" />Pinterest-like visual system</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{SITE_CONFIG.name}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#5f4b4d]">A board-driven browsing experience built for image discovery first, creator visibility second, and every remaining route still available when you need it.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Explore</h3>
          <div className="mt-4 grid gap-3">
            <Link href="/image-sharing" className="rounded-[1.4rem] bg-white px-4 py-3 text-sm font-semibold shadow-sm">Image feed</Link>
            <Link href="/profile" className="rounded-[1.4rem] bg-white px-4 py-3 text-sm font-semibold shadow-sm">Profiles</Link>
            <Link href="/articles" className="rounded-[1.4rem] bg-white px-4 py-3 text-sm font-semibold shadow-sm">Articles</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Secondary routes</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { href: '/sbm', label: 'Saved', icon: Bookmark },
              { href: '/listings', label: 'Listings', icon: Compass },
              { href: '/classifieds', label: 'Classifieds', icon: ImageIcon },
              { href: '/contact', label: 'Contact', icon: UserRound },
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
