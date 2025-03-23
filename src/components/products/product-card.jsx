"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Heart, ShoppingBag, Star, Award } from "lucide-react"
import { motion } from "framer-motion"
import { formatPrice } from "../../lib/utils"
import { useCart } from "../../context/cart-context"
import { useFavorites } from "../../context/favorites-context"

export default function ProductCard({ product }) {
  const {
    id,
    name,
    description,
    image,
    price,
    category,
    weight = "500g",
    tags = [],
    rating = 4.5,
    reviews = 0,
    discount,
    featured,
  } = product

  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isAdded, setIsAdded] = useState(false)
  const navigate = useNavigate()

  // Safely check if id exists and is a string before using charCodeAt
  const favorite = isFavorite(id)

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(id)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
      weight,
    })

    // Show added indicator
    setIsAdded(true)

    // Navigate to cart page after a short delay
    setTimeout(() => {
      setIsAdded(false)
      navigate("/cart")
    }, 1000)
  }

  // Calculate discounted price if discount exists
  const discountedPrice = discount ? price - (price * discount) / 100 : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-lg overflow-hidden border-2 border-gold/20 shadow-md hover:shadow-2xl transition-all duration-500 h-full">
        {/* Premium gold border for featured products */}
        {featured && <div className="absolute inset-0 border-2 border-gold rounded-lg z-10 pointer-events-none"></div>}

        {/* Heritage corner decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/60 rounded-tl-lg z-10"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/60 rounded-tr-lg z-10"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/60 rounded-bl-lg z-10"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/60 rounded-br-lg z-10"></div>

        {/* Decorative pattern elements */}
        <div className="absolute top-1/2 left-0 w-2 h-12 bg-gold/10 rounded-r-full"></div>
        <div className="absolute top-1/2 right-0 w-2 h-12 bg-gold/10 rounded-l-full"></div>

        {/* Premium badge for featured products */}
        {featured && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-gold/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            <Award className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3 z-20 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            {discount}% OFF
          </div>
        )}

        <Link to={`/products/${id}`} className="block">
          <div className="relative overflow-hidden h-64">
            {/* Product image with zoom effect */}
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Quick view button */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <motion.span
                className="bg-white/90 backdrop-blur-sm text-gold-dark px-4 py-1.5 rounded-full text-sm font-cinzel shadow-lg border border-gold/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quick View
              </motion.span>
            </div>
          </div>
        </Link>

        <div className="p-5 relative">
          {/* Heritage pattern background */}
          <div className="absolute inset-0 heritage-pattern opacity-5"></div>

          <div className="relative">
            {/* Category */}
            <div className="text-xs text-gold font-medium mb-2 uppercase tracking-wider font-cinzel">{category}</div>

            {/* Title */}
            <Link to={`/products/${id}`}>
              <h3 className="font-cinzel text-xl font-semibold mb-2 hover:text-gold-dark transition-colors">{name}</h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-gold fill-gold" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({reviews})</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-serif">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tags
                .filter((tag) => !["bestseller", "new", "seasonal"].includes(tag))
                .map((tag) => (
                  <span key={tag} className="text-xs bg-cream px-2 py-0.5 rounded-full capitalize font-serif">
                    {tag}
                  </span>
                ))}
            </div>

            {/* Price and actions */}
            <div className="flex justify-between items-center">
              <div>
                {discountedPrice ? (
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gold-dark font-cinzel">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-xs text-gray-500 line-through">{formatPrice(price)}</span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-gold-dark font-cinzel">
                    {typeof price === "number" ? formatPrice(price) : price}
                  </span>
                )}
                <span className="text-xs text-gray-500 ml-1 font-serif">/{weight}</span>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full border-2 ${favorite ? "border-red-200 bg-red-50" : "border-gold/30 bg-white"} hover:shadow-md transition-all`}
                  aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={`h-4 w-4 ${favorite ? "text-red-500 fill-red-500" : "text-gold-dark"}`} />
                </motion.button>

                <motion.button
                  onClick={handleAddToCart}
                  className={`p-2 rounded-full ${isAdded ? "bg-green-500 text-white" : "bg-gradient-to-r from-gold to-gold-dark text-white"} hover:shadow-md transition-all`}
                  aria-label="Add to cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingBag className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

