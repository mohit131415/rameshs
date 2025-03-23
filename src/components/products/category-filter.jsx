"use client"

import { useState } from "react"
import { Check, Filter } from 'lucide-react'
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { cn } from "../../lib/utils"

export default function CategoryFilter({ categories = [], onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Add "All" category if not present
  const allCategories = [{ id: "All", name: "All Products" }, ...categories.filter((cat) => cat.id !== "All")]

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id)
    onCategoryChange?.(category.id === "All" ? null : category.id)
  }

  return (
    <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
      {/* Heritage decorative elements */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

      <CardHeader className="pb-3 border-b border-gold/10 bg-cream/30">
        <CardTitle className="text-lg flex items-center font-cinzel text-gold-dark">
          <Filter className="mr-2 h-4 w-4 text-gold" />
          Categories
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-1">
          {allCategories.map((category) => (
            <motion.div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "flex cursor-pointer items-center rounded-md px-3 py-2.5 text-sm transition-colors relative overflow-hidden",
                selectedCategory === category.id ? "text-gold-dark font-medium" : "hover:bg-cream/50 text-gray-700",
              )}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedCategory === category.id && (
                <>
                  <Check className="mr-2 h-4 w-4 text-gold" />
                  <motion.div
                    className="absolute inset-0 bg-gold/10 -z-10"
                    layoutId="selectedCategory"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                </>
              )}
              <span className={cn(
                selectedCategory === category.id ? "ml-0" : "ml-6",
                "font-serif"
              )}>
                {category.name}
              </span>
              
              {/* Show count if available */}
              {category.count && (
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        </div>
      </CardContent>
    </Card>
  )
}
