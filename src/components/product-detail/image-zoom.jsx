"use client"

import { useState, useRef, useEffect } from "react"

export default function ImageZoom({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()

    // Calculate position as percentage
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setPosition({ x, y })
  }

  // Disable zoom on mobile devices
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
      setIsZoomed(false)
    }
  }, [])

  return (
    <div
      ref={imageRef}
      className="w-full h-full cursor-zoom-in relative overflow-hidden rounded-lg border border-gold/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 z-10 pointer-events-none"></div>

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200"
      />

      {isZoomed && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
            backgroundSize: "200%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  )
}

