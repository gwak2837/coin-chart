'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

import { NEXT_PUBLIC_GA_ID } from '@/common/constants'

// https://developers.google.com/analytics/devguides/collection/ga4/views?hl=ko&client_type=gtag
export function pageview() {
  window.gtag('config', NEXT_PUBLIC_GA_ID)
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/ga4/event-parameters?hl=ko&client_type=gtag
export function event({ action, category, label, value }: GTagEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

const gaScript = `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${NEXT_PUBLIC_GA_ID}");`

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    window.gtag?.('config', NEXT_PUBLIC_GA_ID)
  }, [pathname])

  return (
    // https://nextjs.org/docs/messages/next-script-for-ga
    NEXT_PUBLIC_GA_ID && (
      <>
        <Script
          async
          id="google-analytics-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {gaScript}
        </Script>
      </>
    )
  )
}
