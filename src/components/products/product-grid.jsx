"use client"

import { motion } from "framer-motion"
import ProductCard from "./product-card"
import ProductSkeleton from "./product-skeleton"
import ProductPagination from "./product-pagination"

export default function ProductGrid({
  products,
  isLoading,
  emptyMessage = "No products found",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 12, // Updated to 12 products per page
  selectedCategory, // Added selectedCategory prop
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream mb-6 border-2 border-gold/30">
          <svg
            className="w-10 h-10 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-cinzel text-gold-dark mb-2">No Products Found</h3>
        <p className="text-gray-500 font-serif max-w-md mx-auto">{emptyMessage}</p>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        </div>
      </div>
    )
  }

  // Filtering logic
  const filteredProducts = products

  return (
    <div id="products-section" className="relative">
      {/* Heritage decorative elements */}
      <div className="absolute -top-6 left-0 w-24 h-px bg-gradient-to-r from-gold/40 to-transparent"></div>
      <div className="absolute -top-6 right-0 w-24 h-px bg-gradient-to-l from-gold/40 to-transparent"></div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
        key={`page-${currentPage}`} // Re-animate when page changes
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} className={product.isPremium ? "premium-product" : ""} />
        ))}
      </motion.div>

      {/* Pagination */}
      <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}

