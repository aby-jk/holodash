import { useState, useEffect, useRef } from 'react'

interface ScrollBarProps {
  scrollRef?: React.RefObject<HTMLDivElement | null>
  value?: number
  className?: string
}

export function ScrollBar({ scrollRef, value, className = '' }: ScrollBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({ width: 100, left: 0 })
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const el = scrollRef?.current
    if (!el) {
      if (value !== undefined) setThumb({ width: Math.min(100, Math.max(0, value)), left: 0 })
      return
    }

    function update() {
      const { clientWidth, scrollWidth, scrollLeft } = el!
      if (scrollWidth <= clientWidth) { setThumb({ width: 100, left: 0 }); return }
      const w = (clientWidth / scrollWidth) * 100
      const l = (scrollLeft / (scrollWidth - clientWidth)) * (100 - w)
      setThumb({ width: w, left: l })
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', update); ro.disconnect() }
  }, [scrollRef, value])

  // Global grabbing cursor while dragging
  useEffect(() => {
    if (dragging) {
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    return () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [dragging])

  function handleThumbMouseDown(e: React.MouseEvent) {
    const el = scrollRef?.current
    const track = trackRef.current
    if (!el || !track) return
    e.preventDefault()

    const startX = e.clientX
    const startScrollLeft = el.scrollLeft
    setDragging(true)

    function onMove(ev: MouseEvent) {
      const dx = ev.clientX - startX
      const trackW = track!.clientWidth
      const thumbW = (el!.clientWidth / el!.scrollWidth) * trackW
      const ratio = (el!.scrollWidth - el!.clientWidth) / (trackW - thumbW)
      el!.scrollLeft = startScrollLeft + dx * ratio
    }

    function onUp() {
      setDragging(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef?.current
    const track = trackRef.current
    if (!el || !track || e.target !== track) return
    const rect = track.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth)
  }

  return (
    <div
      ref={trackRef}
      className={`relative h-1.5 bg-gray-4 rounded-full ${className}`}
      onClick={scrollRef ? handleTrackClick : undefined}
    >
      <div
        className={`absolute top-0 h-full bg-gray-2 rounded-full ${scrollRef ? 'cursor-grab' : ''}`}
        style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
        onMouseDown={scrollRef ? handleThumbMouseDown : undefined}
      />
    </div>
  )
}
