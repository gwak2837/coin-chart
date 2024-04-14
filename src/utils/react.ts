import { useCallback, useRef } from 'react'

export function useThrottle<T>() {
  const isWaiting = useRef(false)
  return useCallback(
    (callback: (e: T) => void, delay: number) => (e: T) => {
      if (isWaiting.current) return
      callback(e)
      isWaiting.current = true
      setTimeout(() => {
        isWaiting.current = false
      }, delay)
    },
    [],
  )
}
