import Link from 'next/link'

import { type PageProps } from '@/common/types'
import { type MarketCode } from '@/types/upbit'

async function getMarketCodes() {
  const response = await fetch('https://api.upbit.com/v1/market/all?isDetails=true')
  if (!response.ok) throw new Error('Failed to fetch Upbit market codes')

  return (await response.json()) as MarketCode[]
}

export default async function Home({ params }: PageProps) {
  const marketCodes = await getMarketCodes()
  const krwMarketCodes = marketCodes.filter((marketCode) => marketCode.market.startsWith('KRW-'))
  const locale = params.locale
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      {krwMarketCodes.map((marketCode) => (
        <Link key={marketCode.market} href={`/${locale}/market/${marketCode.market}`}>
          {locale === 'ko' ? marketCode.korean_name : marketCode.english_name}
        </Link>
      ))}
    </main>
  )
}
