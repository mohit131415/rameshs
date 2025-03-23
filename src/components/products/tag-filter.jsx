"use client"

import { useState, useEffect } from "react"
import { Tag, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

export default function TagFilter({ tags = [], onTagChange }) {
  const [selectedTags, setSelectedTags] = useState([])

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId)
      } else {
        return [...prev, tagId]
      }
    })
  }

  useEffect(() => {
    onTagChange?.(selectedTags)
  }, [selectedTags, onTagChange])

  return (
    <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
      {/* Heritage decorative elements */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

      <CardHeader className="pb-3 border-b border-gold/10 bg-cream/30">
        <CardTitle className="text-lg flex items-center font-cinzel text-gold-dark">
          <Tag className="mr-2 h-4 w-4 text-gold" />
          Special Tags
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          {tags.map((tag) => (
            <motion.div
              key={tag.id}
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                selectedTags.includes(tag.id) ? "bg-gold/10" : "hover:bg-cream/50"
              }`}
              onClick={() => handleTagClick(tag.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-4 h-4 rounded-sm mr-2 border ${
                  selectedTags.includes(tag.id) ? "border-gold bg-gold" : "border-gray-300"
                }`}
              >
                {selectedTags.includes(tag.id) && (
                  <div className="flex items-center justify-center h-full">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <span className="text-sm font-serif">{tag.name}</span>
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

