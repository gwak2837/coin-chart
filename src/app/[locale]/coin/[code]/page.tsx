import Chart from '@/app/[locale]/coin/[code]/Chart'
import { getDict } from '@/app/[locale]/dict'
import { type PageProps } from '@/common/types'

type Params = {
  code: string
}

export default async function Page({ params, searchParams }: PageProps<Params>) {
  const dict = await getDict(params.locale)
  const coinCode = params.code
  return (
    <main className="p-4 sm:p-8 md:p-16 lg:p-24">
      <pre className="overflow-x-scroll">
        {JSON.stringify({ params, searchParams, dict }, null, 2)}
      </pre>
      <Chart coinCode={coinCode} />
    </main>
  )
}
