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
      {/* Centered logo watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-[650px] h-[650px] opacity-[0.15]">
          <img
            src="/images/ramesh-logo.svg"
            alt="Ramesh Sweets Logo"
            className="w-full h-full object-contain"
            style={{ filter: "sepia(50%) contrast(130%)" }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <CollectionHeader
          title="Our Sweet Collection"
          subtitle="Discover our handcrafted sweets made with love and tradition"
        />

        <div className="container mx-auto px-4 py-8">
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

