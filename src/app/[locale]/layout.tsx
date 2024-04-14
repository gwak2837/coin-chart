import { type Metadata } from 'next'

import {
  APPLICATION_NAME,
  DESCRIPTION,
  CANONICAL_URL,
  APPLICATION_SHORT_NAME,
} from '@/common/constants'
import { type LayoutProps } from '@/types/next'

export function generateMetadata({ params }: LayoutProps): Metadata {
  return {
    openGraph: {
      title: APPLICATION_NAME,
      description: DESCRIPTION,
      type: 'website',
      url: CANONICAL_URL,
      siteName: APPLICATION_NAME,
      images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
      locale: params.locale,
    },
  }
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
