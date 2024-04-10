import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'

import {
  CANONICAL_URL,
  APPLICATION_NAME,
  DESCRIPTION,
  APPLICATION_SHORT_NAME,
  AUTHOR,
  KEYWORDS,
  CATEGORY,
  THEME_COLOR,
} from '@/common/constants'
import { type LayoutProps } from '@/common/types'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ReactHotToast from '@/components/ReactHotToast'

import './globals.css'

const myFont = localFont({
  src: './PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: APPLICATION_NAME,
  description: DESCRIPTION,
  applicationName: APPLICATION_SHORT_NAME,
  authors: [{ url: '', name: AUTHOR }],
  generator: null,
  keywords: KEYWORDS,
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL_URL },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: APPLICATION_NAME,
    description: DESCRIPTION,
    type: 'website',
    url: CANONICAL_URL,
    siteName: APPLICATION_NAME,
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/images/og-image.webp', alt: `${APPLICATION_SHORT_NAME} 로고` }],
  },
  appleWebApp: { title: APPLICATION_SHORT_NAME, capable: true, statusBarStyle: 'black' },
  formatDetection: { telephone: true, date: true, address: true, email: true, url: true },
  appLinks: { web: { url: CANONICAL_URL } },
  archives: CANONICAL_URL,
  assets: CANONICAL_URL,
  bookmarks: CANONICAL_URL,
  category: CATEGORY,
  classification: CATEGORY,
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

export async function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }]
}

export default function RootLayout({ children, params }: Readonly<LayoutProps>) {
  return (
    <html lang={params.locale}>
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link color={THEME_COLOR} href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#2b5797" name="msapplication-TileColor" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content={DESCRIPTION} name="subject" />
      <meta content="general" name="rating" />
      <meta content="3 days" name="revisit-after" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="ca-pub-9227501485692453" name="google-adsense-account" />
      <body className={myFont.className}>
        {children}
        <div id="modal-root" />
        <ReactHotToast />
        <SpeedInsights />
      </body>
      <Analytics />
      <GoogleAnalytics />
      <Script
        async
        crossOrigin="anonymous"
        id="google-adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9227501485692453"
        strategy="lazyOnload"
      />
    </html>
  )
}
