import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  const imagePosts = await fetchTaskPosts('image', 24)

  const leadPins = imagePosts.slice(0, 12)

  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <h1 className="pin-page-title max-w-[16ch]">
              Collect ideas effortlessly and discover what stands out.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5f4b4d]">
              {siteContent.home.metadata.description} The homepage is intentionally image-heavy, so the first scroll feels like a live inspiration board rather than a recycled template.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/image-sharing" className="pin-button">
                Explore images
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="pin-stat-tile">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Primary task</p>
                <p className="mt-2 text-xl font-semibold">Image sharing</p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b4d]">Pins, covers, textures, product shots, and boards stay front-and-center.</p>
              </div>
              <div className="pin-stat-tile">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Discovery</p>
                <p className="mt-2 text-xl font-semibold">Visual-first</p>
                <p className="mt-2 text-sm leading-6 text-[#5f4b4d]">Saved boards and lighter routes stay easy to open when you need them, without pulling focus from the image feed.</p>
              </div>
            </div>
            <form className="pin-surface mt-8 rounded-[2rem] p-4 sm:p-5" action="/search" method="get">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex min-h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-[rgba(44,104,123,0.12)] bg-white px-4 py-2 shadow-sm">
                  <Search className="h-4 w-4 shrink-0 text-[#db1a1a]" aria-hidden />
                  <input
                    type="search"
                    name="q"
                    placeholder="Search boards, shots, moods, creators, and saved references"
                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#24191a] outline-none placeholder:text-[#5f4b4d]"
                    autoComplete="off"
                    enterKeyHint="search"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#db1a1a] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#c41515]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="pin-board-grid">
              {leadPins.map((post, index) => (
                <TaskPostCard key={post.id ?? `${post.slug}-${index}`} post={post} href={`/image-sharing/${post.slug}`} taskKey="image" />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
