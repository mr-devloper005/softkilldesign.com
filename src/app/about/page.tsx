import Link from "next/link";
import { ArrowRight, Heart, Image as ImageIcon, Sparkles, Target, Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const pillars = [
  {
    icon: ImageIcon,
    title: "Image-first discovery",
    body: "The feed is built like a living board: tall cards, strong cover art, and a rhythm that rewards quick scanning before you ever open a detail view.",
  },
  {
    icon: Users,
    title: "Creators in context",
    body: "Profiles sit beside the visual work so people, studios, and brands stay recognizable without turning the site into a directory clone.",
  },
  {
    icon: Heart,
    title: "Calm, intentional UX",
    body: "Soft surfaces, generous spacing, and a consistent red–teal palette keep the experience cohesive from the homepage through every support page.",
  },
];

const milestones = [
  { year: "2024", title: "Foundations", detail: "Defined the pin-board language, typography, and motion rules that still carry every surface today." },
  { year: "2025", title: "Creator beta", detail: "Invited early visual publishers to stress-test uploads, boards, and profile flows on real campaigns." },
  { year: "2026", title: "Public launch", detail: "Opened the experience to wider audiences with search, saved boards, and clearer onboarding paths." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="pin-badge">
              <Sparkles className="h-3.5 w-3.5" />
              About {SITE_CONFIG.name}
            </div>
            <h1 className="pin-page-title mt-5 max-w-[14ch]">A visual studio for ideas worth saving.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">
              {SITE_CONFIG.name} exists so designers, photographers, and small teams can publish beautiful image-led work without fighting a generic CMS skin.
              We bias toward clarity, generous imagery, and flows that feel as considered as the content you post.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/image-sharing" className="pin-button">
                Explore the feed
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="pin-button-ghost">
                Talk with us
              </Link>
            </div>
          </div>
          <div className="pin-surface-strong rounded-[2.4rem] p-6 sm:p-8">
            <div className="flex items-center gap-4 rounded-[1.5rem] border border-[rgba(44,104,123,0.1)] bg-white/90 p-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(44,104,123,0.12)] bg-white">
                <img src="/favicon.png?v=skd2" alt="" width={56} height={56} className="h-12 w-12 object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Mark</p>
                <p className="mt-1 text-lg font-semibold text-[#24191a]">SKD monogram</p>
                <p className="mt-1 text-sm text-[#5f4b4d]">Charcoal wordmark with a warm orange accent—mirrored in buttons, badges, and highlights across the product.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-[linear-gradient(145deg,#fff6f6_0%,#ffffff_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <Target className="h-5 w-5 text-[#db1a1a]" />
                <p className="mt-3 text-2xl font-semibold text-[#24191a]">Purpose-built</p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b4d]">No borrowed marketplace chrome—every screen is tuned for boards, creators, and calm reading.</p>
              </div>
              <div className="rounded-[1.4rem] bg-[linear-gradient(145deg,#f3fbfd_0%,#ffffff_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <Users className="h-5 w-5 text-[#2c687b]" />
                <p className="mt-3 text-2xl font-semibold text-[#24191a]">Human scale</p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b4d]">Built for small teams and solo makers who still want a premium presence on the open web.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <div key={item.title} className="pin-surface rounded-[2rem] p-6">
              <item.icon className="h-5 w-5 text-[#db1a1a]" />
              <h2 className="mt-4 text-xl font-semibold text-[#24191a]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f4b4d]">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="pin-surface rounded-[2.2rem] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">How we work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#24191a]">Principles behind every layout decision.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[#5f4b4d]">
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#db1a1a]" />
                Lead with photography and cover art; typography supports, never competes.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2c687b]" />
                Keep navigation shallow—Images, Profiles, and resources stay one tap away.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#db1a1a]" />
                Respect reader focus: fewer modal walls, more breathable panels and honest copy.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.year} className="pin-surface-strong flex gap-5 rounded-[1.8rem] p-5 sm:p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#24191a] text-sm font-bold text-white">{m.year}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#24191a]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5f4b4d]">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2.4rem] border border-[rgba(44,104,123,0.12)] bg-[linear-gradient(120deg,#fff6f6_0%,#ffffff_45%,#f3fbfd_100%)] p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#24191a]">Ready to see it in motion?</h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[#5f4b4d]">Jump into the image feed, open a creator profile, or send us a note—we read every message that helps sharpen the product.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/help" className="pin-button-ghost">
                Visit help center
              </Link>
              <Link href="/profile" className="pin-button">
                Meet creators
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
