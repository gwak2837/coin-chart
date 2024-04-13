'use client'

import { type CSSProperties, memo, useRef } from 'react'

interface Props {
  시가: number
  고가: number
  저가: number
  종가: number
  fill?: boolean
  className?: string
  style?: CSSProperties
  chartScaleX: number
}

export default function Candle({
  시가,
  고가,
  저가,
  종가,
  fill,
  style,
  className = '',
  chartScaleX,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const minimumHeightRatio = 4 / (ref.current?.clientHeight ?? 1000)
  const candleTop = Math.max(시가, 종가)
  const candleBottom = Math.min(시가, 종가)
  const candleHeight = Math.abs(시가 - 종가)
  const candleTranslateY =
    (((고가 + 저가) / 2 - (candleTop + candleBottom) / 2) / (고가 - 저가)) * 100 + '%'
  const candleHeightRatio = candleHeight / (고가 - 저가)
  const candleScaleY =
    Math.abs(candleHeightRatio) > minimumHeightRatio ? candleHeightRatio : minimumHeightRatio
  const isRising = 종가 >= 시가
  const candleColor = isRising ? 'bg-rose-500' : 'bg-blue-500'
  const candleBGColor = fill
    ? isRising
      ? 'bg-rose-500'
      : 'bg-blue-500'
    : `border-2 ${candleColor}`
  const candleWidth = (ref.current?.clientWidth ?? 400) * chartScaleX
  const tailScaleX = 4 / candleWidth
  return (
    <div ref={ref} className={`relative ${className}`} style={style}>
      <div className={`h-full ${candleColor}`} style={{ scale: `${tailScaleX} 1` }} />
      <div
        className={`absolute inset-0 box-border ${candleBGColor}`}
        style={{ transform: `translateY(${candleTranslateY}) scaleY(${candleScaleY})` }}
      />
    </div>
  )
}

interface SkeletonProps {
  className?: string
}

export function CandleSkeleton({ className = '' }: SkeletonProps) {
  const wrapperClassName = `relative grid grid-cols-2 ${className}`
  return (
    <div className={wrapperClassName}>
      <div className="animate-pulse border-r" />
      <div className="animate-pulse border-l" />
      <div className="absolute inset-0 z-10 box-border scale-y-50 animate-pulse bg-slate-200" />
    </div>
  )
}
