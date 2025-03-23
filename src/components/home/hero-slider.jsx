"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"
import { PremiumButton } from "../ui/premium-button"

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
  const [nextSlide, setNextSlide] = useState(null)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)
  const [viewportHeight, setViewportHeight] = useState(0)
  const scrollY = useMotionValue(0)
  const transitionTimerRef = useRef(null)

  // Setup scroll motion value
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    // Set initial viewport height
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [scrollY])

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide()
      }
    }, 7000)
    return () => clearInterval(interval)
  }, [currentSlide, isTransitioning])

  const goToNextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(1)

    // Calculate next slide index
    const nextIndex = currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1
    setNextSlide(nextIndex)

    // Smoother transition with a slight delay
    transitionTimerRef.current = setTimeout(() => {
      setCurrentSlide(nextIndex)
      // Reset nextSlide after the transition completes
      setTimeout(() => setNextSlide(null), 500)
    }, 50)
  }

  const goToPrevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(-1)

    // Calculate previous slide index
    const prevIndex = currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1
    setNextSlide(prevIndex)

    // Smoother transition with a slight delay
    transitionTimerRef.current = setTimeout(() => {
      setCurrentSlide(prevIndex)
      // Reset nextSlide after the transition completes
      setTimeout(() => setNextSlide(null), 500)
    }, 50)
  }

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return
    setIsTransitioning(true)
    setDirection(index > currentSlide ? 1 : -1)
    setNextSlide(index)

    // Smoother transition with a slight delay
    transitionTimerRef.current = setTimeout(() => {
      setCurrentSlide(index)
      // Reset nextSlide after the transition completes
      setTimeout(() => setNextSlide(null), 800)
    }, 100)
  }

  // Framer Motion variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 250, damping: 25 },
        opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (custom) => ({
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5,
        delay: (5 - custom) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const imageVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      scale: 0.9,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: "#D4B86A",
      color: "#000",
      transition: {
        scale: { type: "spring", stiffness: 400, damping: 10 },
        backgroundColor: { duration: 0.3 },
      },
    },
    tap: { scale: 0.95 },
  }

  // Transform scroll value for parallax
  const backgroundY = useTransform(scrollY, [0, viewportHeight], [0, viewportHeight * 0.3])
  const contentY = useTransform(scrollY, [0, viewportHeight], [0, 80])
  const image1Y = useTransform(scrollY, [0, viewportHeight], [0, 120])
  const image2Y = useTransform(scrollY, [0, viewportHeight], [0, 60])

  // Transition overlay variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  }

  // Handle transition completion
  const handleTransitionComplete = () => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
    return () => clearTimeout(timer)
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Transition Background with Logo */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 backdrop-blur-md z-40 pointer-events-none flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={handleTransitionComplete}
          >
            {/* Preview of next/previous slide with blur */}
            <motion.div
              className="absolute inset-0 opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3, transition: { duration: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <img
                src={nextSlide !== null ? sliderData[nextSlide].image : sliderData[currentSlide].image}
                alt=""
                className="w-full h-full object-cover filter blur-md"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-amber-900/20 to-black/70"></div>
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              exit={{
                scale: 1.1,
                opacity: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <img src="/images/logo.png" alt="Ramesh Sweets Logo" className="w-40 h-40 object-contain" />

              {/* Gold accent lines */}
              <motion.div
                className="w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-6"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 192,
                  opacity: 1,
                  transition: {
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              />

              {/* Subtle text indicator */}
              <motion.p
                className="text-gold/70 font-cinzel text-sm mt-4 tracking-widest"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                {direction > 0 ? "NEXT" : "PREVIOUS"}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Black overlay for the entire section */}
      <div className="absolute inset-0 bg-black/60 z-5"></div>

      {/* Background Images with Framer Motion */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ y: backgroundY }}
            onAnimationStart={() => {
              setIsTransitioning(true)
            }}
          >
            {/* Background Image */}
            <motion.img
              src={sliderData[currentSlide].image || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{
                filter: "brightness(0.5) contrast(1.1)",
              }}
              animate={{
                scale: [1, 1.05],
              }}
              transition={{
                scale: { duration: 7, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            />

            {/* Warm overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-amber-900/20 to-black/70"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Heritage Border Frame */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-8 border border-gold/40"></div>
        <div className="absolute inset-10 border border-gold/30"></div>

        {/* Corner ornaments */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.5 }}
        />

        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-gold/80 transform translate-x-[-8px] translate-y-[-8px]"></div>
        <div className="absolute top-8 right-8 w-4 h-4 bg-gold/80 transform translate-x-[8px] translate-y-[-8px]"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-gold/80 transform translate-x-[-8px] translate-y-[8px]"></div>
        <div className="absolute bottom-8 right-8 w-4 h-4 bg-gold/80 transform translate-x-[8px] translate-y-[8px]"></div>
      </div>

      {/* Main Content Layout with Parallax */}
      <motion.div className="relative h-full z-20 flex items-center" style={{ y: contentY }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content Column */}
            <div className="text-center lg:text-left relative h-[500px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`content-${currentSlide}`}
                  className="absolute inset-0"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                >
                  {/* Subtitle with ornamental elements */}
                  <motion.div variants={contentVariants} custom={1} className="mb-4">
                    <div className="inline-flex items-center">
                      <div className="h-px w-8 bg-gold"></div>
                      <div className="px-3">
                        <div className="w-2 h-2 rotate-45 bg-gold"></div>
                      </div>
                      <div className="h-px w-8 bg-gold"></div>
                    </div>
                    <p className="font-cinzel text-gold tracking-widest text-sm mt-3">
                      {sliderData[currentSlide].subtitle}
                    </p>
                  </motion.div>

                  {/* Main Title with heritage styling */}
                  <motion.h1
                    variants={contentVariants}
                    custom={2}
                    className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight"
                  >
                    {sliderData[currentSlide].title}
                  </motion.h1>

                  {/* Ornamental divider */}
                  <motion.div
                    variants={contentVariants}
                    custom={3}
                    className="flex items-center mb-6 lg:justify-start justify-center"
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
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    variants={contentVariants}
                    custom={4}
                    className="font-eb-garamond text-lg text-white/90 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
                  >
                    {sliderData[currentSlide].description}
                  </motion.p>

                  {/* Discover Button */}
                  <motion.div variants={contentVariants} custom={5}>
                    <PremiumButton href={sliderData[currentSlide].link} size="md">
                      Discover
                    </PremiumButton>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Featured Images Column */}
            <div className="hidden lg:block relative h-[500px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`images-${currentSlide}`}
                  className="absolute inset-0"
                  custom={direction}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Heritage frame for images */}
                  <div className="absolute inset-0 border border-gold/20"></div>

                  {/* First Featured Image with parallax */}
                  <motion.div
                    className="absolute top-16 left-16 w-[280px] aspect-square overflow-hidden shadow-xl z-20"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    style={{
                      y: image1Y,
                    }}
                  >
                    <div className="absolute inset-0 border-[6px] border-white z-20"></div>
                    <div className="absolute inset-[6px] shadow-inner z-30"></div>
                    <motion.img
                      src={sliderData[currentSlide].featuredImage1 || "/placeholder.svg"}
                      alt={sliderData[currentSlide].title}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.1, transition: { duration: 0.7 } }}
                    />
                  </motion.div>

                  {/* Second Featured Image with parallax */}
                  <motion.div
                    className="absolute bottom-16 right-16 w-[280px] aspect-square overflow-hidden shadow-xl z-10"
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    style={{
                      y: image2Y,
                    }}
                  >
                    <div className="absolute inset-0 border-[6px] border-white z-20"></div>
                    <div className="absolute inset-[6px] shadow-inner z-30"></div>
                    <motion.img
                      src={sliderData[currentSlide].featuredImage2 || "/placeholder.svg"}
                      alt={sliderData[currentSlide].title}
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.1, transition: { duration: 0.7 } }}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Controls with Enhanced Heritage Styling */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-10">
        <motion.button
          className="w-16 h-16 flex items-center justify-center border-2 border-gold text-gold relative rounded-full shadow-xl overflow-hidden"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          disabled={isTransitioning}
        >
          {/* Icon */}
          <ChevronLeft className="h-7 w-7 relative z-10" />
        </motion.button>

        <motion.button
          className="w-16 h-16 flex items-center justify-center border-2 border-gold text-gold relative rounded-full shadow-xl overflow-hidden"
          onClick={goToNextSlide}
          aria-label="Next slide"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          disabled={isTransitioning}
        >
          {/* Icon */}
          <ChevronRight className="h-7 w-7 relative z-10" />

          {/* Animated shine effect */}
          <motion.div
            className="absolute -right-12 w-12 h-32 bg-white/20 rotate-12"
            initial={{ x: 0, opacity: 0 }}
            whileHover={{
              x: 32,
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              },
            }}
          />
        </motion.button>
      </div>

      {/* Slide Indicators with Enhanced Heritage Styling */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        {sliderData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-4 h-4 border-2 relative rounded-full shadow-md",
              currentSlide === index ? "bg-gold border-gold" : "bg-transparent border-gold/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
            initial={{ scale: 1 }}
            animate={{
              scale: currentSlide === index ? 1.25 : 1,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            whileHover={{
              scale: 1.1,
              borderColor: "#D4B86A",
              transition: { duration: 0.3 },
            }}
            disabled={isTransitioning}
          >
            {currentSlide === index && (
              <motion.span
                className="absolute inset-0 bg-gold/50 border border-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  )
}

