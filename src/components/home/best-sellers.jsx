"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingBag, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/cart-context"
import { getBestsellerProducts } from "../../data/products"

// Decorative Line Component
const DecorativeLine = ({ symbol }) => (
  <div className="flex items-center justify-center my-3">
    <div className="h-px w-16 bg-gold/70"></div>
    <div className="mx-3 text-gold">{symbol}</div>
    <div className="h-px w-16 bg-gold/70"></div>
  </div>
)

// Featured Product Slider Component
const FeaturedSlider = ({ products, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const totalProducts = products.length
  const autoplayRef = useRef(null)
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  // Setup autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalProducts)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isPaused, totalProducts])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % totalProducts)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const currentProduct = products[currentIndex]

  const handleAddToCart = () => {
    onAddToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: 1,
    })

    // Navigate to cart page after adding item
    navigate("/cart")
  }

  return (
    <div className="relative" ref={sliderRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 border border-gold/30 rounded-full text-gold-dark hover:bg-gold/10 transition-colors shadow-md"
        aria-label="Previous product"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 border border-gold/30 rounded-full text-gold-dark hover:bg-gold/10 transition-colors shadow-md"
        aria-label="Next product"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Content */}
      <div className="relative overflow-hidden bg-white border-2 border-gold/30 shadow-xl">
        {/* Ornate Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-l-3 border-gold/60 z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-3 border-r-3 border-gold/60 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-3 border-l-3 border-gold/60 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-gold/60 z-10 pointer-events-none"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 heritage-pattern opacity-5 pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {/* Product Image */}
            <div className="relative h-[450px] md:h-[600px] overflow-hidden">
              <img
                src={currentProduct?.image || "/placeholder.svg"}
                alt={currentProduct?.name}
                className="w-full h-full object-cover"
              />

              {/* Gold Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

              {/* Bestseller Badge */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gold/90 text-white px-4 py-1.5 text-sm font-bold tracking-wider shadow-md">
                  BESTSELLER
                </div>
              </div>

              {/* Product Name Overlay for Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                <h3 className="font-cinzel text-3xl font-bold text-white drop-shadow-md">{currentProduct?.name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-gold text-2xl font-bold drop-shadow-md">₹{currentProduct?.price}</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-sm font-medium uppercase tracking-wider text-gold-dark">
                  {currentProduct?.category}
                </span>
              </div>

              {/* Product Name - Hidden on Mobile, Shown on Desktop */}
              <h3 className="hidden md:block font-cinzel text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-wide leading-tight">
                {currentProduct?.name}
              </h3>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(currentProduct?.rating || 0) ? "fill-gold text-gold" : "fill-gray-300 text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{currentProduct?.rating}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 font-eb-garamond text-base md:text-lg line-clamp-6">
                {currentProduct?.description}
              </p>

              {/* Price - Hidden on Mobile, Shown on Desktop */}
              <div className="hidden md:flex items-baseline mb-6">
                <span className="text-3xl lg:text-4xl font-cinzel font-bold text-gold-dark">
                  ₹{currentProduct?.price}
                </span>
                <span className="text-sm text-gray-500 ml-2">/{currentProduct?.weight || "500g"}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-gold text-white text-base font-medium hover:bg-gold-dark transition-colors flex items-center justify-center shadow-md"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>

                <Link
                  to={`/products/${currentProduct?.id}`}
                  className="flex-1 py-3 border-2 border-gold text-gold-dark text-base font-medium hover:bg-gold/5 transition-colors flex items-center justify-center shadow-sm"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gold w-8" : "bg-gold/30"
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    // Navigate to cart page after adding item
    navigate("/cart")
  }

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Card Container */}
      <div className="bg-white border border-gold/20 overflow-hidden relative h-full">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          ></div>

          {/* Quick Actions on Hover */}
          <div
            className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="flex space-x-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gold text-white py-2 text-xs font-medium flex items-center justify-center hover:bg-gold-dark transition-colors shadow-md z-20"
              >
                <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                ADD
              </button>

              <Link
                to={`/products/${product.id}`}
                className="flex-1 bg-white text-gold-dark py-2 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-md z-20"
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                VIEW
              </Link>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Product Name */}
          <Link to={`/products/${product.id}`}>
            <h3 className="font-cinzel text-base font-bold text-gray-900 hover:text-gold transition-colors mb-1 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-cinzel font-bold text-gold-dark">₹{product.price}</span>

            <div className="flex items-center">
              <Star className="h-3 w-3 fill-gold text-gold mr-0.5" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section Title Component with Heritage Border
const HeritageSectionTitle = ({ children }) => (
  <div className="text-center relative z-10 mb-16 py-6">
    <div className="inline-block relative px-16 py-8">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
        <div className="h-px w-20 bg-gold/80"></div>
        <div className="mx-3 text-gold">◆</div>
        <div className="h-px w-20 bg-gold/80"></div>
      </div>

      {/* Title Text */}
      <div className="my-6">
        <span className="uppercase text-gold-dark/80 text-sm tracking-[0.3em] font-medium mb-1 block">
          PREMIUM SELECTION
        </span>
        <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 tracking-wide">{children}</h2>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="h-px w-20 bg-gold/80"></div>
        <div className="mx-3 text-gold">★</div>
        <div className="h-px w-20 bg-gold/80"></div>
      </div>
    </div>
  </div>
)

export default function BestSellers() {
  const [products, setProducts] = useState([])
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    // Get 8 bestseller products
    const bestsellerProducts = getBestsellerProducts(8)
    setProducts(bestsellerProducts)
  }, [])

  const handleAddToCart = (product) => {
    addItem(product)
    // We don't navigate here - instead we navigate in the component handlers
  }

  // Get first 4 products for the grid
  const gridProducts = products.slice(0, 4)

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #f8f5f0, #fff8e1, #f8f5f0)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 heritage-pattern opacity-5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 border-t-2 border-l-2 border-gold/20 -z-0"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 border-b-2 border-r-2 border-gold/20 -z-0"></div>

      <div className="container mx-auto px-4">
        {/* Section Header with Heritage Border */}
        <HeritageSectionTitle>Royal Heritage Collection</HeritageSectionTitle>

        {/* Featured Product Slider - Using all 8 products */}
        {products.length > 0 && (
          <div className="mb-16">
            <FeaturedSlider products={products} onAddToCart={handleAddToCart} />
          </div>
        )}

        {/* Divider */}
        <DecorativeLine symbol="✦" />

        {/* More Heritage Products Title */}
        <div className="text-center mb-10">
          <h3 className="font-cinzel text-2xl font-bold text-gray-900">Heritage Treasures</h3>
          <DecorativeLine symbol="•" />
        </div>

        {/* Product Grid - 4 Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* View All Products Button - Fixed z-index */}
        <div className="text-center relative z-40">
          <Link
            to="/products"
            className="inline-block border-2 border-gold text-gold-dark px-8 py-3 font-cinzel text-base font-medium hover:bg-gold/5 transition-colors shadow-sm relative z-40"
          >
            EXPLORE FULL COLLECTION
          </Link>
        </div>
      </div>
    </section>
  )
}

