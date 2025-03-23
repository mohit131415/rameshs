"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Eye } from "lucide-react"
import HeritageSectionHeader from "../ui/heritage-section-header"

// Sample data for categories
const categories = [
  {
    title: "Perfect for Gifting",
    description: "Premium sweets in elegant packaging",
    imageSrc: "/sweets_images/petha.jpg",
    to: "/products?category=gifting",
  },
  {
    title: "Celebration Specials",
    description: "Traditional festival delights",
    imageSrc: "/sweets_images/picts chikki.jpg",
    to: "/products?category=celebrations",
  },
  {
    title: "Daily Indulgence",
    description: "Everyday sweet treats",
    imageSrc: "/sweets_images/piss.jpg",
    to: "/products?category=daily",
  },
  {
    title: "Dry Fruit Collection",
    description: "Luxurious dry fruit delicacies",
    imageSrc: "/sweets_images/pista mawa ball.jpg",
    to: "/products?category=dry-fruits",
  },
]

// SVG Heritage Decorative Elements
const HeritageSVGCorner = ({ className, rotate = 0 }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M1 1V8C1 12.4183 4.58172 16 9 16H16V23" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="2" fill="#D4AF37" fillOpacity="0.3" />
    <circle cx="1" cy="1" r="1" fill="#D4AF37" />
  </svg>
)

const HeritageSVGDivider = () => (
  <svg width="120" height="12" viewBox="0 0 120 12" fill="none" className="mx-auto my-2">
    <line x1="0" y1="6" x2="50" y2="6" stroke="#D4AF37" strokeOpacity="0.6" strokeWidth="1" />
    <line x1="70" y1="6" x2="120" y2="6" stroke="#D4AF37" strokeOpacity="0.6" strokeWidth="1" />
    <path d="M60 0L63.5 4.5L60 9L56.5 4.5L60 0Z" fill="#D4AF37" fillOpacity="0.8" />
  </svg>
)

const HeritageSVGBorder = ({ className }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
    <rect x="0.5" y="0.5" width="99%" height="99%" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1" fill="none" />
    <rect
      x="3"
      y="3"
      width="94%"
      height="94%"
      stroke="#D4AF37"
      strokeOpacity="0.15"
      strokeWidth="0.5"
      strokeDasharray="2 2"
      fill="none"
    />
  </svg>
)

// Category Card Component
const CategoryCard = ({ category, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative group"
    >
      <div className="relative overflow-hidden bg-white h-full z-0 p-2">
        {/* Heritage SVG Border */}
        <HeritageSVGBorder className="absolute inset-0 pointer-events-none" />

        {/* Heritage Corner Decorations */}
        <HeritageSVGCorner className="absolute top-0 left-0" rotate={0} />
        <HeritageSVGCorner className="absolute top-0 right-0" rotate={90} />
        <HeritageSVGCorner className="absolute bottom-0 left-0" rotate={270} />
        <HeritageSVGCorner className="absolute bottom-0 right-0" rotate={180} />

        {/* Category Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={category.imageSrc || "/placeholder.svg"}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Category Name */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-center">
            <h3 className="font-cinzel text-xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
              {category.title}
            </h3>

            <p className="text-white/90 text-sm mb-4 font-eb-garamond">{category.description}</p>

            <Link
              to={category.to}
              className="inline-block border border-gold text-gold hover:bg-gold hover:text-[#5c4a2a] px-8 py-2 font-cinzel text-sm tracking-wider transition-colors duration-300"
            >
              DISCOVER
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CategorySection() {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section className="py-12 relative overflow-hidden bg-[#f8f5f0]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-5"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <HeritageSectionHeader
          title="Find Your Sweet Craving"
          subtitle="Explore our curated collection of authentic Indian sweets"
          preTitle="HERITAGE CATEGORIES"
          topSymbol="❖"
          bottomSymbol="✦"
          className="mb-8"
        />

        {/* Categories Grid */}
        <div className="relative p-6 border border-gold/20">
          {/* Heritage SVG Corners for Grid Container */}
          <HeritageSVGCorner className="absolute -top-3 -left-3 scale-150" rotate={0} />
          <HeritageSVGCorner className="absolute -top-3 -right-3 scale-150" rotate={90} />
          <HeritageSVGCorner className="absolute -bottom-3 -left-3 scale-150" rotate={270} />
          <HeritageSVGCorner className="absolute -bottom-3 -right-3 scale-150" rotate={180} />

          {/* Heritage SVG Divider */}
          <HeritageSVGDivider />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </motion.div>

          {/* Heritage SVG Divider */}
          <HeritageSVGDivider />
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-[#5c4a2a] px-12 py-2.5 font-cinzel text-sm tracking-wider transition-colors duration-300"
          >
            <Eye className="mr-2 h-4 w-4" />
            VIEW ALL CATEGORIES
          </Link>
        </div>
      </div>
    </section>
  )
}

