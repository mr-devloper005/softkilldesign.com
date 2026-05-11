import Link from 'next/link'
import { ArrowRight, Bookmark, Compass, FileText, Image as ImageIcon, LayoutGrid, Tag, UserRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

const taskIcons: Record<TaskKey, any> = {
  listing: Compass,
  article: FileText,
  image: ImageIcon,
  profile: UserRound,
  classified: Tag,
  sbm: Bookmark,
  social: LayoutGrid,
  pdf: FileText,
  org: Compass,
  comment: FileText,
}

const descriptions: Record<TaskKey, string> = {
  image: 'A true pin-wall: taller cards, quicker scanning, and visual rhythm that feels native to image hunting.',
  profile: 'Profiles stay human and identity-led, but still feel visually connected to the image product.',
  article: 'Reading surfaces stay premium, but they sit inside a visually-led product instead of taking over the whole site.',
  listing: 'Listings shift into compact utility cards with quick meta and stronger action cues.',
  classified: 'Classifieds feel faster, tighter, and more deal-oriented than the slower content surfaces.',
  sbm: 'Saved resources look like a design library shelf rather than another repeated post grid.',
  pdf: 'Documents keep a cleaner library presentation with calmer metadata.',
  social: 'Short updates stay available in a lighter board style.',
  org: 'Organization pages remain accessible through cleaner utility framing.',
  comment: 'Comment streams remain connected and browseable without dominating the page.',
}

/** Replaces legacy intro pills (articles, listings, classifieds) with site-wide pages. */
function contentPillLinks(task: TaskKey): { label: string; href: string }[] {
  const aboutHelp = [
    { label: 'About', href: '/about' },
    { label: 'Help', href: '/help' },
  ] as const
  if (task === 'image') {
    return aboutHelp
  }
  if (task === 'profile') {
    return [...aboutHelp, { label: 'Browse image sharing', href: '/image-sharing' }]
  }
  return [...aboutHelp, { label: 'Contact', href: '/contact' }]
}

function introTitle(task: TaskKey) {
  switch (task) {
    case 'image': return 'Image feed built like a living inspiration board.'
    case 'profile': return 'Creators and studios arranged as identity-rich tiles.'
    case 'article': return 'Stories that support the visual feed instead of cloning an editorial template.'
    case 'listing': return 'Utility cards built for scanning and shortlisting.'
    case 'classified': return 'Marketplace-style notices with faster decision cues.'
    case 'sbm': return 'Saved links arranged like shelves and references.'
    case 'pdf': return 'Documents and guides arranged as a compact design library.'
    default: return 'Task surface'
  }
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 30)
  const taskConfig = getTaskConfig(task)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const Icon = taskIcons[task] || LayoutGrid
  const route = taskConfig?.route || '/' + task
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  return (
    <div className="min-h-screen pin-shell text-[#24191a]">
      <NavbarShell />
      <main className="mx-auto max-w-[1500px] px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: taskConfig?.label || task,
            itemListElement: posts.slice(0, 10).map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: baseUrl + route + '/' + post.slug,
              name: post.title,
            })),
          }}
        />

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="pin-badge"><Icon className="h-3.5 w-3.5" />{taskConfig?.label || task}</div>
            <h1 className="pin-page-title mt-5 max-w-[12ch]">{introTitle(task)}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f4b4d]">{descriptions[task]} {intro?.paragraphs?.[0] || ''}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={route} className="pin-button">Browse {taskConfig?.label || task}<ArrowRight className="h-4 w-4" /></Link>
              {task !== 'image' ? <Link href="/image-sharing" className="pin-button-ghost">Back to images</Link> : <Link href="/profile" className="pin-button-ghost">View creators</Link>}
            </div>
          </div>
          <div className="pin-surface rounded-[2rem] p-6">
            <form className="grid gap-4 sm:grid-cols-[1fr_220px_auto] sm:items-end" action={route}>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Search lane</label>
                <input name="q" className="pin-input" placeholder={'Search ' + (taskConfig?.label?.toLowerCase() || task)} />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#2c687b]">Category</label>
                <select name="category" defaultValue={normalizedCategory} className="pin-select">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
              </div>
              <button type="submit" className="pin-button h-12">Apply</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              {contentPillLinks(task).map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[rgba(44,104,123,0.12)] bg-white px-3 py-2 text-xs font-semibold text-[#2c687b]">{link.label}</Link>
              ))}
            </div>
          </div>
        </section>

        {task === 'image' ? (
          <section className="mt-10 pin-surface-strong rounded-[2.2rem] p-5 sm:p-6">
            <div className="pin-board-grid">
              {posts.slice(0, 12).map((post, index) => (
                <div key={post.id ?? post.slug + '-' + index} className="pin-board-item">
                  <Link href={route + '/' + post.slug} className="block overflow-hidden rounded-[1.7rem] bg-white shadow-[0_18px_32px_rgba(44,104,123,0.1)]">
                    <div className="p-4 text-sm font-semibold text-[#24191a]">{post.title}</div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
