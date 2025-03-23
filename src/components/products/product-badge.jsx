"use client"

import { motion } from "framer-motion"

export default function ProductBadge({ product }) {
  // Determine which badge to show (prioritize in this order)
  if (product.tags?.includes("bestseller") || product.isBestseller) {
    return (
      <motion.div
        className="absolute top-3 right-3 bg-gold/90 text-white text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-cinzel tracking-wide">Bestseller</span>
      </motion.div>
    )
  }

  if (product.tags?.includes("new") || product.isNew) {
    return (
      <motion.div
        className="absolute top-3 right-3 bg-green-600/90 text-white text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-cinzel tracking-wide">New</span>
      </motion.div>
    )
  }

  if (product.tags?.includes("seasonal")) {
    return (
      <motion.div
        className="absolute top-3 right-3 bg-orange-600/90 text-white text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-cinzel tracking-wide">Seasonal</span>
      </motion.div>
    )
  }

  if (product.discount) {
    return (
      <motion.div
        className="absolute top-3 right-3 bg-red-600/90 text-white text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-cinzel tracking-wide">{product.discount}% Off</span>
      </motion.div>
    )
  }

  return null
}

