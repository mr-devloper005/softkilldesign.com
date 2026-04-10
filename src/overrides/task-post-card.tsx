import Link from 'next/link'
import { ArrowUpRight, Bookmark, FileText, Image as ImageIcon, MapPin, Paperclip, Tag, UserRound } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export const TASK_POST_CARD_OVERRIDE_ENABLED = true

type PostContent = Record<string, unknown>

function stripHtml(value?: string | null) {
  return (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(value?: string | null, max = 120) {
  const text = stripHtml(value)
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

function getContent(post: SitePost): PostContent {
  return post.content && typeof post.content === 'object' ? (post.content as PostContent) : {}
}

function getImage(post: SitePost, content: PostContent) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const direct = typeof content.image === 'string' ? content.image : null
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') : null
  const logo = typeof content.logo === 'string' ? content.logo : null
  return mediaUrl || direct || images || logo || '/placeholder.svg?height=900&width=720'
}

function category(post: SitePost, content: PostContent) {
  return (typeof content.category === 'string' && content.category) || post.tags?.[0] || 'Post'
}

function location(content: PostContent) {
  return (typeof content.address === 'string' && content.address) || (typeof content.location === 'string' && content.location) || ''
}

export function TaskPostCardOverride({ post, href, taskKey, compact }: { post: SitePost; href: string; taskKey?: TaskKey; compact?: boolean }) {
  const task = taskKey || 'listing'
  const content = getContent(post)
  const image = getImage(post, content)
  const metaCategory = category(post, content)
  const metaLocation = location(content)
  const summary = excerpt((typeof content.description === 'string' && content.description) || post.summary, compact ? 72 : 132)

  if (task === 'image') {
    return (
      <Link href={href} className="group pin-board-item block overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_35px_rgba(44,104,123,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(44,104,123,0.2)]">
        <div className="relative overflow-hidden rounded-[1.75rem]">
          <ContentImage src={image} alt={post.title} width={900} height={1200} className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 24vw" quality={75} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 text-white opacity-0 transition duration-200 group-hover:opacity-100">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#db1a1a]">Open pin</span>
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="px-3 pb-3 pt-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="pin-badge bg-[#fff6f6] text-[#db1a1a]">Image</span>
            <button type="button" className="rounded-full bg-[#fff6f6] p-2 text-[#db1a1a]" aria-label="Save pin">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#24191a]">{post.title}</h3>
          {summary ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f4b4d]">{summary}</p> : null}
        </div>
      </Link>
    )
  }

  if (task === 'profile') {
    return (
      <Link href={href} className="group flex h-full flex-col rounded-[1.8rem] border border-[rgba(44,104,123,0.12)] bg-white p-4 shadow-[0_16px_32px_rgba(44,104,123,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(44,104,123,0.14)]">
        <div className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,#fff6f6_0%,#e7f4f4_100%)] p-3">
          <ContentImage src={image} alt={post.title} width={640} height={480} className="h-48 w-full rounded-[1.15rem] object-cover" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 320px" quality={75} />
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2c687b]">Creator</div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2c687b] text-white"><UserRound className="h-5 w-5" /></div>
          <div>
            <h3 className="text-lg font-semibold text-[#24191a]">{post.title}</h3>
            <p className="text-sm text-[#5f4b4d]">{metaCategory}</p>
          </div>
        </div>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f4b4d]">{summary}</p> : null}
      </Link>
    )
  }

  if (task === 'article') {
    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-white shadow-[0_22px_50px_rgba(44,104,123,0.1)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(44,104,123,0.14)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <ContentImage src={image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 34vw" quality={75} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#db1a1a]">Article</span>
            <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{metaCategory}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 text-2xl font-semibold tracking-[-0.04em] text-[#24191a]">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5f4b4d]">{summary || 'Open the full story and continue into related ideas from the visual feed.'}</p>
          <div className="mt-auto pt-4 text-sm font-semibold text-[#2c687b]">Read article</div>
        </div>
      </Link>
    )
  }

  if (task === 'listing' || task === 'classified') {
    return (
      <Link href={href} className="group flex h-full flex-col rounded-[1.75rem] border border-[rgba(44,104,123,0.12)] bg-[linear-gradient(180deg,#fffdfb_0%,#fff6f6_100%)] p-5 shadow-[0_18px_36px_rgba(44,104,123,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(44,104,123,0.12)]">
        <div className="flex items-center justify-between gap-3">
          <span className="pin-badge">{task === 'listing' ? 'Listing' : 'Deal'}</span>
          <ArrowUpRight className="h-5 w-5 text-[#2c687b]" />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[#24191a]">{post.title}</h3>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5f4b4d]">{summary}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#2c687b]">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1"><Tag className="h-3.5 w-3.5" />{metaCategory}</span>
          {metaLocation ? <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1"><MapPin className="h-3.5 w-3.5" />{metaLocation}</span> : null}
        </div>
      </Link>
    )
  }

  if (task === 'pdf' || task === 'sbm' || task === 'social' || task === 'comment') {
    return (
      <Link href={href} className="group flex h-full gap-4 rounded-[1.6rem] border border-[rgba(44,104,123,0.12)] bg-white p-5 shadow-[0_14px_30px_rgba(44,104,123,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(44,104,123,0.12)]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f4f4] text-[#2c687b]">
          {task === 'pdf' ? <Paperclip className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#fff6f6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#db1a1a]">{task === 'pdf' ? 'PDF' : task === 'sbm' ? 'Saved link' : 'Update'}</span>
            <span className="text-xs text-[#5f4b4d]">{metaCategory}</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-[#24191a]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5f4b4d]">{summary || 'Open this resource and continue browsing related boards.'}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group flex h-full flex-col gap-4 rounded-[1.75rem] border border-[rgba(44,104,123,0.12)] bg-white p-4 shadow-[0_16px_34px_rgba(44,104,123,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(44,104,123,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
        <ContentImage src={image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw" quality={75} />
      </div>
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs text-[#5f4b4d]">
          <FileText className="h-3.5 w-3.5 text-[#2c687b]" />
          <span>{metaCategory}</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-[#24191a]">{post.title}</h3>
      </div>
    </Link>
  )
}
