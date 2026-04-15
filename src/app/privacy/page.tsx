import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Eye, Lock, Server, Shield } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const sections: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Eye,
    title: "What we collect",
    body: "Account details you provide (name, email), content you publish (images, text, metadata), and basic technical data such as device type and pages viewed while you use the demo.",
  },
  {
    icon: Server,
    title: "How data is stored",
    body: "Interactive sessions for this build may use browser local storage so you can stay signed in and preview drafts without a remote database on every route.",
  },
  {
    icon: Lock,
    title: "Your controls",
    body: "You can sign out to clear the local session snapshot from this browser, update profile details from account menus where available, and request deletion assistance via the contact form.",
  },
  {
    icon: Shield,
    title: "Security posture",
    body: "We follow standard transport security for production deployments, rotate access keys regularly, and limit staff access to operational data on a need-to-know basis.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="pin-badge">
              <Shield className="h-3.5 w-3.5" />
              Privacy
            </div>
            <h1 className="pin-page-title mt-5 max-w-[12ch]">Transparency for a visual, people-first product.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">
              {SITE_CONFIG.name} is designed for creators who share public work. This policy explains what we collect, why it matters, and how you stay in control—written in the same straightforward tone as the rest of the site.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2c687b]">Last updated: April 15, 2026</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="pin-button">
                Privacy questions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/help" className="pin-button-ghost">
                Back to help
              </Link>
            </div>
          </div>
          <div className="pin-surface-strong rounded-[2.4rem] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[#24191a]">Summary box</h2>
            <p className="mt-3 text-sm leading-7 text-[#5f4b4d]">
              We use your information to operate {SITE_CONFIG.name}, personalize what you see, and keep the community safe. We do not sell personal data. Marketing communications are opt-in where applicable.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#5f4b4d]">
              <li className="flex gap-2">
                <span className="text-[#db1a1a]">•</span>
                Content you publish is treated as public unless explicitly marked otherwise in the feature you use.
              </li>
              <li className="flex gap-2">
                <span className="text-[#db1a1a]">•</span>
                Analytics are used in aggregate to understand which surfaces help creators succeed.
              </li>
              <li className="flex gap-2">
                <span className="text-[#db1a1a]">•</span>
                You may request a copy of personal data or deletion support by emailing through Contact.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title} className="pin-surface rounded-[2rem] p-6 sm:p-7">
              <s.icon className="h-5 w-5 text-[#2c687b]" />
              <h2 className="mt-4 text-xl font-semibold text-[#24191a]">{s.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f4b4d]">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 pin-surface rounded-[2.2rem] p-7 sm:p-9">
          <h2 className="text-2xl font-semibold text-[#24191a]">Cookies & similar tech</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f4b4d]">
            We use cookies for essential authentication, remembering lightweight UI preferences, and measuring product performance. Third-party embeds (for example maps or media players) may set their own cookies when you interact with them—review their policies if you enable those features.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
