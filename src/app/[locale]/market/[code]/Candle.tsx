'use client'

import { useRef, useEffect } from 'react'

export interface Arguments {
  고가: number
  저가: number
  isIntersecting: boolean
}

interface Props {
  시가: number
  고가: number
  저가: number
  종가: number
  chart고가: number
  chart저가: number
  fill?: boolean
  className?: string
  chartScaleX: number
  onIntersect?: ({ 고가, 저가, isIntersecting }: Arguments) => void
}

export default function Candle({
  시가,
  고가,
  저가,
  종가,
  fill,
  chart고가,
  chart저가,
  className = '',
  chartScaleX,
  onIntersect,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const candleHeightPixel = ref.current?.clientHeight ?? 1000
  const minimumBodyScaleY = 4 / candleHeightPixel
  const bodyTop = Math.max(시가, 종가)
  const bodyBottom = Math.min(시가, 종가)
  const bodyHeight = Math.abs(시가 - 종가)
  const candleHeight = 고가 - 저가
  const bodyTranslateY =
    (((고가 + 저가) / 2 - (bodyTop + bodyBottom) / 2) / candleHeight) * 100 + '%'
  const bodyHeightRatio = bodyHeight / candleHeight
  const bodyScaleY =
    Math.abs(bodyHeightRatio) > minimumBodyScaleY ? bodyHeightRatio : minimumBodyScaleY
  const isRising = 종가 >= 시가
  const candleColor = isRising ? 'bg-rose-500' : 'bg-blue-500'
  const bodyBgColor = fill ? (isRising ? 'bg-rose-500' : 'bg-blue-500') : `border-2 ${candleColor}`
  const candleWidthPixel = (ref.current?.clientWidth ?? 400) * chartScaleX
  const tailScaleX = 4 / candleWidthPixel
  const chartHeight = chart고가 - chart저가
  const candleScaleY = candleHeight / chartHeight
  const candleTranslateY =
    (((chart고가 + chart저가) / 2 - (고가 + 저가) / 2) / chartHeight) * 100 + '%'

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      onIntersect?.({ 고가, 저가, isIntersecting: entries[0].isIntersecting })
    })
    ref.current && observer.observe(ref.current)
    return () => {
      ref.current && observer.unobserve(ref.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ scale: `1 ${candleScaleY}`, translate: `0 ${candleTranslateY}` }}
    >
      <div className={`h-full ${candleColor}`} style={{ scale: `${tailScaleX} 1` }} />
      <div
        className={`absolute inset-0 box-border ${bodyBgColor}`}
        style={{ transform: `translateY(${bodyTranslateY}) scaleY(${bodyScaleY})` }}
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
