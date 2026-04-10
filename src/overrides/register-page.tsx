import Link from 'next/link'
import { ArrowRight, Sparkles, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1300px] px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="pin-surface rounded-[2.2rem] p-7 sm:p-8">
            <div className="pin-badge"><UserRound className="h-3.5 w-3.5" />Profile-led onboarding</div>
            <h1 className="pin-page-title mt-5 max-w-[10ch]">Create your profile and start publishing visual work.</h1>
            <p className="mt-5 text-base leading-8 text-[#5f4b4d]">The account flow is designed for creators first: profile, visual posting, and lightweight discovery in one place.</p>
          </div>
          <div className="pin-surface-strong rounded-[2.4rem] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Join the platform</p>
            <form className="mt-6 grid gap-4">
              <input className="pin-input" placeholder="Full name" />
              <input className="pin-input" placeholder="Email address" />
              <input className="pin-input" placeholder="Password" type="password" />
              <input className="pin-input" placeholder="What kind of visual work do you share?" />
              <button type="submit" className="pin-button h-12 justify-center">Create account<ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-5 text-sm text-[#5f4b4d]">Already have an account? <Link href="/login" className="font-semibold text-[#2c687b]">Sign in</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
