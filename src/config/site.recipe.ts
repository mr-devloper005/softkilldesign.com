import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'visual',
  themePack: 'pinterest-creator',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'compact-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'minimal',
  primaryTask: 'image',
  enabledTasks: ['image', 'listing', 'classified', 'article', 'sbm', 'pdf', 'org', 'social', 'comment', 'profile'],
  taskTemplates: {
    image: 'image-masonry',
    profile: 'profile-creator',
    article: 'article-editorial',
    sbm: 'sbm-library',
    listing: 'listing-showcase',
    classified: 'classified-market',
  },
  manualOverrides: {
    navbar: true,
    footer: true,
    homePage: true,
    taskListPage: true,
    taskDetailPage: true,
    taskCard: true,
    contactPage: true,
    loginPage: true,
    registerPage: true,
  },
}
