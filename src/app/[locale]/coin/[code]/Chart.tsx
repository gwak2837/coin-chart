'use client'

import { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'

import { type UpbitSocketResponse } from '@/types/upbit'
import { getSocketErrorReason } from '@/utils/socket'

interface Props {
  coinCode: string
  className?: string
}

export default function Chart({ coinCode, className }: Props) {
  const [ticker, setTicker] = useState<UpbitSocketResponse>()
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
          const ticket = JSON.parse(reader.result as string) as UpbitSocketResponse
          setTicker(ticket)
        }
        reader.readAsText(event.data)
      } else {
        setTicker(JSON.parse(event.data as string) as UpbitSocketResponse)
      }
    }
    webSocketRef.current.onclose = (event: CloseEvent) => {
      toast.error(`WebSocket closed: ${getSocketErrorReason(event.code, event.reason)}`)
    }

    return () => {
      webSocketRef.current?.close()
    }
  }, [coinCode])

  return (
    <div className={className}>
      <pre className="overflow-hidden">{JSON.stringify(ticker, null, 2)}</pre>
    </div>
  )
}
