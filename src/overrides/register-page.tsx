'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in name, email, and password.')
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/image-sharing')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    }
  }

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
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input
                className="pin-input"
                placeholder="Full name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                disabled={isLoading}
              />
              <input
                className="pin-input"
                placeholder="Email address"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={isLoading}
              />
              <input
                className="pin-input"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                disabled={isLoading}
              />
              <input
                className="pin-input"
                placeholder="What kind of visual work do you share?"
                name="focus"
                value={focus}
                onChange={(ev) => setFocus(ev.target.value)}
                disabled={isLoading}
              />
              {error ? <p className="text-sm font-medium text-[#db1a1a]">{error}</p> : null}
              <button type="submit" className="pin-button h-12 justify-center" disabled={isLoading}>
                {isLoading ? 'Creating…' : 'Create account'}
                {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>
            <div className="mt-5 text-sm text-[#5f4b4d]">Already have an account? <Link href="/login" className="font-semibold text-[#2c687b]">Sign in</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
