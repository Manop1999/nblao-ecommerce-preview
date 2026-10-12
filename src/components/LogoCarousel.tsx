import { useEffect, useRef, useState } from 'react'

export interface LogoCarouselItem {
  id: string
  name: string
  logo: string
  url?: string
}

interface LogoCarouselProps {
  items: LogoCarouselItem[]
  variant?: 'brand' | 'business'
  ariaLabel: string
}

export function LogoGrid({ items, ariaLabel }: Pick<LogoCarouselProps, 'items' | 'ariaLabel'>) {
  return (
    <div className="partner-logo-grid" aria-label={ariaLabel}>
      {items.map(item => (
        <div className="partner-logo-grid-item" key={item.id}>
          {item.url ? <a href={item.url} target="_blank" rel="noreferrer" aria-label={item.name}><img src={item.logo} alt={item.name} /></a> : <img src={item.logo} alt={item.name} />}
        </div>
      ))}
    </div>
  )
}

export default function LogoCarousel({ items, variant = 'brand', ariaLabel }: LogoCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const [copies, setCopies] = useState(3)
  const itemsKey = items.map(item => `${item.id}:${item.logo}:${item.url || ''}`).join('|')

  useEffect(() => {
    const viewport = viewportRef.current
    const sequence = sequenceRef.current
    if (!viewport || !sequence || items.length === 0) return

    const updateCopies = () => {
      // offsetWidth is independent of the track transform, unlike a bounding
      // rectangle, and keeps the repeat distance stable while the track moves.
      const width = sequence.offsetWidth
      if (!width) return
      const nextCopies = Math.max(3, Math.ceil(viewport.clientWidth / width) + 2)
      setCopies(current => current === nextCopies ? current : nextCopies)
      offsetRef.current %= width
    }

    const observer = new ResizeObserver(updateCopies)
    observer.observe(viewport)
    observer.observe(sequence)
    updateCopies()
    return () => observer.disconnect()
  }, [itemsKey])

  useEffect(() => {
    const sequence = sequenceRef.current
    const track = trackRef.current
    if (!sequence || !track || items.length === 0) return

    const speed = variant === 'brand' ? 48 : 42
    let frame = 0
    let previous = performance.now()

    const render = (time: number) => {
      const width = sequence.offsetWidth
      if (width) {
        offsetRef.current += (speed * (time - previous)) / 1000
        offsetRef.current = ((offsetRef.current % width) + width) % width
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      previous = time
      frame = requestAnimationFrame(render)
    }

    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [itemsKey, variant])

  if (items.length === 0) return null

  const renderSequence = (copy: number) => (
    <div ref={copy === 0 ? sequenceRef : undefined} className="logo-carousel-sequence" key={copy} aria-hidden={copy > 0 || undefined}>
      {items.map(item => {
        const logo = <img className="logo-carousel-logo" src={item.logo} alt={copy ? '' : item.name} draggable={false} />
        return (
          <div className="logo-carousel-item" key={`${copy}-${item.id}`}>
            {item.url ? <a href={item.url} target="_blank" rel="noreferrer" aria-label={item.name}>{logo}</a> : logo}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className={`logo-carousel logo-carousel--${variant}`} aria-label={ariaLabel}>
      <div ref={viewportRef} className="logo-carousel-viewport">
        <div ref={trackRef} className="logo-carousel-track">
          {Array.from({ length: copies }, (_, copy) => renderSequence(copy))}
        </div>
      </div>
    </div>
  )
}
