"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"

export default function ProductTopSearch({ onSearch, initialQuery = "" }) {
  const [searchInput, setSearchInput] = useState(initialQuery)

  // Update search as user types with a small debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchInput)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchInput, onSearch])

  return (
    <div className="w-full mb-6 relative">
      <div className="relative max-w-3xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-2 left-0 w-16 h-px bg-gradient-to-r from-gold/40 to-transparent"></div>
        <div className="absolute -top-2 right-0 w-16 h-px bg-gradient-to-l from-gold/40 to-transparent"></div>
        <div className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-gold/40 to-transparent"></div>
        <div className="absolute -bottom-2 right-0 w-16 h-px bg-gradient-to-l from-gold/40 to-transparent"></div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search our sweet collection..."
            className="w-full py-3 pl-12 pr-10 rounded-md border-2 border-gold/30 bg-white/90 focus:outline-none focus:ring-2 focus:ring-gold/50 font-serif placeholder:text-gray-400 shadow-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold" />
          {searchInput && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchInput("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

