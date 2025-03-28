"use client"

import { useState, useEffect, useMemo } from "react"
import ProductGrid from "../components/products/product-grid"
import ProductFilter from "../components/products/product-filter"
import ProductTabs from "../components/products/product-tabs"
import { useLocation } from "react-router-dom"
import ProductTopSearch from "../components/products/product-top-search"
import CollectionHeader from "../components/collection-header"

// Import product data
import { products as allProducts } from "../data/products"
import { categories } from "../data/categories"

export default function ProductsPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get("category")
  const initialSearch = queryParams.get("search")

  // State for filters
  const [activeTab, setActiveTab] = useState("all")
  const [activeCategory, setActiveCategory] = useState(initialCategory || null)
  const [activeTags, setActiveTags] = useState([])
  const [searchQuery, setSearchQuery] = useState(initialSearch || "")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [ratingFilter, setRatingFilter] = useState(null)
  const [availabilityFilter, setAvailabilityFilter] = useState(null)
  const [discountFilter, setDiscountFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12) // Changed to 12 products per page

  // Filtered products
  const [displayedProducts, setDisplayedProducts] = useState([])

  // Extract unique tags from products
  const uniqueTags = [...new Set(allProducts.flatMap((product) => product.tags || []))]
    .filter((tag) => tag) // Remove empty tags
    .map((tag) => ({ id: tag, name: tag.charAt(0).toUpperCase() + tag.slice(1) }))

  // Format categories for filter component
  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }))

  const memoizedFilteredProducts = useMemo(() => {
    let result = [...allProducts]

    // Apply tab filter
    if (activeTab === "bestsellers") {
      result = result.filter((product) => product.tags?.includes("bestseller"))
    } else if (activeTab === "new") {
      result = result.filter((product) => product.tags?.includes("new"))
    } else if (activeTab === "featured") {
      result = result.filter((product) => product.featured)
    }

    // Apply category filter
    if (activeCategory) {
      result = result.filter((product) => product.category === activeCategory)
    }

    // Apply tag filter
    if (activeTags && activeTags.length > 0) {
      result = result.filter((product) => product.tags && product.tags.some((tag) => activeTags.includes(tag)))
    }

    // Apply search filter - only on product name
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((product) => product.name.toLowerCase().includes(query))
    }

    // Apply price filter
    if (priceRange) {
      result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    }

    // Apply rating filter
    if (ratingFilter) {
      result = result.filter((product) => product.rating >= ratingFilter)
    }

    // Apply availability filter
    if (availabilityFilter) {
      // This is a mock implementation - in a real app, you'd have availability data
      if (availabilityFilter === "in-stock") {
        result = result.filter((product) => product.stock > 0)
      } else if (availabilityFilter === "same-day") {
        result = result.filter((product) => product.delivery === "same-day")
      } else if (availabilityFilter === "next-day") {
        result = result.filter((product) => product.delivery === "next-day")
      } else if (availabilityFilter === "pre-order") {
        result = result.filter((product) => product.preOrder)
      }
    }

    // Apply discount filter
    if (discountFilter) {
      // This is a mock implementation - in a real app, you'd have discount data
      if (discountFilter === "10-percent") {
        result = result.filter((product) => product.discount >= 10)
      } else if (discountFilter === "20-percent") {
        result = result.filter((product) => product.discount >= 20)
      } else if (discountFilter === "30-percent") {
        result = result.filter((product) => product.discount >= 30)
      } else if (discountFilter === "50-percent") {
        result = result.filter((product) => product.discount >= 50)
      }
    }

    return result
  }, [
    activeTab,
    activeCategory,
    activeTags,
    searchQuery,
    priceRange,
    ratingFilter,
    availabilityFilter,
    discountFilter,
    allProducts,
  ])

  // Apply filters and update products
  useEffect(() => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  // Update displayed products based on pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedProducts(memoizedFilteredProducts.slice(startIndex, endIndex))
  }, [memoizedFilteredProducts, currentPage, itemsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(memoizedFilteredProducts.length / itemsPerPage)

  // Handle filter changes
  const handleFilterChange = (filter) => {
    if (filter.type === "category") {
      setActiveCategory(filter.value)
    } else if (filter.type === "tag") {
      setActiveTags(filter.value)
    } else if (filter.type === "search") {
      setSearchQuery(filter.value)
    } else if (filter.type === "price") {
      setPriceRange(filter.value)
    } else if (filter.type === "rating") {
      setRatingFilter(filter.value)
    } else if (filter.type === "availability") {
      setAvailabilityFilter(filter.value)
    } else if (filter.type === "discount") {
      setDiscountFilter(filter.value)
    }
  }

  // Reset all filters
  const handleResetFilters = () => {
    setActiveTab("all")
    setActiveCategory(null)
    setActiveTags([])
    setSearchQuery("")
    setPriceRange([0, 1000])
    setRatingFilter(null)
    setAvailabilityFilter(null)
    setDiscountFilter(null)
    setCurrentPage(1)
  }

  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to products section
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle search from search bar
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className="relative min-h-screen bg-[#f8f2e0]">
      {/* Heritage pattern background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Corner patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold/30 stroke-gold/40">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" strokeWidth="0.5" />
            <path d="M20,0 L20,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M40,0 L40,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M60,0 L60,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M80,0 L80,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,20 L100,20" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,40 L100,40" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,60 L100,60" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,80 L100,80" strokeWidth="0.3" strokeDasharray="1 3" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="60" cy="20" r="3" />
            <circle cx="80" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
            <circle cx="40" cy="40" r="3" />
            <circle cx="60" cy="40" r="3" />
            <circle cx="80" cy="40" r="3" />
            <circle cx="20" cy="60" r="3" />
            <circle cx="40" cy="60" r="3" />
            <circle cx="60" cy="60" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="60" cy="80" r="3" />
            <circle cx="80" cy="80" r="3" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold/30 stroke-gold/40">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" strokeWidth="0.5" />
            <path d="M20,0 L20,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M40,0 L40,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M60,0 L60,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M80,0 L80,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,20 L100,20" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,40 L100,40" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,60 L100,60" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,80 L100,80" strokeWidth="0.3" strokeDasharray="1 3" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="60" cy="20" r="3" />
            <circle cx="80" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
            <circle cx="40" cy="40" r="3" />
            <circle cx="60" cy="40" r="3" />
            <circle cx="80" cy="40" r="3" />
            <circle cx="20" cy="60" r="3" />
            <circle cx="40" cy="60" r="3" />
            <circle cx="60" cy="60" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="60" cy="80" r="3" />
            <circle cx="80" cy="80" r="3" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold/30 stroke-gold/40">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" strokeWidth="0.5" />
            <path d="M20,0 L20,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M40,0 L40,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M60,0 L60,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M80,0 L80,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,20 L100,20" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,40 L100,40" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,60 L100,60" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,80 L100,80" strokeWidth="0.3" strokeDasharray="1 3" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="60" cy="20" r="3" />
            <circle cx="80" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
            <circle cx="40" cy="40" r="3" />
            <circle cx="60" cy="40" r="3" />
            <circle cx="80" cy="40" r="3" />
            <circle cx="20" cy="60" r="3" />
            <circle cx="40" cy="60" r="3" />
            <circle cx="60" cy="60" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="60" cy="80" r="3" />
            <circle cx="80" cy="80" r="3" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold/30 stroke-gold/40">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" strokeWidth="0.5" />
            <path d="M20,0 L20,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M40,0 L40,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M60,0 L60,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M80,0 L80,100" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,20 L100,20" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,40 L100,40" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,60 L100,60" strokeWidth="0.3" strokeDasharray="1 3" />
            <path d="M0,80 L100,80" strokeWidth="0.3" strokeDasharray="1 3" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="40" cy="20" r="3" />
            <circle cx="60" cy="20" r="3" />
            <circle cx="80" cy="20" r="3" />
            <circle cx="20" cy="40" r="3" />
            <circle cx="40" cy="40" r="3" />
            <circle cx="60" cy="40" r="3" />
            <circle cx="80" cy="40" r="3" />
            <circle cx="20" cy="60" r="3" />
            <circle cx="40" cy="60" r="3" />
            <circle cx="60" cy="60" r="3" />
            <circle cx="80" cy="60" r="3" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="40" cy="80" r="3" />
            <circle cx="60" cy="80" r="3" />
            <circle cx="80" cy="80" r="3" />
          </svg>
        </div>

        {/* Center decorative border */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-gold/60">
            <rect x="5" y="5" width="90" height="90" strokeWidth="0.5" strokeDasharray="3 2" />
            <rect x="10" y="10" width="80" height="80" strokeWidth="0.3" />
            <path d="M10,10 L90,90 M90,10 L10,90" strokeWidth="0.2" strokeDasharray="5 3" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.3" strokeDasharray="2 2" />
            <path d="M50,20 L50,80 M20,50 L80,50" strokeWidth="0.2" />

            {/* Decorative corner elements */}
            <path d="M5,5 L15,5 L15,15 L5,15 Z" strokeWidth="0.5" />
            <path d="M85,5 L95,5 L95,15 L85,15 Z" strokeWidth="0.5" />
            <path d="M5,85 L15,85 L15,95 L5,95 Z" strokeWidth="0.5" />
            <path d="M85,85 L95,85 L95,95 L85,95 Z" strokeWidth="0.5" />

            {/* Kolam-inspired patterns */}
            <path d="M50,5 C60,15 60,25 50,35 C40,25 40,15 50,5" strokeWidth="0.3" />
            <path d="M50,65 C60,75 60,85 50,95 C40,85 40,75 50,65" strokeWidth="0.3" />
            <path d="M5,50 C15,60 25,60 35,50 C25,40 15,40 5,50" strokeWidth="0.3" />
            <path d="M65,50 C75,60 85,60 95,50 C85,40 75,40 65,50" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Subtle repeating pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <CollectionHeader
          title="Our Sweet Collection"
          subtitle="Discover our handcrafted sweets made with love and tradition"
        />

        <div className="container mx-auto px-4">
          <ProductTabs
            tabs={[
              { id: "all", label: "All Products" },
              { id: "bestsellers", label: "Bestsellers" },
              { id: "new", label: "New Arrivals" },
              { id: "featured", label: "Featured" },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Top Search Bar */}
          <ProductTopSearch onSearch={handleSearch} initialQuery={searchQuery} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
              <ProductFilter
                categories={formattedCategories}
                tags={uniqueTags}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                resultsCount={memoizedFilteredProducts.length}
                totalProducts={allProducts.length}
              />
            </div>

            {/* Main Content - Product Grid */}
            <div className="lg:col-span-9">
              <ProductGrid
                products={displayedProducts}
                isLoading={isLoading}
                emptyMessage="No products match your filters. Try adjusting your criteria."
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
