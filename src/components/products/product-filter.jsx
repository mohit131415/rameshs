"use client"

import { useState, useEffect } from "react"
import { FilterX, SlidersHorizontal, ChevronDown, ChevronUp, Star, Clock, Percent, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Slider } from "../../components/ui/slider"
import CategoryFilter from "./category-filter"
import TagFilter from "./tag-filter"

export default function ProductFilter({
  categories = [],
  tags = [],
  onFilterChange,
  onReset,
  className,
  resultsCount,
  totalProducts,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showPriceFilter, setShowPriceFilter] = useState(true)
  const [showRatingFilter, setShowRatingFilter] = useState(false)
  const [showAvailabilityFilter, setShowAvailabilityFilter] = useState(false)
  const [showDiscountFilter, setShowDiscountFilter] = useState(false)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedAvailability, setSelectedAvailability] = useState(null)
  const [selectedDiscount, setSelectedDiscount] = useState(null)

  // Apply price filter when range changes
  useEffect(() => {
    onFilterChange?.({ type: "price", value: priceRange })
  }, [priceRange, onFilterChange])

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const handleRatingChange = (rating) => {
    const newRating = selectedRating === rating ? null : rating
    setSelectedRating(newRating)
    onFilterChange?.({ type: "rating", value: newRating })
  }

  const handleAvailabilityChange = (availability) => {
    const newAvailability = selectedAvailability === availability ? null : availability
    setSelectedAvailability(newAvailability)
    onFilterChange?.({ type: "availability", value: newAvailability })
  }

  const handleDiscountChange = (discount) => {
    const newDiscount = selectedDiscount === discount ? null : discount
    setSelectedDiscount(newDiscount)
    onFilterChange?.({ type: "discount", value: newDiscount })
  }

  const handleReset = () => {
    setPriceRange([0, 1000])
    setSelectedRating(null)
    setSelectedAvailability(null)
    setSelectedDiscount(null)
    setShowPriceFilter(true)
    setShowRatingFilter(false)
    setShowAvailabilityFilter(false)
    setShowDiscountFilter(false)
    onReset?.()
  }

  return (
    <div className={className}>
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full flex justify-between items-center border-gold/30 text-gold-dark bg-cream/50 hover:bg-cream"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center font-cinzel">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Refine Selection
            </span>
            <span className="text-xs text-muted-foreground font-serif">{showMobileFilters ? "Hide" : "Show"}</span>
          </Button>
        </motion.div>
      </div>

      <div
        className={`space-y-6 ${!showMobileFilters ? "hidden md:block" : ""} md:max-h-[calc(100vh-200px)] md:overflow-y-auto md:pr-2 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent`}
      >
        {/* Results count */}
        <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            {resultsCount !== undefined && totalProducts !== undefined && (
              <div className="text-center">
                <p className="text-sm text-gray-600 font-serif">
                  Showing <span className="font-medium text-gold-dark">{resultsCount}</span> of{" "}
                  <span className="font-medium text-gold-dark">{totalProducts}</span> products
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <CategoryFilter
          categories={categories}
          onCategoryChange={(category) => onFilterChange?.({ type: "category", value: category })}
        />

        {/* Tags */}
        <TagFilter tags={tags} onTagChange={(selectedTags) => onFilterChange?.({ type: "tag", value: selectedTags })} />

        {/* Price Range Filter */}
        <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
          {/* Heritage decorative elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

          <div
            className="p-4 border-b border-gold/10 bg-cream/30 flex justify-between items-center cursor-pointer"
            onClick={() => setShowPriceFilter(!showPriceFilter)}
          >
            <h3 className="text-lg flex items-center font-cinzel text-gold-dark">
              <span className="mr-2 h-5 w-5 text-gold">₹</span>
              Price Range
            </h3>
            {showPriceFilter ? (
              <ChevronUp className="h-4 w-4 text-gold" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gold" />
            )}
          </div>

          <AnimatePresence>
            {showPriceFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4">
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex justify-between items-center">
                      <div className="bg-cream px-3 py-1 rounded-full text-sm font-medium text-gold-dark border border-gold/20">
                        ₹{priceRange[0]}
                      </div>
                      <div className="text-sm text-gray-500 font-serif">to</div>
                      <div className="bg-cream px-3 py-1 rounded-full text-sm font-medium text-gold-dark border border-gold/20">
                        ₹{priceRange[1]}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Rating Filter */}
        <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
          {/* Heritage decorative elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

          <div
            className="p-4 border-b border-gold/10 bg-cream/30 flex justify-between items-center cursor-pointer"
            onClick={() => setShowRatingFilter(!showRatingFilter)}
          >
            <h3 className="text-lg flex items-center font-cinzel text-gold-dark">
              <Star className="mr-2 h-4 w-4 text-gold" />
              Customer Rating
            </h3>
            {showRatingFilter ? (
              <ChevronUp className="h-4 w-4 text-gold" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gold" />
            )}
          </div>

          <AnimatePresence>
            {showRatingFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <motion.div
                        key={rating}
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          selectedRating === rating ? "bg-gold/10" : "hover:bg-cream/50"
                        }`}
                        onClick={() => handleRatingChange(rating)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < rating ? "text-gold fill-gold" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-serif">{rating}+ Stars</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Availability Filter */}
        <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
          {/* Heritage decorative elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

          <div
            className="p-4 border-b border-gold/10 bg-cream/30 flex justify-between items-center cursor-pointer"
            onClick={() => setShowAvailabilityFilter(!showAvailabilityFilter)}
          >
            <h3 className="text-lg flex items-center font-cinzel text-gold-dark">
              <Clock className="mr-2 h-4 w-4 text-gold" />
              Availability
            </h3>
            {showAvailabilityFilter ? (
              <ChevronUp className="h-4 w-4 text-gold" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gold" />
            )}
          </div>

          <AnimatePresence>
            {showAvailabilityFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {[
                      { id: "in-stock", label: "In Stock" },
                      { id: "same-day", label: "Same Day Delivery" },
                      { id: "next-day", label: "Next Day Delivery" },
                      { id: "pre-order", label: "Pre-Order Available" },
                    ].map((option) => (
                      <motion.div
                        key={option.id}
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          selectedAvailability === option.id ? "bg-gold/10" : "hover:bg-cream/50"
                        }`}
                        onClick={() => handleAvailabilityChange(option.id)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mr-2 border ${
                            selectedAvailability === option.id ? "border-gold bg-gold" : "border-gray-300"
                          }`}
                        >
                          {selectedAvailability === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                          )}
                        </div>
                        <span className="text-sm font-serif">{option.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Discount Filter */}
        <Card className="border-gold/20 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm">
          {/* Heritage decorative elements */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

          <div
            className="p-4 border-b border-gold/10 bg-cream/30 flex justify-between items-center cursor-pointer"
            onClick={() => setShowDiscountFilter(!showDiscountFilter)}
          >
            <h3 className="text-lg flex items-center font-cinzel text-gold-dark">
              <Percent className="mr-2 h-4 w-4 text-gold" />
              Discounts
            </h3>
            {showDiscountFilter ? (
              <ChevronUp className="h-4 w-4 text-gold" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gold" />
            )}
          </div>

          <AnimatePresence>
            {showDiscountFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {[
                      { id: "10-percent", label: "10% and above" },
                      { id: "20-percent", label: "20% and above" },
                      { id: "30-percent", label: "30% and above" },
                      { id: "50-percent", label: "50% and above" },
                    ].map((option) => (
                      <motion.div
                        key={option.id}
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          selectedDiscount === option.id ? "bg-gold/10" : "hover:bg-cream/50"
                        }`}
                        onClick={() => handleDiscountChange(option.id)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mr-2 border ${
                            selectedDiscount === option.id ? "border-gold bg-gold" : "border-gray-300"
                          }`}
                        >
                          {selectedDiscount === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                          )}
                        </div>
                        <span className="text-sm font-serif">{option.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Reset button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gold/30 text-gold-dark hover:bg-gold/5 font-cinzel"
            onClick={handleReset}
          >
            <FilterX className="h-4 w-4" />
            Reset Filters
          </Button>
        </motion.div>

        {/* Premium selection */}
        <Card className="border-gold/30 bg-gradient-to-b from-gold/10 to-cream/50 overflow-hidden shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-gold" />
              <h3 className="font-cinzel text-gold-dark text-lg">Premium Selection</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4 font-serif">
              Discover our handcrafted premium sweets, made with the finest ingredients following traditional recipes.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white font-cinzel shadow-md">
                Explore Premium
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

