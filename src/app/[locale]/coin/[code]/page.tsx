import Chart from '@/app/[locale]/coin/[code]/Chart'
import { type PageProps } from '@/common/types'
import { getTranslation } from '@/dict'

type Params = {
  code: string
}

export default async function Page({ params, searchParams }: PageProps<Params>) {
  const t = await getTranslation(params.locale)
  const coinCode = params.code
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-2xl flex-col bg-slate-50">
      <Chart className="flex-grow" coinCode={coinCode} />
      <div className="grid grid-cols-2 gap-4 bg-white p-4 pb-6">
        <button className="rounded-lg bg-rose-500 px-4 py-2 text-white">{t.buy}</button>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">{t.sell}</button>
      </div>
    </main>
  )
}
