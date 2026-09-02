export type Page = 'home' | 'services' | 'tours' | 'about' | 'faq' | 'contact'

export interface NavigationItem {
  label: string
  page: Page
}
