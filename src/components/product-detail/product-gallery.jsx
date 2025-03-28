"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown, ZoomIn } from "lucide-react"
import { Button } from "../../components/ui/button"
import RemoteImage from "../ui/remote-image"
import { HeritageCornerDecoration } from "../ui/heritage-decorations"
import { motion, AnimatePresence } from "framer-motion"
import "./gallery-styles.css"

export default function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const imageContainerRef = useRef(null)
  const thumbnailsRef = useRef(null)

  // Ensure we have at least 3 images by duplicating the main image if needed
  const mainImage = product.image || "/placeholder.svg"
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [mainImage, mainImage, mainImage]

  // If we have less than 3 images, duplicate the last one to reach 3
  while (images.length < 3) {
    images.push(images[images.length - 1] || mainImage)
  }

  // Check if we need scroll buttons
  useEffect(() => {
    if (thumbnailsRef.current) {
      const checkScrollable = () => {
        const { scrollHeight, clientHeight } = thumbnailsRef.current
        setShowScrollButtons(scrollHeight > clientHeight)
      }

      checkScrollable()
      window.addEventListener("resize", checkScrollable)

      return () => {
        window.removeEventListener("resize", checkScrollable)
      }
    }
  }, [images])

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !isZoomed) return

    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
  }

  const handleMouseLeave = () => {
    if (isZoomed) setIsZoomed(false)
  }

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === "up" ? -80 : 80
      thumbnailsRef.current.scrollTop += scrollAmount
    }
  }

  return (
    <div className="sticky top-24 z-30">
      <div className="flex flex-row gap-3">
        {/* Vertical Thumbnails Column */}
        <div className="relative flex-shrink-0 w-20">
          {/* Scroll up button - only show if needed */}
          {showScrollButtons && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded-full z-10 shadow-md w-7 h-7"
              onClick={() => scrollThumbnails("up")}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only">Scroll thumbnails up</span>
            </Button>
          )}

          {/* Thumbnails container */}
          <div ref={thumbnailsRef} className="h-[400px] overflow-y-auto scrollbar-thin py-2 px-1 flex flex-col gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === index ? "border-gold shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <RemoteImage
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="h-full w-full object-cover"
                  fallback="/placeholder.svg"
                />
                {activeIndex === index && (
                  <div className="absolute inset-0 border-2 border-gold/30 pointer-events-none"></div>
                )}
              </button>
            ))}
          </div>

          {/* Scroll down button - only show if needed */}
          {showScrollButtons && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded-full z-10 shadow-md w-7 h-7"
              onClick={() => scrollThumbnails("down")}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Scroll thumbnails down</span>
            </Button>
          )}
        </div>

        {/* Main Image with Zoom */}
        <div
          ref={imageContainerRef}
          className={`flex-grow bg-cream rounded-xl overflow-hidden shadow-xl relative border border-gold/20 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={handleZoomToggle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Heritage corner decorations */}
          <HeritageCornerDecoration className="absolute inset-0 pointer-events-none z-20" variant="inner" />

          <div className="relative aspect-square overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {isZoomed ? (
                  <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                      backgroundImage: `url(${images[activeIndex]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "200%",
                    }}
                  />
                ) : (
                  <RemoteImage
                    src={images[activeIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    fallback="/placeholder.svg"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Zoom indicator */}
            <div className="absolute top-4 left-4 bg-white/80 rounded-full p-2 z-50 shadow-md">
              <ZoomIn className="h-4 w-4 text-gold-dark" />
            </div>

            {/* Product badges */}
            {product.tags?.includes("bestseller") && (
              <div className="absolute top-4 right-4 bg-gold/90 text-white px-3 py-1 rounded-full text-sm font-medium z-50">
                Bestseller
              </div>
            )}
            {product.tags?.includes("new") && (
              <div className="absolute top-4 left-12 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-medium z-50">
                New
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom instructions */}
      <p className="text-xs text-center text-muted-foreground mt-2">Click on image to zoom in/out</p>
    </div>
  )
}