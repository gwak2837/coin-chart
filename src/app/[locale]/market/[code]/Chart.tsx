'use client'

import { useEffect, useState, useRef, type PointerEvent } from 'react'
import toast from 'react-hot-toast'

import Candle, { CandleSkeleton } from '@/app/[locale]/market/[code]/Candle'
import { type CoinCandle, type UpbitSocketSimpleResponse } from '@/types/upbit'
import { getSocketErrorReason } from '@/utils/socket'

interface Props {
  coinCode: string
  className?: string
  candles: CoinCandle[]
}

export default function Chart({ candles, coinCode, className = '' }: Props) {
  const webSocketRef = useRef<WebSocket>()
  const [ticker, setTicker] = useState<UpbitSocketSimpleResponse>()

  const 시가 = ticker?.op
  const 고가 = ticker?.hp
  const 저가 = ticker?.lp
  const 현재가 = ticker?.tp
  const isTicker = 시가 && 고가 && 저가 && 현재가

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

  // --
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pointerMoveYLimitRef = useRef({ top: 0, bottom: 0 })
  const pointerInfoRef = useRef({ startY: 0, isDragging: false, preY: 0 })
  const [barTranslateY, setBarTranslateY] = useState(0)

  useEffect(() => {
    if (!barRef.current || !containerRef.current) return

    pointerMoveYLimitRef.current = {
      top:
        containerRef.current.getBoundingClientRect().top -
        barRef.current.getBoundingClientRect().top,
      bottom:
        containerRef.current.getBoundingClientRect().bottom -
        barRef.current.getBoundingClientRect().bottom,
    }
  }, [])

  function initPointerEvent(event: PointerEvent) {
    const barRect = barRef.current?.getBoundingClientRect()
    if (!barRect || event.clientY < barRect.top || event.clientY > barRect.bottom) return

    pointerInfoRef.current.isDragging = true
    pointerInfoRef.current.startY = event.clientY
  }

  function moveBar(event: PointerEvent) {
    requestAnimationFrame(() => {
      if (!pointerInfoRef.current.isDragging || !barRef.current) return

      const pointerDragYOffset = event.clientY - pointerInfoRef.current.startY
      const translateY = pointerInfoRef.current.preY + pointerDragYOffset
      const max = Math.max(pointerMoveYLimitRef.current.top, translateY)
      const nextTranslateY = Math.min(max, pointerMoveYLimitRef.current.bottom)
      setBarTranslateY(nextTranslateY)
    })
  }

  function cleanPointerEvent() {
    pointerInfoRef.current.isDragging = false
    pointerInfoRef.current.preY = +(barRef.current?.style.translate.slice(3, -2) ?? 0)
  }

  // --
  const chartRef = useRef<HTMLDivElement>(null)
  const chartHeight = chartRef.current?.clientHeight ?? 1
  const scaleY = (chartHeight + barTranslateY) / chartHeight
  const translateY = (barTranslateY / (2 * chartHeight)) * 100 + '%'

  const chart2Ref = useRef<HTMLDivElement>(null)
  const chart2Height = chart2Ref.current?.clientHeight ?? 1
  const scaleY2 = (chart2Height - barTranslateY) / chart2Height
  const translateY2 = (barTranslateY / chart2Height) * 50 + '%'

  return (
    <div
      ref={containerRef}
      className={`grid touch-none grid-rows-[1fr_auto_1fr] ${className}`}
      onPointerCancel={cleanPointerEvent}
      onPointerDown={initPointerEvent}
      onPointerLeave={cleanPointerEvent}
      onPointerMove={moveBar}
      onPointerUp={cleanPointerEvent}
    >
      <div
        ref={chartRef}
        className="no-scrollbar flex gap-2 overflow-x-auto"
        style={{ scale: `1 ${scaleY}`, translate: `0 ${translateY}` }}
      >
        {candles.map((candle) => (
          <Candle
            key={candle.timestamp}
            className="h-full w-20 flex-shrink-0"
            fill
            고가={candle.high_price}
            시가={candle.opening_price}
            저가={candle.low_price}
            종가={candle.trade_price}
          />
        ))}
        {isTicker ? (
          <Candle
            className="h-full w-20 flex-shrink-0"
            fill
            고가={고가}
            시가={시가}
            저가={저가}
            종가={현재가}
          />
        ) : (
          <CandleSkeleton className="w-20 flex-shrink-0" />
        )}
      </div>
      <div
        ref={barRef}
        className="relative z-20 h-3 cursor-row-resize bg-slate-300"
        style={{ translate: `0 ${barTranslateY}px` }}
      />
      <div
        ref={chart2Ref}
        className="no-scrollbar flex gap-2 overflow-x-auto"
        style={{ scale: `1 ${scaleY2}`, translate: `0 ${translateY2}` }}
        // style={{ scale: `1 0.5`, translate: `0 25%` }}
      >
        {candles.map((candle) => (
          <Candle
            key={candle.timestamp}
            className="w-20 flex-shrink-0"
            fill
            고가={candle.high_price}
            시가={candle.opening_price}
            저가={candle.low_price}
            종가={candle.trade_price}
          />
        ))}
        {isTicker ? (
          <Candle
            className="w-20 flex-shrink-0"
            fill
            고가={고가}
            시가={시가}
            저가={저가}
            종가={현재가}
          />
        ) : (
          <CandleSkeleton className="w-20 flex-shrink-0" />
        )}
      </div>
    </div>
  )
}
