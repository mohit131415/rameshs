"use client"

import { useState, useRef, useCallback, useMemo } from "react"
import {
  FilterX,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Percent,
  Award,
  IndianRupee,
  Filter,
  Tag,
  Leaf,
  Gift,
  Cake,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Slider } from "../../components/ui/slider"
import { Check } from "lucide-react"

export default function ProductFilter({
  categories = [],
  tags = [],
  onFilterChange,
  onReset,
  className,
  resultsCount,
  totalProducts,
}) {
  // Refs for filter values to prevent re-renders
  const filterValuesRef = useRef({
    priceRange: [150, 550],
    category: null, // Changed from "All" to null
    tags: [],
    rating: null,
    availability: null,
    discount: null,
    dietary: null,
    occasion: null,
    ingredients: null,
  })

  // UI state (only affects UI, not filtering logic)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    tags: false,
    rating: false,
    availability: false,
    discount: false,
    dietary: false,
    occasion: false,
    ingredients: false,
  })

  // Initialize UI state from refs (one-time only)
  const [priceRangeUI, setPriceRangeUI] = useState(filterValuesRef.current.priceRange)
  const [selectedCategoryUI, setSelectedCategoryUI] = useState(filterValuesRef.current.category)
  const [selectedTagsUI, setSelectedTagsUI] = useState(filterValuesRef.current.tags)
  const [selectedRatingUI, setSelectedRatingUI] = useState(filterValuesRef.current.rating)
  const [selectedAvailabilityUI, setSelectedAvailabilityUI] = useState(filterValuesRef.current.availability)
  const [selectedDiscountUI, setSelectedDiscountUI] = useState(filterValuesRef.current.discount)
  const [selectedDietaryUI, setSelectedDietaryUI] = useState(filterValuesRef.current.dietary)
  const [selectedOccasionUI, setSelectedOccasionUI] = useState(filterValuesRef.current.occasion)
  const [selectedIngredientsUI, setSelectedIngredientsUI] = useState(filterValuesRef.current.ingredients)

  // Debounced filter application
  const applyFilter = useCallback(
    (type, value) => {
      // Update the ref immediately
      filterValuesRef.current[type] = value

      // Debounce the actual filter application
      onFilterChange?.({ type, value })
    },
    [onFilterChange],
  )

  // Toggle section expansion
  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }, [])

  // Handle price change with debounce
  const handlePriceChange = useCallback(
    (value) => {
      setPriceRangeUI(value)

      // Update the ref immediately
      filterValuesRef.current.priceRange = value

      // Debounce the actual filter application
      const timer = setTimeout(() => {
        onFilterChange?.({ type: "price", value })
      }, 300)

      return () => clearTimeout(timer)
    },
    [onFilterChange],
  )

  // Handle category change
  const handleCategoryChange = useCallback(
    (categoryId) => {
      setSelectedCategoryUI(categoryId)
      filterValuesRef.current.category = categoryId
      onFilterChange?.({ type: "category", value: categoryId })
    },
    [onFilterChange],
  )

  // Handle tag toggle
  const handleTagToggle = useCallback(
    (tagId) => {
      setSelectedTagsUI((prev) => {
        const newTags = prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]

        filterValuesRef.current.tags = newTags
        onFilterChange?.({ type: "tag", value: newTags })
        return newTags
      })
    },
    [onFilterChange],
  )

  // Handle rating change
  const handleRatingChange = useCallback(
    (rating) => {
      const newRating = selectedRatingUI === rating ? null : rating
      setSelectedRatingUI(newRating)
      filterValuesRef.current.rating = newRating
      onFilterChange?.({ type: "rating", value: newRating })
    },
    [onFilterChange, selectedRatingUI],
  )

  // Handle availability change
  const handleAvailabilityChange = useCallback(
    (availability) => {
      const newAvailability = selectedAvailabilityUI === availability ? null : availability
      setSelectedAvailabilityUI(newAvailability)
      filterValuesRef.current.availability = newAvailability
      onFilterChange?.({ type: "availability", value: newAvailability })
    },
    [onFilterChange, selectedAvailabilityUI],
  )

  // Handle discount change
  const handleDiscountChange = useCallback(
    (discount) => {
      const newDiscount = selectedDiscountUI === discount ? null : discount
      setSelectedDiscountUI(newDiscount)
      filterValuesRef.current.discount = newDiscount
      onFilterChange?.({ type: "discount", value: newDiscount })
    },
    [onFilterChange, selectedDiscountUI],
  )

  // Handle dietary preference change
  const handleDietaryChange = useCallback(
    (dietary) => {
      const newDietary = selectedDietaryUI === dietary ? null : dietary
      setSelectedDietaryUI(newDietary)
      filterValuesRef.current.dietary = newDietary
      onFilterChange?.({ type: "dietary", value: newDietary })
    },
    [onFilterChange, selectedDietaryUI],
  )

  // Handle occasion change
  const handleOccasionChange = useCallback(
    (occasion) => {
      const newOccasion = selectedOccasionUI === occasion ? null : occasion
      setSelectedOccasionUI(newOccasion)
      filterValuesRef.current.occasion = newOccasion
      onFilterChange?.({ type: "occasion", value: newOccasion })
    },
    [onFilterChange, selectedOccasionUI],
  )

  // Handle ingredients change
  const handleIngredientsChange = useCallback(
    (ingredient) => {
      const newIngredient = selectedIngredientsUI === ingredient ? null : ingredient
      setSelectedIngredientsUI(newIngredient)
      filterValuesRef.current.ingredients = newIngredient
      onFilterChange?.({ type: "ingredients", value: newIngredient })
    },
    [onFilterChange, selectedIngredientsUI],
  )

  // Reset all filters
  const handleReset = useCallback(() => {
    // Reset UI state
    setPriceRangeUI([150, 550])
    setSelectedCategoryUI(null) // Changed from "All" to null
    setSelectedTagsUI([])
    setSelectedRatingUI(null)
    setSelectedAvailabilityUI(null)
    setSelectedDiscountUI(null)
    setSelectedDietaryUI(null)
    setSelectedOccasionUI(null)
    setSelectedIngredientsUI(null)

    // Reset ref values
    filterValuesRef.current = {
      priceRange: [150, 550],
      category: null, // Changed from "All" to null
      tags: [],
      rating: null,
      availability: null,
      discount: null,
      dietary: null,
      occasion: null,
      ingredients: null,
    }

    // Call onReset
    onReset?.()
  }, [onReset])

  // Filter out "All Products" from categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => cat.id !== "All" && cat.name !== "All Products")
  }, [categories])

  // Heritage filter card component
  const HeritageFilterCard = useCallback(
    ({ title, icon, isOpen, onToggle, children, className = "", defaultOpen = false }) => {
      const Icon = icon

      return (
        <Card
          className={`overflow-hidden shadow-md relative ${className}`}
          style={{
            background: "linear-gradient(to bottom, #f9f5e9, #f8f2e0)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40"></div>

          {/* Decorative side elements */}
          <div className="absolute top-1/2 left-0 w-0.5 h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-0.5 h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>

          <div
            className="p-3 flex justify-between items-center cursor-pointer"
            onClick={onToggle}
            style={{
              borderBottom: isOpen ? "1px solid rgba(212, 175, 55, 0.2)" : "none",
            }}
          >
            <h3 className="text-base flex items-center font-cinzel text-gold">
              {Icon && <Icon className="mr-2 h-4 w-4 text-gold" />}
              {title}
            </h3>
            {onToggle &&
              (isOpen ? <ChevronUp className="h-4 w-4 text-gold" /> : <ChevronDown className="h-4 w-4 text-gold" />)}
          </div>

          <AnimatePresence initial={defaultOpen}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative bottom element */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        </Card>
      )
    },
    [],
  )

  // Results count card
  const ResultsCard = useCallback(
    () => (
      <Card
        className="overflow-hidden shadow-md relative"
        style={{
          background: "linear-gradient(to bottom, #f9f5e9, #f8f2e0)",
          borderRadius: "0.5rem",
          border: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40"></div>

        {/* Decorative side elements */}
        <div className="absolute top-1/2 left-0 w-0.5 h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-0.5 h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>

        <CardContent className="p-4">
          {resultsCount !== undefined && totalProducts !== undefined && (
            <div className="text-center">
              <p className="text-sm text-gray-600 font-serif">
                Showing <span className="font-medium text-gold-dark">{resultsCount}</span> of{" "}
                <span className="font-medium text-gold-dark">{totalProducts}</span> products
              </p>

              {/* Decorative element */}
              <div className="mt-2 flex justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Decorative bottom element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      </Card>
    ),
    [resultsCount, totalProducts],
  )

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
        className={`space-y-4 ${!showMobileFilters ? "hidden md:block" : ""} md:max-h-[calc(100vh-200px)] md:overflow-y-auto md:pr-2 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent`}
      >
        {/* Heritage border wrapper */}
        <div className="relative p-0.5 rounded-lg bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/40 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/40 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>

          <div className="space-y-4 p-3 rounded-lg bg-cream/50">
            {/* Results count */}
            <ResultsCard />

            {/* Categories Filter */}
            <HeritageFilterCard
              title="Categories"
              icon={Filter}
              isOpen={expandedSections.categories}
              onToggle={() => toggleSection("categories")}
              defaultOpen={true}
            >
              <div className="p-2 bg-cream/30">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex cursor-pointer items-center rounded-md px-3 py-2.5 text-sm transition-colors relative overflow-hidden
                      ${
                        selectedCategoryUI === category.id
                          ? "bg-cream/80 text-gold-dark font-medium"
                          : "hover:bg-cream/50 text-gray-700"
                      } ${category.id === "premium" ? "premium-category" : ""}`}
                  >
                    {selectedCategoryUI === category.id && <Check className="mr-2 h-4 w-4 text-gold" />}
                    <span className={selectedCategoryUI === category.id ? "ml-0" : "ml-6"}>{category.name}</span>
                    {category.id === "premium" && <span className="premium-badge">★</span>}
                    {/* Show count if available */}
                    {category.count && (
                      <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </HeritageFilterCard>

            {/* Price Range Filter */}
            <HeritageFilterCard
              title="Price Range"
              icon={IndianRupee}
              isOpen={expandedSections.price}
              onToggle={() => toggleSection("price")}
              defaultOpen={true}
            >
              <div className="p-4 bg-cream/30">
                <div className="px-2">
                  {/* Remove the problematic style jsx tag and use className approach instead */}
                  <div className="my-6">
                    <Slider
                      defaultValue={[150, 550]}
                      min={0}
                      max={1000}
                      step={50}
                      value={priceRangeUI}
                      onValueChange={handlePriceChange}
                      className="my-6"
                      thumbClassName="h-4 w-4 bg-white border-2 border-gold rounded-full shadow"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-cream px-3 py-1 rounded-full text-sm font-medium text-gold-dark border border-gold/20">
                      ₹{priceRangeUI[0]}
                    </div>
                    <div className="text-sm text-gray-500 font-serif">to</div>
                    <div className="bg-cream px-3 py-1 rounded-full text-sm font-medium text-gold-dark border border-gold/20">
                      ₹{priceRangeUI[1]}
                    </div>
                  </div>

                  {/* Price range info */}
                  <div className="mt-3 text-xs text-center text-gray-500 font-serif">
                    Adjust the slider to set your desired price range
                  </div>
                </div>
              </div>
            </HeritageFilterCard>

            {/* Tags Filter */}
            <HeritageFilterCard
              title="Special Tags"
              icon={Tag}
              isOpen={expandedSections.tags}
              onToggle={() => toggleSection("tags")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedTagsUI.includes(tag.id) ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm mr-2 border ${
                          selectedTagsUI.includes(tag.id) ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedTagsUI.includes(tag.id) && (
                          <div className="flex items-center justify-center h-full">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-serif">{tag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HeritageFilterCard>

            {/* Dietary Preferences Filter */}
            <HeritageFilterCard
              title="Dietary Preferences"
              icon={Leaf}
              isOpen={expandedSections.dietary}
              onToggle={() => toggleSection("dietary")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[
                    { id: "vegan", label: "Vegan", desc: "No animal products" },
                    { id: "gluten-free", label: "Gluten Free", desc: "No wheat or gluten" },
                    { id: "sugar-free", label: "Sugar Free", desc: "No added sugar" },
                    { id: "organic", label: "Organic", desc: "Organic ingredients" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedDietaryUI === option.id ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleDietaryChange(option.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          selectedDietaryUI === option.id ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedDietaryUI === option.id && <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>}
                      </div>
                      <div>
                        <span className="text-sm font-serif">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dietary info */}
                <div className="mt-3 text-xs text-center text-gray-500 font-serif">
                  Find sweets that match your dietary preferences
                </div>
              </div>
            </HeritageFilterCard>

            {/* Occasion Filter */}
            <HeritageFilterCard
              title="Occasions"
              icon={Gift}
              isOpen={expandedSections.occasion}
              onToggle={() => toggleSection("occasion")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[
                    { id: "diwali", label: "Diwali", desc: "Festival of lights" },
                    { id: "wedding", label: "Wedding", desc: "Celebration of union" },
                    { id: "holi", label: "Holi", desc: "Festival of colors" },
                    { id: "raksha-bandhan", label: "Raksha Bandhan", desc: "Sibling celebration" },
                    { id: "corporate", label: "Corporate Gifts", desc: "Business occasions" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedOccasionUI === option.id ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleOccasionChange(option.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          selectedOccasionUI === option.id ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedOccasionUI === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-serif">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HeritageFilterCard>

            {/* Ingredients Filter */}
            <HeritageFilterCard
              title="Key Ingredients"
              icon={Cake}
              isOpen={expandedSections.ingredients}
              onToggle={() => toggleSection("ingredients")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[
                    { id: "kaju", label: "Cashew (Kaju)", desc: "Rich in flavor" },
                    { id: "badam", label: "Almond (Badam)", desc: "Nutty goodness" },
                    { id: "pista", label: "Pistachio (Pista)", desc: "Green delight" },
                    { id: "coconut", label: "Coconut (Nariyal)", desc: "Tropical flavor" },
                    { id: "milk", label: "Milk (Doodh)", desc: "Creamy texture" },
                    { id: "ghee", label: "Clarified Butter (Ghee)", desc: "Rich aroma" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedIngredientsUI === option.id ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleIngredientsChange(option.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          selectedIngredientsUI === option.id ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedIngredientsUI === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-serif">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ingredients info */}
                <div className="mt-3 text-xs text-center text-gray-500 font-serif">
                  Find sweets made with your favorite ingredients
                </div>
              </div>
            </HeritageFilterCard>

            {/* Rating Filter */}
            <HeritageFilterCard
              title="Customer Rating"
              icon={Star}
              isOpen={expandedSections.rating}
              onToggle={() => toggleSection("rating")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedRatingUI === rating ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleRatingChange(rating)}
                    >
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-gold fill-gold" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-sm font-serif">{rating}+ Stars</span>
                    </div>
                  ))}
                </div>

                {/* Rating info */}
                <div className="mt-3 text-xs text-center text-gray-500 font-serif">
                  Filter by customer ratings to find our most loved products
                </div>
              </div>
            </HeritageFilterCard>

            {/* Availability Filter */}
            <HeritageFilterCard
              title="Availability"
              icon={Clock}
              isOpen={expandedSections.availability}
              onToggle={() => toggleSection("availability")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[
                    { id: "in-stock", label: "In Stock", desc: "Available now" },
                    { id: "same-day", label: "Same Day Delivery", desc: "Get it today" },
                    { id: "next-day", label: "Next Day Delivery", desc: "Get it tomorrow" },
                    { id: "pre-order", label: "Pre-Order Available", desc: "Reserve now" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedAvailabilityUI === option.id ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleAvailabilityChange(option.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          selectedAvailabilityUI === option.id ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedAvailabilityUI === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-serif">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HeritageFilterCard>

            {/* Discount Filter */}
            <HeritageFilterCard
              title="Discounts"
              icon={Percent}
              isOpen={expandedSections.discount}
              onToggle={() => toggleSection("discount")}
            >
              <div className="p-2 bg-cream/30">
                <div className="space-y-1">
                  {[
                    { id: "10-percent", label: "10% and above", desc: "Small savings" },
                    { id: "20-percent", label: "20% and above", desc: "Good deals" },
                    { id: "30-percent", label: "30% and above", desc: "Great savings" },
                    { id: "50-percent", label: "50% and above", desc: "Best offers" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        selectedDiscountUI === option.id ? "bg-cream/80" : "hover:bg-cream/50"
                      }`}
                      onClick={() => handleDiscountChange(option.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-2 border ${
                          selectedDiscountUI === option.id ? "border-gold bg-gold" : "border-gray-300"
                        }`}
                      >
                        {selectedDiscountUI === option.id && (
                          <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-serif">{option.label}</span>
                        <p className="text-xs text-gray-500">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HeritageFilterCard>

            {/* Reset button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gold/30 text-gold-dark bg-gradient-to-r from-cream/50 to-cream/80 hover:bg-gold/10 hover:border-gold/50 font-cinzel"
                onClick={handleReset}
              >
                <FilterX className="h-4 w-4" />
                Reset Filters
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

