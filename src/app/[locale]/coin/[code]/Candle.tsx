'use client'

import { memo, useRef } from 'react'

interface Props {
  시가: number
  고가: number
  저가: number
  종가: number
  fill?: boolean
  className?: string
}

export default memo(Candle)

function Candle({ 시가, 고가, 저가, 종가, fill, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const minimumRatio = 2 / (ref.current?.clientHeight ?? 1)
  const candleTop = Math.max(시가, 종가)
  const candleBottom = Math.min(시가, 종가)
  const candleHeight = Math.abs(시가 - 종가)
  const candleTranslateY =
    (((고가 + 저가) / 2 - (candleTop + candleBottom) / 2) / (고가 - 저가)) * 100 + '%'
  const candleHeightRatio = candleHeight / (고가 - 저가)
  const candleScaleY = Math.abs(candleHeightRatio) > minimumRatio ? candleHeightRatio : minimumRatio
  const isRising = 종가 >= 시가
  const candleColor = isRising ? 'border-rose-500' : 'border-blue-500'
  const candleBGColor = fill
    ? isRising
      ? 'bg-rose-500'
      : 'bg-blue-500'
    : `border-2 ${candleColor}`
  const wrapperClassName = `relative grid grid-cols-2 ${className}`
  return (
    <div ref={ref} className={wrapperClassName}>
      <div className={`border-r ${candleColor}`} />
      <div className={`border-l ${candleColor}`} />
      <div
        className={`absolute inset-0 z-10 box-border ${candleBGColor}`}
        style={{ transform: `translateY(${candleTranslateY}) scaleY(${candleScaleY})` }}
      />
    </div>
  )
}
