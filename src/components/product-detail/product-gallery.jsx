"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import RemoteImage from "../ui/remote-image"

export default function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = product.gallery || [product.image]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="sticky top-24">
      <div className="relative">
        <div className="bg-cream rounded-xl overflow-hidden shadow-xl">
          <div className="relative aspect-square">
            <RemoteImage src={images[activeIndex]} alt={product.name} className="w-full h-full object-cover" />

            {/* Navigation arrows (only if more than one image) */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}

            {/* Product badges */}
            {product.tags?.includes("bestseller") && (
              <div className="absolute top-4 right-4 bg-gold/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                Bestseller
              </div>
            )}
            {product.tags?.includes("new") && (
              <div className="absolute top-4 left-4 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                New
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${
                  activeIndex === index ? "border-gold" : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <RemoteImage
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

