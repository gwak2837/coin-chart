'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  coinCode: string
}

export default function Chart({ coinCode }: Props) {
  const [ticker, setTicker] = useState(null)
  const webSocketRef = useRef<WebSocket>()

  useEffect(() => {
    if (!coinCode) return

    webSocketRef.current = new WebSocket('wss://api.upbit.com/websocket/v1')
    webSocketRef.current.onopen = () => {
      webSocketRef.current?.send(
        JSON.stringify([
          { ticket: '667e0e63-9ac6-4538-935d-ebec368b52f3' },
          { type: 'ticker', codes: [coinCode] },
          { format: 'DEFAULT' },
        ]),
      )
    }
    webSocketRef.current.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader()
        reader.onload = () => {
          setTicker(JSON.parse(reader.result as string))
        }
        reader.readAsText(event.data)
      } else {
        setTicker(JSON.parse(event.data))
      }
    }

    return () => {
      webSocketRef.current?.close()
    }
  }, [coinCode])

  return (
    <>
      <pre>{JSON.stringify(ticker, null, 2)}</pre>
    </>
  )
}
