import Image from 'next/image'
import Link from 'next/link'

import { type PageProps } from '@/common/types'
import Chart from '@/app/coin/[code]/Chart'

export default async function Page({ params, searchParams }: PageProps) {
  const coinCode = params.code as string
  return (
    <main className="p-4 sm:p-8 md:p-16 lg:p-24">
      <pre className="overflow-x-scroll">{JSON.stringify({ params, searchParams }, null, 2)}</pre>
      <Chart coinCode={coinCode} />
    </main>
  )
}
