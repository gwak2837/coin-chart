import { type Metadata } from 'next'
import { type ReactNode } from 'react'

import {
  APPLICATION_NAME,
  DESCRIPTION,
  CANONICAL_URL,
  APPLICATION_SHORT_NAME,
} from '@/common/constants'
import { type PageProps } from '@/common/types'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
