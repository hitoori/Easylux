export type Page = 'home' | 'services' | 'about' | 'faq' | 'contact'

export const pagePath = (page: Page) => page === 'home' ? '/' : `/${page}`

export interface NavigationItem {
  label: string
  page: Page
}
