export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'softkilldesign',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Soft Kill Design',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Visual discovery boards',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A Pinterest-style image sharing site for saving ideas, exploring visual posts, and building collections through a fast, scrollable masonry feed.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'softkilldesign.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://softkilldesign.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

