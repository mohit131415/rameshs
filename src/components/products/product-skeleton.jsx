"use client"

import { motion } from "framer-motion"

export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden border border-gold/10 rounded-lg h-full bg-white shadow-md relative">
      {/* Heritage corner decorations */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/20 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/20 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/20 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/20 rounded-br-lg"></div>

      {/* Image skeleton */}
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
          animate={{ x: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="p-5">
        {/* Category skeleton */}
        <div className="h-4 w-1/4 bg-gray-100 rounded mb-2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-100 rounded mb-2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Rating skeleton */}
        <div className="h-4 w-1/3 bg-gray-100 rounded mb-3 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Description skeleton */}
        <div className="h-4 w-full bg-gray-100 rounded mb-2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
        <div className="h-4 w-3/4 bg-gray-100 rounded mb-4 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1 mb-4">
          <div className="h-5 w-16 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
          <div className="h-5 w-20 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </div>

        {/* Price and actions skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-16 bg-gray-100 rounded overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

