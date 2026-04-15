import Link from "next/link";
import { ArrowRight, BookOpen, LifeBuoy, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const guides = [
  {
    icon: Search,
    title: "Search & filters",
    body: "Use the global search bar to jump across boards, creators, and saved references. On list pages, combine the search lane with category filters to narrow results quickly.",
  },
  {
    icon: BookOpen,
    title: "Publishing images",
    body: "Start from the floating create control: choose “Add image” to open the composer, add a cover, summary, and optional gallery URLs. Posts save locally for this demo environment.",
  },
  {
    icon: MessageCircle,
    title: "Profiles & identity",
    body: "Select “Add profile” to publish a creator or studio card. Keep bios concise and link out to portfolios—profiles are designed to complement the visual feed, not replace it.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need an account to browse?",
    a: "No. You can explore the image feed and public profiles freely. Creating posts or saving a session uses the lightweight account flow on this demo site.",
  },
  {
    q: "Where did bookmarks or saved boards go?",
    a: "Saved content still lives under the Saved area of the product. Navigation focuses on Images and Profiles so the interface stays uncluttered—use search if you need a deep link.",
  },
  {
    q: "Is my login stored on this device?",
    a: "Yes. Successful sign-in stores a minimal user record in your browser’s local storage so the session survives refreshes. Sign out clears it from this device.",
  },
  {
    q: "How do I report a problem?",
    a: `Use the Contact page with reproduction steps and screenshots. Messages go to the ${SITE_CONFIG.name} team inbox for triage.`,
  },
  {
    q: "Can I reuse the SKD branding?",
    a: "The on-site monogram and palette are tuned for this product experience. For partnership or press usage, reach out via Contact with your intended context.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <div className="pin-badge">
              <LifeBuoy className="h-3.5 w-3.5" />
              Help center
            </div>
            <h1 className="pin-page-title mt-5 max-w-[12ch]">Answers for every step of the visual workflow.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">
              Whether you are publishing your first board, tuning a creator profile, or looking for policy details, these guides mirror the same calm layout as the homepage—no dense support wiki.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="pin-button">
                Contact support
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/privacy" className="pin-button-ghost">
                Privacy overview
              </Link>
            </div>
          </div>
          <div className="pin-surface rounded-[2.2rem] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#2c687b]" />
              <div>
                <p className="text-sm font-semibold text-[#24191a]">Demo environment</p>
                <p className="mt-2 text-sm leading-7 text-[#5f4b4d]">
                  Some integrations (payments, email delivery) are simulated. If something looks off, include your browser version and the page URL when you write in—we answer fastest with that context.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-3">
          {guides.map((g) => (
            <div key={g.title} className="pin-surface rounded-[2rem] p-6">
              <g.icon className="h-5 w-5 text-[#db1a1a]" />
              <h2 className="mt-4 text-lg font-semibold text-[#24191a]">{g.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f4b4d]">{g.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">FAQ</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#24191a]">Quick questions, straight answers.</h2>
            </div>
          </div>
          <div className="grid gap-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group pin-surface rounded-[1.5rem] px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#24191a]">
                  {item.q}
                  <span className="text-[#db1a1a] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 border-t border-[rgba(44,104,123,0.08)] pt-3 text-sm leading-7 text-[#5f4b4d]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
