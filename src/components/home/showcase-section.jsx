"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { products } from "../../data/products" // Import all products

export default function ShowcaseSection() {
  const marqueeRef = useRef(null)
  const controls = useAnimation()

  // Use all products from the products.js file with premium descriptions
  const showcaseItems = [
    {
      name: "ROYAL HERITAGE",
      image: products[0]?.image || "/sweets_images/kajukatli.webp",
      alt: products[0]?.name || "Kaju Katli",
    },
    {
      name: "ARTISANAL CRAFT",
      image: products[1]?.image || "/sweets_images/rasmalai.jpg",
      alt: products[1]?.name || "Rasmalai",
    },
    {
      name: "CULINARY EXCELLENCE",
      image: products[2]?.image || "/sweets_images/gulab_jamun.jpg",
      alt: products[2]?.name || "Gulab Jamun",
    },
    {
      name: "PREMIUM SELECTION",
      image: products[3]?.image || "/sweets_images/Motichoor_Laddoo.webp",
      alt: products[3]?.name || "Motichoor Laddoo",
    },
    {
      name: "EXQUISITE FLAVORS",
      image: products[4]?.image || "/sweets_images/JILEBI.webp",
      alt: products[4]?.name || "Jalebi",
    },
    {
      name: "TIMELESS TRADITION",
      image: products[5]?.image || "/sweets_images/RajwadiPedha.webp",
      alt: products[5]?.name || "Rajwadi Pedha",
    },
    {
      name: "LUXURIOUS INDULGENCE",
      image: products[6]?.image || "/sweets_images/MODAK.webp",
      alt: products[6]?.name || "Modak",
    },
    {
      name: "HANDCRAFTED DELIGHTS",
      image: products[7]?.image || "/placeholder.svg",
      alt: products[7]?.name || "Sweet Delight",
    },
    {
      name: "SIGNATURE CREATIONS",
      image: products[8]?.image || "/placeholder.svg",
      alt: products[8]?.name || "Sweet Creation",
    },
    {
      name: "GOURMET TREASURES",
      image: products[9]?.image || "/placeholder.svg",
      alt: products[9]?.name || "Sweet Treasure",
    },
    {
      name: "HERITAGE COLLECTION",
      image: products[10]?.image || "/placeholder.svg",
      alt: products[10]?.name || "Heritage Sweet",
    },
    {
      name: "DIVINE DELICACIES",
      image: products[11]?.image || "/placeholder.svg",
      alt: products[11]?.name || "Divine Sweet",
    },
    {
      name: "MAJESTIC FLAVORS",
      image: products[12]?.image || "/placeholder.svg",
      alt: products[12]?.name || "Majestic Sweet",
    },
    {
      name: "REGAL CONFECTIONS",
      image: products[13]?.image || "/placeholder.svg",
      alt: products[13]?.name || "Regal Sweet",
    },
    {
      name: "OPULENT SWEETS",
      image: products[14]?.image || "/placeholder.svg",
      alt: products[14]?.name || "Opulent Sweet",
    },
    {
      name: "IMPERIAL DESSERTS",
      image: products[15]?.image || "/placeholder.svg",
      alt: products[15]?.name || "Imperial Sweet",
    },
    {
      name: "PRISTINE PURITY",
      image: products[16]?.image || "/placeholder.svg",
      alt: products[16]?.name || "Pure Sweet",
    },
    {
      name: "ANCESTRAL RECIPES",
      image: products[17]?.image || "/placeholder.svg",
      alt: products[17]?.name || "Traditional Sweet",
    },
    {
      name: "CEREMONIAL DELIGHTS",
      image: products[18]?.image || "/placeholder.svg",
      alt: products[18]?.name || "Ceremonial Sweet",
    },
    {
      name: "FESTIVE TREASURES",
      image: products[19]?.image || "/placeholder.svg",
      alt: products[19]?.name || "Festive Sweet",
    },
    {
      name: "SUBLIME CREATIONS",
      image: products[20]?.image || "/placeholder.svg",
      alt: products[20]?.name || "Sublime Sweet",
    },
    {
      name: "AUTHENTIC HERITAGE",
      image: products[21]?.image || "/placeholder.svg",
      alt: products[21]?.name || "Authentic Sweet",
    },
    {
      name: "MASTERFUL ARTISTRY",
      image: products[22]?.image || "/placeholder.svg",
      alt: products[22]?.name || "Artistic Sweet",
    },
    {
      name: "REFINED ELEGANCE",
      image: products[23]?.image || "/placeholder.svg",
      alt: products[23]?.name || "Elegant Sweet",
    },
    {
      name: "NOBLE CONFECTIONS",
      image: products[24]?.image || "/placeholder.svg",
      alt: products[24]?.name || "Noble Sweet",
    },
    {
      name: "PRECIOUS DELICACIES",
      image: products[25]?.image || "/placeholder.svg",
      alt: products[25]?.name || "Precious Sweet",
    },
    {
      name: "GRAND TRADITIONS",
      image: products[26]?.image || "/placeholder.svg",
      alt: products[26]?.name || "Grand Sweet",
    },
    {
      name: "ELITE SELECTION",
      image: products[27]?.image || "/placeholder.svg",
      alt: products[27]?.name || "Elite Sweet",
    },
    {
      name: "SOVEREIGN SWEETS",
      image: products[28]?.image || "/placeholder.svg",
      alt: products[28]?.name || "Sovereign Sweet",
    },
    {
      name: "DISTINGUISHED TASTE",
      image: products[29]?.image || "/placeholder.svg",
      alt: products[29]?.name || "Distinguished Sweet",
    },
    {
      name: "CELEBRATED FLAVORS",
      image: products[30]?.image || "/placeholder.svg",
      alt: products[30]?.name || "Celebrated Sweet",
    },
    {
      name: "PRESTIGIOUS TREATS",
      image: products[31]?.image || "/placeholder.svg",
      alt: products[31]?.name || "Prestigious Sweet",
    },
    {
      name: "LEGENDARY SWEETS",
      image: products[32]?.image || "/placeholder.svg",
      alt: products[32]?.name || "Legendary Sweet",
    },
  ]

  // Calculate the total width of all items to ensure proper looping
  useEffect(() => {
    // Ensure perfect infinite loop by calculating exact timing based on content width
    const startMarquee = () => {
      controls.start({
        x: "-50%",
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 150, // Increased duration for more products
            ease: "linear",
          },
        },
      })
    }

    startMarquee()

    // Restart animation on window resize for responsiveness
    window.addEventListener("resize", startMarquee)
    return () => window.removeEventListener("resize", startMarquee)
  }, [controls])

  return (
    <section className="relative overflow-hidden bg-white py-4">
      {/* Premium gold borders */}
      <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-gold/10 via-gold to-gold/10"></div>
      <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-gold/10 via-gold to-gold/10"></div>

      {/* Heritage corner decorations */}
      <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-gold/40"></div>
      <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-gold/40"></div>
      <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-gold/40"></div>
      <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-gold/40"></div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 heritage-pattern opacity-5"></div>

      {/* Marquee Container */}
      <div className="marquee-container relative z-10 h-[320px] flex items-center overflow-hidden">
        {/* First copy of the marquee - this creates the infinite loop effect */}
        <motion.div
          ref={marqueeRef}
          animate={controls}
          className="marquee-content flex whitespace-nowrap absolute"
          style={{ width: "fit-content" }}
        >
          {/* Repeat the content twice to create a seamless loop */}
          {[1, 2].map((_, outerIndex) => (
            <div key={outerIndex} className="flex items-center">
              {showcaseItems.map((item, index) => (
                <div key={`${outerIndex}-${index}`} className="flex items-center mx-20">
                  {/* MASSIVE IMAGE with heritage styling */}
                  <div className="relative mr-12">
                    {/* Main image container - DRAMATICALLY INCREASED SIZE */}
                    <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl relative">
                      {/* Heritage border decoration */}
                      <div className="absolute inset-0 border-[8px] border-gold/70 rounded-full z-10"></div>

                      {/* Inner decorative border */}
                      <div className="absolute inset-[8px] border-[4px] border-gold/30 rounded-full z-10"></div>

                      {/* Image */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />

                      {/* Overlay glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/15 to-transparent z-20"></div>
                    </div>

                    {/* Outer decorative elements */}
                    <div className="absolute -inset-4 border-[3px] border-gold/20 rounded-full opacity-70"></div>

                    {/* Corner decorations on the image */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-3 border-l-3 border-gold rounded-tl-full"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-3 border-r-3 border-gold rounded-tr-full"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-3 border-l-3 border-gold rounded-bl-full"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-3 border-r-3 border-gold rounded-br-full"></div>

                    {/* Additional decorative elements */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold/60 rotate-45"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold/60 rotate-45"></div>
                    <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-3 h-3 bg-gold/60 rotate-45"></div>
                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-3 h-3 bg-gold/60 rotate-45"></div>
                  </div>

                  {/* ENHANCED TEXT with multiple effects */}
                  <h2
                    className="text-7xl md:text-8xl lg:text-9xl font-cinzel font-extrabold tracking-wider"
                    style={{
                      WebkitTextStroke: "4px #d3ae6e",
                      color: "transparent",
                      textShadow: "0 0 10px rgba(211, 174, 110, 0.5), 0 0 40px rgba(211, 174, 110, 0.3)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.name}
                  </h2>

                  {/* Decorative divider between items */}
                  {index < showcaseItems.length - 1 && (
                    <div className="mx-10 h-20 w-[2px] bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium gold shimmer effect */}
      <div className="absolute inset-0 gold-shimmer opacity-20 pointer-events-none"></div>
    </section>
  )
}

