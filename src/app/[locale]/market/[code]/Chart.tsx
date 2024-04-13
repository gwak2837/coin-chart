'use client'

import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'

import Candle, { CandleSkeleton } from '@/app/[locale]/market/[code]/Candle'
import { type CoinCandle, type UpbitSocketSimpleResponse } from '@/types/upbit'
import { getSocketErrorReason } from '@/utils/socket'

interface Props {
  coinCode: string
  className?: string
  candles: CoinCandle[]
}

export default function Chart({ candles, coinCode, className }: Props) {
  const [ticker, setTicker] = useState<UpbitSocketSimpleResponse>()
  const webSocketRef = useRef<WebSocket>()

  useEffect(() => {
    if (!coinCode) return

    webSocketRef.current = new WebSocket('wss://api.upbit.com/websocket/v1')
    webSocketRef.current.onopen = () => {
      webSocketRef.current?.send(
        JSON.stringify([
          { ticket: '667e0e63-9ac6-4538-935d-ebec368b52f3' },
          { type: 'ticker', codes: [coinCode] },
          { format: 'SIMPLE' },
        ]),
      )
    }
    webSocketRef.current.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader()
        reader.onload = () => {
          const ticket = JSON.parse(reader.result as string) as UpbitSocketSimpleResponse
          setTicker(ticket)
        }
        reader.readAsText(event.data)
      } else {
        setTicker(JSON.parse(event.data as string) as UpbitSocketSimpleResponse)
      }
    }
    webSocketRef.current.onclose = (event: CloseEvent) => {
      if (event.code === 1000 || event.code === 1006) return
      toast.error(`WebSocket closed: ${getSocketErrorReason(event.code, event.reason)}`)
    }

    return () => {
      webSocketRef.current?.close()
    }
  }, [coinCode])

  const 시가 = ticker?.op
  const 고가 = ticker?.hp
  const 저가 = ticker?.lp
  const 현재가 = ticker?.tp
  const isTicker = 시가 && 고가 && 저가 && 현재가

  return (
    <div className={className}>
      <div className="flex gap-2 overflow-x-auto">
        {candles.map((candle) => (
          <Candle
            key={candle.timestamp}
            className="h-40 w-20 flex-shrink-0"
            fill
            고가={candle.high_price}
            시가={candle.opening_price}
            저가={candle.low_price}
            종가={candle.trade_price}
          />
        ))}
        {isTicker ? (
          <Candle
            className="h-40 w-20 flex-shrink-0"
            fill
            고가={고가}
            시가={시가}
            저가={저가}
            종가={현재가}
          />
        ) : (
          <CandleSkeleton className="h-40 w-20 flex-shrink-0" />
        )}
      </div>
      <pre className="overflow-hidden">{JSON.stringify(ticker, null, 2)}</pre>
    </div>
  )
}
