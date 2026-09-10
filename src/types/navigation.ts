export type Page = 'home' | 'services' | 'about' | 'faq' | 'contact'

export interface NavigationItem {
  label: string
  page: Page
}
