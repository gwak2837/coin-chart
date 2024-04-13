import Chart from '@/app/[locale]/market/[code]/Chart'
import { type PageProps } from '@/common/types'
import { getTranslation } from '@/dict'
import { type CoinCandle } from '@/types/upbit'

const DEFAULT_CANDLE_TYPE = 'minutes'
const DEFAULT_CANDLE_UNIT = 30

async function getCandles(marketCode: string, candleType: string, candleUnit = 1) {
  const response = await fetch(
    `https://api.upbit.com/v1/candles/${candleType}/${candleUnit}?market=${marketCode}&count=200`,
  )
  if (!response.ok) throw new Error('Failed to fetch Upbit candles')

  return (await response.json()) as CoinCandle[]
}

type Params = {
  code: string
}

export default async function Page({ params, searchParams }: PageProps<Params>) {
  const candleType = toString(searchParams.candleType) || DEFAULT_CANDLE_TYPE
  const candleUnit = toNumber(searchParams.candleUnit) || DEFAULT_CANDLE_UNIT
  const candles = await getCandles(params.code, candleType, candleUnit)
  console.log('👀 - candles:', candles)
  const t = await getTranslation(params.locale)
  const coinCode = params.code
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-2xl flex-col bg-slate-50">
      <Chart candles={candles} className="flex-grow" coinCode={coinCode} />
      <div className="grid grid-cols-2 gap-4 bg-white p-4 pb-6">
        <button className="rounded-lg bg-rose-500 px-4 py-2 text-white">{t.buy}</button>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">{t.sell}</button>
      </div>
    </main>
  )
}

function toString(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] : value || ''
}

function toNumber(value: string | string[] | undefined): number {
  const parsed = parseInt(toString(value), 10)
  return isNaN(parsed) ? 0 : parsed
}