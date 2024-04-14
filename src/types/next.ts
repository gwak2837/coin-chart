import { type ReactNode } from 'react'

import { type Locale } from '@/middleware'

type DefaultParams = {
  locale: Locale
}

export type LayoutProps<T extends Record<string, unknown> = Record<string, string>> = {
  children: ReactNode
  params: T & DefaultParams
}

export type PageProps<T extends Record<string, unknown> = Record<string, string>> = {
  params: T & DefaultParams
  searchParams: Record<string, string | string[] | undefined>
}

export type ErrorProps = {
  error: Error
  reset: () => void
}

export type RouteProps = {
  params: Record<string, string>
}
