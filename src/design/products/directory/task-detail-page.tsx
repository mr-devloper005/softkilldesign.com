'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Share2, MessageSquare, Trophy, Star, Award, HelpCircle, FileText, BookOpen, Lightbulb, Video, User, GraduationCap, TrendingUp, Plus } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState } from 'react'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const [activeTab, setActiveTab] = useState('overview')
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

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

  const memberSince = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '2025/10/15'

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
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
                <p className="text-sm text-slate-600 mb-3">{category || taskLabel}</p>
                
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

            {/* Map */}
            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </div>

        {/* Related Listings */}
        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
