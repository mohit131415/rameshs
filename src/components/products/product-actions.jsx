"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "../../context/cart-context"
import { useFavorites } from "../../context/favorites-context"

export default function ProductActions({ product }) {
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isAdded, setIsAdded] = useState(false)

  const favorite = isFavorite(product.id)

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: product.weight,
    })

    // Show added indicator
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="absolute top-2 right-2 flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`rounded-full p-2.5 shadow-md backdrop-blur-sm transition-colors ${
          favorite ? "bg-red-50 border border-red-200" : "bg-white/90 border border-gold/20"
        }`}
        onClick={handleToggleFavorite}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-4 w-4 ${favorite ? "text-red-500 fill-red-500" : "text-gold-dark"}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`rounded-full p-2.5 shadow-md transition-colors ${
          isAdded ? "bg-green-500 text-white" : "bg-gold text-white"
        }`}
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
      </motion.button>
    </div>
  )
}

