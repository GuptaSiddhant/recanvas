import { useCallback, useEffect, useRef } from "react"

/**
 *
 * @param callback Function that is executed at each animation frame. Can be throttled using `delay` param.
 * @param delayInMs The duration after which the callback is executed.
 */
export function useAnimationFrame(
  callback: (time: number) => void,
  delayInMs: number = 0,
  paused?: boolean,
): void {
  const frameRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const callbackRef = useRef(callback)

  const requestFrame = useCallback(() => {
    frameRef.current = requestAnimationFrame((time) => {
      const delta = time - lastTimeRef.current
      if (delta > delayInMs) {
        lastTimeRef.current = time
        callbackRef.current(time)
      }

      if (!paused) requestFrame()
    })
  }, [delayInMs, paused])

  const cancelFrame = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    requestFrame()

    return () => cancelFrame()
  }, [requestFrame, cancelFrame])
}
