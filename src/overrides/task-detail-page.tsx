import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Bookmark, Globe, Mail, MapPin, Phone, Tag, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { TaskImageCarousel } from '@/components/tasks/task-image-carousel'
import { ArticleComments } from '@/components/tasks/article-comments'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

type PostContent = Record<string, unknown>

function getContent(post: SitePost): PostContent {
  return post.content && typeof post.content === 'object' ? (post.content as PostContent) : {}
}

function getImages(post: SitePost, content: PostContent) {
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter(Boolean) : []
  const contentImages = Array.isArray(content.images) ? content.images.filter((item): item is string => typeof item === 'string') : []
  const logo = typeof content.logo === 'string' ? [content.logo] : []
  const merged = [...media, ...contentImages, ...logo].filter((item): item is string => typeof item === 'string' && item.length > 0)
  return merged.length ? merged : ['/placeholder.svg?height=1200&width=900']
}

function text(value: unknown) {
  return typeof value === 'string' ? value : ''
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug).catch(() => null)
  if (!post) notFound()

  const content = getContent(post)
  const taskConfig = getTaskConfig(task)
  const images = getImages(post, content)
  const description = text(content.description) || post.summary || 'Details coming soon.'
  const html = formatRichHtml(text(content.body) || description, 'Details coming soon.')
  const location = text(content.address) || text(content.location)
  const website = text(content.website)
  const phone = text(content.phone)
  const email = text(content.email)
  const category = text(content.category) || post.tags?.[0] || taskConfig?.label || task
  const related = (await fetchTaskPosts(task, 6)).filter((item) => item.slug !== post.slug).slice(0, 3)
  const url = buildPostUrl(task, post.slug)
  const articleDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
  const isArticle = task === 'article'
  const isImage = task === 'image'
  const isProfile = task === 'profile'

  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': isArticle ? 'Article' : 'WebPage',
            headline: post.title,
            description,
            url,
          }}
        />

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="pin-badge"><Tag className="h-3.5 w-3.5" />{category}</div>
            <h1 className="pin-page-title mt-5 max-w-[12ch]">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#2c687b]">
              {location ? <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"><MapPin className="h-4 w-4" />{location}</span> : null}
              {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"><Globe className="h-4 w-4" />Website</a> : null}
              {phone ? <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"><Phone className="h-4 w-4" />{phone}</span> : null}
              {email ? <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"><Mail className="h-4 w-4" />{email}</span> : null}
              {articleDate ? <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">{articleDate}</span> : null}
            </div>
          </div>
          <div className="pin-surface rounded-[2rem] p-4 sm:p-5">
            {isImage ? (
              <TaskImageCarousel images={images} title={post.title} />
            ) : (
              <div className="overflow-hidden rounded-[1.6rem]">
                <TaskImageCarousel images={images} title={post.title} />
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="pin-surface-strong rounded-[2.2rem] p-6 sm:p-8">
            {isProfile ? (
              <div className="mb-8 flex items-center gap-4 rounded-[1.6rem] bg-white p-4 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2c687b] text-white"><UserRound className="h-7 w-7" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Creator surface</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#24191a]">Identity, work, and discoverability in one page.</h2>
                </div>
              </div>
            ) : null}
            <RichContent html={html} className="article-content" />
            {isArticle ? <ArticleComments slug={slug} /> : null}
          </div>

          <aside className="space-y-5">
            <div className="pin-surface rounded-[2rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Keep exploring</p>
              <div className="mt-4 grid gap-3">
                <Link href={taskConfig?.route || '/' + task} className="pin-button justify-center">Back to {taskConfig?.label || task}<ArrowRight className="h-4 w-4" /></Link>
                <Link href="/image-sharing" className="pin-button-ghost justify-center">Image feed</Link>
                <Link href="/profile" className="pin-button-ghost justify-center">Profiles</Link>
              </div>
            </div>
            {related.length ? (
              <div className="space-y-4">
                {related.map((item, index) => (
                  <TaskPostCard key={item.id ?? item.slug + '-' + index} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} compact />
                ))}
              </div>
            ) : null}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
