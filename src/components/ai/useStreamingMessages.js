import { useState, useRef, useCallback, useEffect } from 'react'

export function useStreamingMessages(messageDefinitions) {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const timerIds = useRef([])

  const clearTimers = useCallback(() => {
    timerIds.current.forEach(clearTimeout)
    timerIds.current = []
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setVisibleMessages([])
    setIsStreaming(false)
  }, [clearTimers])

  const startStreaming = useCallback(() => {
    reset()
    setIsStreaming(true)

    messageDefinitions.forEach((msg, index) => {
      const id = setTimeout(() => {
        setVisibleMessages((prev) => [
          ...prev,
          { key: `stream-${index}`, content: msg.content, role: 'ai' },
        ])
        if (index === messageDefinitions.length - 1) {
          setIsStreaming(false)
        }
      }, msg.delay)
      timerIds.current.push(id)
    })
  }, [messageDefinitions, reset])

  useEffect(() => clearTimers, [clearTimers])

  return { visibleMessages, isStreaming, startStreaming, reset }
}
