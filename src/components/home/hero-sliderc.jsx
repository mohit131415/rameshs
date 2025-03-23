"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

// Updated slider data focusing on Sindhi sweets and Indian specialties
const sliderData = [
  {
    id: 1,
    title: "Authentic Sindhi Sweets",
    subtitle: "HERITAGE & TRADITION",
    description: "Experience the rich flavors of traditional Sindhi delicacies crafted with age-old family recipes",
    image: "/sweets_images/kajukatli.webp",
    featuredImage1: "/sweets_images/kajukatli.webp",
    featuredImage2: "/sweets_images/RajwadiPedha.webp",
    link: "/products?category=sindhi-special",
  },
  {
    id: 2,
    title: "Singhar Ji Mithai",
    subtitle: "SINDHI SPECIALTY",
    description: "Our signature Singhar Ji Mithai, a Sindhi delicacy made with semolina, ghee, and cardamom",
    image: "/sweets_images/rasgulla.jpg",
    featuredImage1: "/sweets_images/rasgulla.jpg",
    featuredImage2: "/sweets_images/chamcham.jpg",
    link: "/products?category=sindhi-special",
  },
  {
    id: 3,
    title: "Thadal & Lola",
    subtitle: "SINDHI TREASURES",
    description:
      "Discover the unique taste of Thadal and Lola, beloved Sindhi sweets made with pure ghee and dry fruits",
    image: "/sweets_images/gulab_jamun.jpg",
    featuredImage1: "/sweets_images/gulab_jamun.jpg",
    featuredImage2: "/sweets_images/JILEBI.webp",
    link: "/products?category=sindhi-special",
  },
  {
    id: 4,
    title: "Sata & Pragree",
    subtitle: "SINDHI DELICACIES",
    description: "Indulge in the flaky layers of Sata and the sweet filling of Pragree, traditional Sindhi favorites",
    image: "/sweets_images/rasmalai.jpg",
    featuredImage1: "/sweets_images/rasmalai.jpg",
    featuredImage2: "/sweets_images/MILKCAKE.webp",
    link: "/products?category=sindhi-special",
  },
  {
    id: 5,
    title: "Festival Special Collection",
    subtitle: "CELEBRATION ESSENTIALS",
    description: "Special Sindhi and Indian sweets prepared for festivals like Diwali, Holi, and Raksha Bandhan",
    image: "/sweets_images/Motichoor_Laddoo.webp",
    featuredImage1: "/sweets_images/Motichoor_Laddoo.webp",
    featuredImage2: "/sweets_images/Shrikhand.webp",
    link: "/products?category=festival",
  },
  {
    id: 6,
    title: "North Indian Classics",
    subtitle: "TIMELESS FAVORITES",
    description: "Beloved North Indian sweets including Gulab Jamun, Jalebi, and Rasgulla made with authentic recipes",
    image: "/sweets_images/MoongdalHalwa.webp",
    featuredImage1: "/sweets_images/MoongdalHalwa.webp",
    featuredImage2: "/sweets_images/MODAK.webp",
    link: "/products?category=north-indian",
  },
  {
    id: 7,
    title: "Premium Gift Boxes",
    subtitle: "PERFECT PRESENTATIONS",
    description: "Exquisite assortments of Sindhi and Indian sweets in elegant packaging for special occasions",
    image: "/sweets_images/MangoMilkBarfi.webp",
    featuredImage1: "/sweets_images/MangoMilkBarfi.webp",
    featuredImage2: "/sweets_images/Basundi.webp",
    link: "/products?category=gift-boxes",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState("next")
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [initialLoad, setInitialLoad] = useState(true)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      const x = (window.innerWidth / 2 - e.clientX) * 0.02
      const y = (window.innerHeight / 2 - e.clientY) * 0.02
      setMousePosition({ x, y })
    }

    // Set initial viewport height
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Initial load animation
  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        setInitialLoad(false)
      }, 1000)
    }
  }, [initialLoad])

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide()
    }, 7000)
    return () => clearInterval(interval)
  }, [currentSlide, isAnimating])

  const goToNextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setPrevSlideIndex(currentSlide)
    setDirection("next")
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 2000) // Extended transition time
  }

  const goToPrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setPrevSlideIndex(currentSlide)
    setDirection("prev")
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 2000) // Extended transition time
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setPrevSlideIndex(currentSlide)
    setDirection(index > currentSlide ? "next" : "prev")
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 2000) // Extended transition time
  }

  // Dynamic Depth Parallax Effect
  // Calculate parallax transform based on scroll position and element depth
  const getParallaxTransform = (depth = 0.15) => {
    // Ensure we don't apply parallax beyond the section's visibility
    const sectionHeight = viewportHeight
    const scrollProgress = Math.min(scrollY / sectionHeight, 1)

    // Apply transform based on depth factor (higher depth = slower movement)
    return `translateY(${scrollProgress * sectionHeight * depth}px)`
  }

  // Mouse parallax effect
  const getMouseParallax = (depth = 1) => {
    return {
      transform: `translate(${mousePosition.x * depth}px, ${mousePosition.y * depth}px)`,
      transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
    }
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Black overlay for the entire section - increased opacity */}
      <div className="absolute inset-0 bg-black/60 z-5"></div>

      {/* Background Images with Dynamic Depth Parallax */}
      <div className="absolute inset-0">
        {sliderData.map((slide, index) => {
          const isActive = currentSlide === index
          const isPrev = prevSlideIndex === index
          const slideDirection = direction === "next" ? 1 : -1

          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-all duration-[2500ms] ease-in-out"
              style={{
                opacity: isActive ? 1 : isPrev ? 0 : 0,
                transform: `
                  ${getParallaxTransform(0.05)} 
                  scale(${isActive ? 1.05 : isPrev ? (1.1 + slideDirection * 0.05) : 1})
                  ${isPrev ? `translateX(${slideDirection * 5}%)` : ""}
                `,
                transition:
                  "opacity 2500ms cubic-bezier(0.4, 0, 0.2, 1), transform 8000ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/* Background Image */}
              <img
                src={slide.image || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover object-center"
                style={{
                  filter: "brightness(0.5) contrast(1.1)", // Darker overlay
                  transition: "transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />

              {/* Warm overlay gradient with increased black */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-amber-900/20 to-black/70"></div>
            </div>
          )
        })}
      </div>

      {/* Heritage Border Frame - NO PARALLAX */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-8 border border-gold/40"></div>
        <div className="absolute inset-10 border border-gold/30"></div>

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold"></div>

        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-gold/80 transform translate-x-[-8px] translate-y-[-8px]"></div>
        <div className="absolute top-8 right-8 w-4 h-4 bg-gold/80 transform translate-x-[8px] translate-y-[-8px]"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-gold/80 transform translate-x-[-8px] translate-y-[8px]"></div>
        <div className="absolute bottom-8 right-8 w-4 h-4 bg-gold/80 transform translate-x-[8px] translate-y-[8px]"></div>
      </div>

      {/* Main Content Layout with Parallax */}
      <div
        className="relative h-full z-20 flex items-center"
        style={{
          transform: getParallaxTransform(0.15), // Content moves at medium speed
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content Column */}
            <div className="text-center lg:text-left relative h-[500px]">
              {sliderData.map((slide, index) => {
                // Determine if this slide is active, entering, or exiting
                const isActive = currentSlide === index
                const isPrev = prevSlideIndex === index && isAnimating
                const slideDirection = direction === "next" ? 1 : -1

                return (
                  <div
                    key={slide.id}
                    className="absolute inset-0 transition-all duration-[2000ms] ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isPrev
                        ? `translateX(${-slideDirection * 50}px)`
                        : isActive
                          ? "translateX(0)"
                          : `translateX(${slideDirection * 50}px)`,
                      ...getMouseParallax(0.5), // Subtle mouse parallax for content
                    }}
                  >
                    {/* Subtitle with ornamental elements */}
                    <div
                      className="mb-4 transition-all duration-[1200ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(20px)",
                        transitionDelay: isActive ? "200ms" : "0ms",
                      }}
                    >
                      <div className="inline-flex items-center">
                        <div className="h-px w-8 bg-gold"></div>
                        <div className="px-3">
                          <div className="w-2 h-2 rotate-45 bg-gold"></div>
                        </div>
                        <div className="h-px w-8 bg-gold"></div>
                      </div>
                      <p className="font-cinzel text-gold tracking-widest text-sm mt-3">{slide.subtitle}</p>
                    </div>

                    {/* Main Title with heritage styling */}
                    <h1
                      className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight transition-all duration-[1200ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(30px)",
                        transitionDelay: isActive ? "400ms" : "0ms",
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Ornamental divider */}
                    <div
                      className="flex items-center mb-6 lg:justify-start justify-center transition-all duration-[1200ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0) scaleX(1)" : "translateY(20px) scaleX(0.8)",
                        transitionDelay: isActive ? "600ms" : "0ms",
                      }}
                    >
                      <div className="h-px w-12 bg-gold/70"></div>
                      <div className="mx-3 relative">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17.5L5.5 22L8 14.5L2 9.5H9.5L12 2Z"
                            fill="#D4B86A"
                            fillOpacity="0.7"
                          />
                        </svg>
                      </div>
                      <div className="h-px w-12 bg-gold/70"></div>
                    </div>

                    {/* Description */}
                    <p
                      className="font-eb-garamond text-lg text-white/90 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 transition-all duration-[1200ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(40px)",
                        transitionDelay: isActive ? "800ms" : "0ms",
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* Completely Redesigned Luxury Discover Button */}
                    <div
                      className="transition-all duration-[1200ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(50px)",
                        transitionDelay: isActive ? "1000ms" : "0ms",
                      }}
                    >
                      <Link to={slide.link} className="inline-block relative overflow-hidden group">
                        {/* Main button container */}
                        <div className="relative px-12 py-4 border-2 border-gold text-gold font-cinzel tracking-wider uppercase shadow-xl overflow-hidden transition-all duration-700 group-hover:text-black group-hover:shadow-gold/30 group-hover:shadow-2xl">
                          {/* Button text */}
                          <span className="relative z-20 font-medium text-base transition-all duration-700 ease-out group-hover:tracking-widest">
                            Discover
                          </span>

                          {/* Gold fill background */}
                          <span className="absolute inset-0 z-10 bg-gradient-to-r from-gold/80 via-gold to-gold/80 transform origin-left transition-transform duration-700 ease-out scale-x-0 group-hover:scale-x-100"></span>

                          {/* Animated border gradient */}
                          <span className="absolute inset-0 z-0 border border-gold/50 opacity-0 group-hover:opacity-100 transition-all duration-700"></span>

                          {/* Animated corner accents */}
                          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/0 group-hover:border-gold transition-all duration-500 group-hover:w-8 group-hover:h-8 z-20"></span>
                          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/0 group-hover:border-gold transition-all duration-500 group-hover:w-8 group-hover:h-8 z-20"></span>
                          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/0 group-hover:border-gold transition-all duration-500 group-hover:w-8 group-hover:h-8 z-20"></span>
                          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/0 group-hover:border-gold transition-all duration-500 group-hover:w-8 group-hover:h-8 z-20"></span>
                        </div>

                        {/* Outer glow effect */}
                        <div className="absolute inset-0 -m-1 rounded-sm opacity-0 group-hover:opacity-100 bg-gold/0 group-hover:bg-gold/20 blur-md transition-all duration-700 scale-105 group-hover:scale-110"></div>

                        {/* Animated shine effect */}
                        <div className="absolute inset-0 z-30 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                        </div>

                        {/* Animated particles */}
                        <div className="absolute inset-0 z-30 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full bg-gold/80"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0,
                                transform: "scale(0)",
                                animation: `particleAnimation ${1 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s infinite`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Featured Images Column with enhanced parallax */}
            <div
              className="hidden lg:block relative h-[500px]"
              style={getMouseParallax(0.8)} // Stronger mouse parallax for images
            >
              {sliderData.map((slide, index) => {
                const isActive = currentSlide === index
                const isPrev = prevSlideIndex === index && isAnimating
                const slideDirection = direction === "next" ? 1 : -1

                return (
                  <div
                    key={`images-${slide.id}`}
                    className="absolute inset-0 transition-all duration-[2000ms] ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isPrev
                        ? `translateX(${slideDirection * 50}px)`
                        : isActive
                          ? "translateX(0)"
                          : `translateX(${-slideDirection * 50}px)`,
                    }}
                  >
                    {/* Heritage frame for images */}
                    <div className="absolute inset-0 border border-gold/20"></div>

                    {/* First Featured Image with parallax */}
                    <div
                      className="absolute top-16 left-16 w-[280px] aspect-square overflow-hidden shadow-xl transition-all duration-[1500ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? `translateY(${scrollY * -0.1}px) scale(1)`
                          : `translateY(50px) scale(0.9)`,
                        transitionDelay: isActive ? "300ms" : "0ms",
                      }}
                    >
                      <div className="absolute inset-0 border-[6px] border-white z-20"></div>
                      <div className="absolute inset-[6px] shadow-inner z-30"></div>
                      <img
                        src={slide.featuredImage1 || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    {/* Second Featured Image with parallax */}
                    <div
                      className="absolute bottom-16 right-16 w-[280px] aspect-square overflow-hidden shadow-xl transition-all duration-[1500ms] ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? `translateY(${scrollY * -0.15}px) scale(1)`
                          : `translateY(-50px) scale(0.9)`,
                        transitionDelay: isActive ? "600ms" : "0ms",
                      }}
                    >
                      <div className="absolute inset-0 border-[6px] border-white z-20"></div>
                      <div className="absolute inset-[6px] shadow-inner z-30"></div>
                      <img
                        src={slide.featuredImage2 || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    {/* Decorative element with rotation parallax */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] transition-all duration-[1500ms] ease-out"
                      style={{
                        opacity: isActive ? 0.7 : 0,
                        transform: isActive
                          ? `translate(-50%, -50%) translateY(${scrollY * -0.05}px) rotate(${scrollY * 0.02}deg)`
                          : `translate(-50%, -50%) rotate(90deg) scale(0.8)`,
                        transitionDelay: isActive ? "900ms" : "0ms",
                      }}
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" stroke="#D4B86A" strokeWidth="1" strokeOpacity="0.3" />
                        <circle cx="50" cy="50" r="40" stroke="#D4B86A" strokeWidth="1" strokeOpacity="0.5" />
                        <path
                          d="M50 10L53.9 22.1H66.9L56.5 29.8L60.4 41.9L50 34.2L39.6 41.9L43.5 29.8L33.1 22.1H46.1L50 10Z"
                          fill="#D4B86A"
                          fillOpacity="0.4"
                        />
                        <path
                          d="M50 60L53.9 72.1H66.9L56.5 79.8L60.4 91.9L50 84.2L39.6 91.9L43.5 79.8L33.1 72.1H46.1L50 60Z"
                          fill="#D4B86A"
                          fillOpacity="0.4"
                        />
                      </svg>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls with Enhanced Heritage Styling - NO BLACK BACKGROUND */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-10">
        <button
          className="w-16 h-16 flex items-center justify-center border-2 border-gold text-gold relative group rounded-full shadow-xl overflow-hidden"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          {/* Icon */}
          <ChevronLeft className="h-7 w-7 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-black" />

          {/* Background fill effect */}
          <span className="absolute inset-0 bg-gradient-to-br from-gold/90 via-gold to-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>

          {/* Glow effect */}
          <span className="absolute inset-0 -m-1 rounded-full bg-gold/0 group-hover:bg-gold/20 blur-md transition-all duration-500 scale-0 group-hover:scale-100"></span>

          {/* Shine effect */}
          <span className="absolute -right-12 w-12 h-32 bg-white/20 rotate-12 transform translate-x-0 opacity-0 group-hover:translate-x-32 group-hover:opacity-100 transition-all duration-1000 ease-out"></span>

          {/* Pulse effect on hover */}
          <span className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover:border-gold/50 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-1000"></span>
        </button>

        <button
          className="w-16 h-16 flex items-center justify-center border-2 border-gold text-gold relative group rounded-full shadow-xl overflow-hidden"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          {/* Icon */}
          <ChevronRight className="h-7 w-7 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-black" />

          {/* Background fill effect */}
          <span className="absolute inset-0 bg-gradient-to-br from-gold/90 via-gold to-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>

          {/* Glow effect */}
          <span className="absolute inset-0 -m-1 rounded-full bg-gold/0 group-hover:bg-gold/20 blur-md transition-all duration-500 scale-0 group-hover:scale-100"></span>

          {/* Shine effect */}
          <span className="absolute -right-12 w-12 h-32 bg-white/20 rotate-12 transform translate-x-0 opacity-0 group-hover:translate-x-32 group-hover:opacity-100 transition-all duration-1000 ease-out"></span>

          {/* Pulse effect on hover */}
          <span className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover:border-gold/50 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-1000"></span>
        </button>
      </div>

      {/* Slide Indicators with Enhanced Heritage Styling */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-4 h-4 border-2 transition-all duration-500 relative rounded-full shadow-md",
              currentSlide === index
                ? "bg-gold border-gold scale-125"
                : "bg-transparent border-gold/70 hover:border-gold hover:scale-110",
            )}
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentSlide === index && (
              <span className="absolute inset-0 animate-ping bg-gold/50 border border-gold rounded-full"></span>
            )}
            <span className="absolute inset-0 rounded-full bg-gold/0 hover:bg-gold/20 transition-colors duration-300"></span>
          </button>
        ))}
      </div>

      {/* Add keyframes for particle animations */}
      <style jsx>{`
        @keyframes particleAnimation {
          0% {
            opacity: 0;
            transform: scale(0) translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: scale(1) translate(10px, -10px);
          }
          100% {
            opacity: 0;
            transform: scale(0) translate(20px, -20px);
          }
        }
      `}</style>
    </section>
  )
}

