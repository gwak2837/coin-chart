import Chart from '@/app/[locale]/market/[code]/Chart'
import { getTranslation } from '@/dict'
import { type PageProps } from '@/types/next'
import { type CoinCandle } from '@/types/upbit'

const DEFAULT_CANDLE_TYPE = 'minutes'
const DEFAULT_CANDLE_UNIT = 30
const DEFAULT_CANDLE_COUNT = 200

async function getCandles(
  marketCode: string,
  candleType: string,
  candleUnit: number,
  candleCount: number,
) {
  const response = await fetch(
    `https://api.upbit.com/v1/candles/${candleType}/${candleUnit}?market=${marketCode}&count=${candleCount}`,
    { next: { revalidate: 60 } },
  )
  if (!response.ok) throw new Error('Failed to fetch Upbit candles')

  return (await response.json()) as CoinCandle[]
}

type Params = {
  code: string
}

export default async function Page({ params, searchParams }: PageProps<Params>) {
  const candleType = toString(searchParams.type) || DEFAULT_CANDLE_TYPE
  const candleUnit = toNumber(searchParams.unit) || DEFAULT_CANDLE_UNIT
  const candleCount = toNumber(searchParams.count) || DEFAULT_CANDLE_COUNT
  const candles = await getCandles(params.code, candleType, candleUnit, candleCount)
  const t = await getTranslation(params.locale)
  const coinCode = params.code
  return (
    <main className="mx-auto flex min-h-dvh max-w-screen-2xl flex-col">
      <Chart candles={candles.reverse()} className="flex-grow" coinCode={coinCode} />
      <div className="sticky bottom-0 grid grid-cols-2 gap-4 border-t p-4 pb-8 dark:border-gray-700">
        <button className="rounded-lg bg-rose-500 px-4 py-2 font-medium text-white">{t.buy}</button>
        <button className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white">
          {t.sell}
        </button>
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

function getTimestamp(candleType: string, candleUnit: number): number {
  const now = new Date()
  switch (candleType) {
    case 'minutes':
      return now.setMinutes(now.getMinutes() - candleUnit)
    case 'days':
      return now.setDate(now.getDate() - candleUnit)
    case 'weeks':
      return now.setDate(now.getDate() - candleUnit * 7)
    case 'months':
      return now.setMonth(now.getMonth() - candleUnit)
    default:
      return now.setMinutes(now.getMinutes() - candleUnit)
  }
}
