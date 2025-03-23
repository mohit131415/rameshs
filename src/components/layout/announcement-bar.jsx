"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { motion } from "framer-motion"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      className="bg-gold text-white py-1 px-4 text-center relative"
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="font-cinzel tracking-wide">FREE Shipping</span>
          <span className="h-4 w-px bg-[#ffffff]/50"></span>
          <span className="font-cinzel">Extra discount for nearby pincodes.</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-white/80 hover:text-white"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
