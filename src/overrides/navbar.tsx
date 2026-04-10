'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Menu, Search, Sparkles, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const primaryLinks = useMemo(
    () => [
      { label: 'Images', href: '/image-sharing' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Articles', href: '/articles' },
      { label: 'Saved', href: '/sbm' },
    ],
    [],
  )

  const moreLinks = useMemo(
    () => [
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'PDF', href: '/pdf' },
      { label: 'Blog', href: '/blog' },
    ],
    [],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(44,104,123,0.12)] bg-[rgba(255,246,246,0.88)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#db1a1a] text-white shadow-[0_10px_20px_rgba(219,26,26,0.22)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#24191a]">{SITE_CONFIG.name}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#2c687b]">Visual discovery boards</p>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
          <Link href="/search" className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 text-sm text-[#5f4b4d] shadow-sm">
            <Search className="h-4 w-4 text-[#db1a1a]" />
            <span className="truncate">Search images, creators, saved boards, and stories</span>
          </Link>
          {primaryLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'rounded-full bg-[#24191a] px-4 py-3 text-sm font-semibold text-white' : 'rounded-full px-4 py-3 text-sm font-semibold text-[#5f4b4d] hover:bg-white hover:text-[#24191a]'}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/create/image" className="pin-button px-4 py-3">Create</Link>
          {isAuthenticated ? <NavbarAuthControls /> : <Link href="/register" className="rounded-full bg-[#2c687b] px-4 py-3 text-sm font-semibold text-white">Join</Link>}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#24191a] md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[rgba(44,104,123,0.12)] bg-[rgba(255,255,255,0.96)] px-4 py-4 md:hidden">
          <div className="mb-4 flex items-center gap-2 rounded-full bg-[#fff6f6] px-4 py-3 text-sm text-[#5f4b4d]">
            <Search className="h-4 w-4 text-[#db1a1a]" />
            Search the visual feed
          </div>
          <div className="grid gap-2">
            {[...primaryLinks, ...moreLinks].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.2rem] bg-[#fff6f6] px-4 py-3 text-sm font-semibold text-[#24191a]">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/create/image" className="pin-button flex-1">Create pin</Link>
            <Link href="/profile" className="pin-button-ghost flex-1 justify-center"><UserRound className="h-4 w-4" />Profile</Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {moreLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full border border-[rgba(44,104,123,0.12)] bg-white px-3 py-2 text-xs font-semibold text-[#2c687b]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
