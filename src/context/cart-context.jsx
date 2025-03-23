"use client"

import { createContext, useContext, useEffect, useReducer } from "react"
import { useLocalStorage } from "../hooks/use-local-storage"
import { useToast } from "../components/ui/use-toast"

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  recentlyAdded: null,
}

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity = 1 } = action.payload
      const existingItemIndex = state.items.findIndex((i) => i.id === item.id)

      let updatedItems = [...state.items]
      let newQuantity = quantity

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        newQuantity = updatedItems[existingItemIndex].quantity + quantity
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
        }
      } else {
        // Add new item
        updatedItems = [...state.items, { ...item, quantity }]
      }

      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0)
      const totalAmount = updatedItems.reduce((total, item) => {
        const price = typeof item.price === "number" ? item.price : Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
        return total + price * item.quantity
      }, 0)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
        recentlyAdded: { ...item, quantity: newQuantity },
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)

      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0)
      const totalAmount = updatedItems.reduce((total, item) => {
        const price = typeof item.price === "number" ? item.price : Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
        return total + price * item.quantity
      }, 0)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
        recentlyAdded: null,
      }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id })
      }

      const updatedItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))

      // Calculate totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0)
      const totalAmount = updatedItems.reduce((total, item) => {
        const price = typeof item.price === "number" ? item.price : Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
        return total + price * item.quantity
      }, 0)

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalAmount,
        recentlyAdded: null,
      }
    }

    case "CLEAR_CART":
      return initialState

    case "CLEAR_RECENTLY_ADDED":
      return {
        ...state,
        recentlyAdded: null,
      }

    default:
      return state
  }
}

// Create context
const CartContext = createContext()

export function CartProvider({ children }) {
  const [savedCart, setSavedCart] = useLocalStorage("cart", initialState)
  const [state, dispatch] = useReducer(cartReducer, savedCart)
  const { toast } = useToast()

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setSavedCart(state)
  }, [state, setSavedCart])

  // Show toast notification when an item is added to cart
  useEffect(() => {
    if (state.recentlyAdded) {
      toast({
        title: "Added to cart",
        description: `${state.recentlyAdded.name} × ${state.recentlyAdded.quantity} added to your cart.`,
        duration: 3000,
      })

      // Clear recently added after showing toast
      dispatch({ type: "CLEAR_RECENTLY_ADDED" })
    }
  }, [state.recentlyAdded, toast])

  // Add item to cart
  const addItem = (item, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity } })
  }

  // Remove item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  // Clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

