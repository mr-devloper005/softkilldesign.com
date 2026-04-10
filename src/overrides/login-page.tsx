import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="pin-surface-strong rounded-[2.4rem] p-7 sm:p-10">
            <div className="pin-badge"><ImageIcon className="h-3.5 w-3.5" />Creator access</div>
            <h1 className="pin-page-title mt-5 max-w-[10ch]">Sign in to keep building your boards.</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5f4b4d]">This login surface stays soft, visual, and creator-friendly instead of dropping into a generic admin shell.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Save new pins', 'Manage profile links', 'Move between visual and article tools'].map((item) => (
                <div key={item} className="pin-stat-tile text-sm font-semibold text-[#24191a]">{item}</div>
              ))}
            </div>
          </div>
          <div className="pin-surface rounded-[2.2rem] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Welcome back</p>
            <form className="mt-6 grid gap-4">
              <input className="pin-input" placeholder="Email address" />
              <input className="pin-input" placeholder="Password" type="password" />
              <button type="submit" className="pin-button h-12 justify-center">Sign in<ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-5 flex items-center justify-between text-sm text-[#5f4b4d]">
              <Link href="/forgot-password" className="hover:text-[#db1a1a]">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#2c687b]"><Sparkles className="h-4 w-4" />Create account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
