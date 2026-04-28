'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Bookmark, Globe, Mail, MapPin, Phone, Tag, UserRound, Share2, MessageSquare, Trophy, Star, Award, HelpCircle, FileText, BookOpen, Lightbulb, Video, User, GraduationCap, TrendingUp, Plus, ShieldCheck } from 'lucide-react'
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
import { useState, useEffect } from 'react'

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

export function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [post, setPost] = useState<SitePost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTaskPostBySlug(task, slug)
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [task, slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fbff] text-slate-950">
        <NavbarShell />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  if (!post) notFound()

  const content = getContent(post)
  const taskConfig = getTaskConfig(task)
  const images = getImages(post, content)
  const description = text(content.description) || post.summary || 'Details coming soon.'
  const location = text(content.address) || text(content.location)
  const website = text(content.website)
  const phone = text(content.phone)
  const email = text(content.email)
  const category = text(content.category) || post.tags?.[0] || taskConfig?.label || task
  const url = buildPostUrl(task, post.slug)
  const memberSince = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '2025/10/15'

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'contributions', label: 'Contributions', icon: Trophy },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'endorsements', label: 'Endorsements', icon: ShieldCheck },
  ]

  const contentTypes = [
    { id: 'questions', label: 'Questions', count: 0, icon: HelpCircle },
    { id: 'solutions', label: 'Solutions', count: 0, icon: Lightbulb },
    { id: 'articles', label: 'Articles', count: 0, icon: FileText },
    { id: 'videos', label: 'Videos', count: 0, icon: Video },
    { id: 'tutorials', label: 'Tutorials', count: 0, icon: BookOpen },
    { id: 'posts', label: 'Posts', count: 0, icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: post.title,
            description,
            url,
          }}
        />

        <Link href={taskConfig?.route || '/' + task} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskConfig?.label || task}
        </Link>

        {/* Header Section */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] mb-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-6 flex-1">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-3xl font-bold">{post.title.charAt(0)}</span>
              </div>
              
              {/* Company Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{post.title}</h1>
                <p className="text-sm text-slate-600 mb-3">{category}</p>
                
                <div className="space-y-2 text-sm text-slate-600">
                  {location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                  {website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a href={website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{website}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Member Since: {memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
                <Share2 className="h-5 w-5 text-slate-600" />
              </button>
              <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 text-white font-semibold hover:bg-slate-800 transition-colors">
                <MessageSquare className="h-5 w-5" />
                Message
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-slate-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                      ${isActive 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Left Content Area */}
          <div className="space-y-6">
            {/* Activity Section */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Activity
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Points this month</span>
                  <span className="text-lg font-semibold text-slate-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total points</span>
                  <span className="text-lg font-semibold text-slate-900">0</span>
                </div>
              </div>
              
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Content Types</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {contentTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-slate-500" />
                      <div className="text-left">
                        <span className="text-sm text-slate-700 block">{type.label}</span>
                        <span className="text-xs text-slate-500">{type.count}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Professional Background */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-slate-500" />
                Professional Background
              </h2>
              <p className="text-sm text-slate-600">No Professional Background shown</p>
            </div>

            {/* Education */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-slate-500" />
                Education
              </h2>
              <p className="text-sm text-slate-600">No Education Background shown</p>
            </div>
          </div>

          {/* Right Sidebar - Level Progress */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Level Progress
                </h2>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <Plus className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Current</span>
                  <span className="text-lg font-semibold text-slate-900">Level 0</span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">0 / 2,000 XP</span>
                  <span className="text-xs text-slate-500">2,000 to level up</span>
                </div>
              </div>

              <a href="#" className="mt-4 text-sm text-blue-600 hover:underline block">
                What do levels mean?
              </a>
            </div>

            {/* Images */}
            {images.length > 0 && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Gallery</p>
                <div className="mt-4 overflow-hidden rounded-[1.6rem]">
                  <TaskImageCarousel images={images} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
