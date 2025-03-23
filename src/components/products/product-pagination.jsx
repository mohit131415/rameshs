"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export default function ProductPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
}) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = []
    
    // Always show first page
    pageNumbers.push(1)
    
    // Calculate visible pages around current page
    const leftSide = Math.max(2, currentPage - 1)
    const rightSide = Math.min(totalPages - 1, currentPage + 1)
    
    // Add ellipsis after first page if needed
    if (leftSide > 2) {
      pageNumbers.push("ellipsis-left")
    }
    
    // Add pages around current page
    for (let i = leftSide; i <= rightSide; i++) {
      pageNumbers.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (rightSide < totalPages - 1) {
      pageNumbers.push("ellipsis-right")
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    
    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
      // Scroll to top of products section
      window.scrollTo({
        top: document.getElementById('products-section')?.offsetTop - 100 || 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav
      className={cn("flex justify-center items-center mt-8 mb-4", className)}
      aria-label="Products pagination"
    >
      <div className="relative flex items-center">
        {/* Heritage decorative elements */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-md h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-md h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        
        {/* Previous page button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-full border border-gold/30 mr-2",
            currentPage === 1 
              ? "opacity-50 cursor-not-allowed bg-cream/50" 
              : "hover:bg-gold/10 hover:border-gold/50 bg-white"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 text-gold-dark" />
        </motion.button>
        
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-left" || page === "ellipsis-right") {
              return (
                <div 
                  key={page} 
                  className="flex items-center justify-center h-10 w-10"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4 text-gold-dark/60" />
                </div>
              )
            }
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageClick(page)}
                className={cn(
                  "relative flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium transition-colors",
                  currentPage === page 
                    ? "bg-gold text-white" 
                    : "bg-white border border-gold/30 text-gold-dark hover:bg-gold/10 hover:border-gold/50"
                )}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
                {currentPage === page && (
                  <motion.div
                    className="absolute inset-0 bg-gold rounded-full -z-10"
                    layoutId="activePage"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
        
        {/* Next page button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-full border border-gold/30 ml-2",
            currentPage === totalPages 
              ? "opacity-50 cursor-not-allowed bg-cream/50" 
              : "hover:bg-gold/10 hover:border-gold/50 bg-white"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4 text-gold-dark" />
        </motion.button>
      </div>
    </nav>
  )
}
