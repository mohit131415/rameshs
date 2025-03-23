"use client"

import { createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/use-local-storage"
import { useToast } from "../components/ui/use-toast"

// Create context
const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", [])
  const { toast } = useToast()

  // Add a product to favorites
  const addFavorite = (product) => {
    setFavorites((prev) => {
      // Check if product already exists in favorites
      if (prev.some((item) => item.id === product.id)) {
        return prev
      }

      // Show toast notification
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
        duration: 3000,
      })

      return [...prev, product]
    })
  }

  // Remove a product from favorites
  const removeFavorite = (productId) => {
    setFavorites((prev) => {
      const product = prev.find((item) => item.id === productId)

      if (product) {
        // Show toast notification
        toast({
          title: "Removed from favorites",
          description: `${product.name} has been removed from your favorites.`,
          duration: 3000,
        })
      }

      return prev.filter((item) => item.id !== productId)
    })
  }

  // Check if a product is in favorites
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  // Toggle a product in favorites
  const toggleFavorite = (productId, productName) => {
    if (isFavorite(productId)) {
      removeFavorite(productId)
    } else {
      // If we have the product name but not the full product object
      if (productName) {
        addFavorite({ id: productId, name: productName })
      } else {
        // Find the product in the favorites
        const product = favorites.find((item) => item.id === productId)
        if (product) {
          addFavorite(product)
        }
      }
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

