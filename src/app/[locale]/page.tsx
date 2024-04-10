import Link from 'next/link'

import { type PageProps } from '@/common/types'

export default function Home({ params }: PageProps) {
  const locale = params.locale
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      <Link className="text-center text-lg" href={`/${locale}/coin/KRW-BTC`}>
        KRW-BTC
      </Link>
    </main>
  )
}
