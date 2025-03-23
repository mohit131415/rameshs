"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Search, Menu } from "lucide-react"
import { useCart } from "../../context/cart-context"
import { useFavorites } from "../../context/favorites-context"
import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"
import MobileBottomNav from "./mobile-bottom-nav"
import MobileMenu from "./mobile-menu"
import Navigation from "./navigation"
import UserMenu from "./user-menu"

export default function Header({ className }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { favorites } = useFavorites()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track scroll direction and amount
  const [scrollDirection, setScrollDirection] = useState("up")
  const [scrollAmount, setScrollAmount] = useState(0)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY

      // Update scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }

      // Update scroll amount (for parallax effects)
      setScrollAmount(currentScrollY)

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScrollDirection)
    return () => window.removeEventListener("scroll", handleScrollDirection)
  }, [prevScrollY])

  // Calculate header styles based on scroll
  const headerOpacity = Math.min(1, scrollAmount / 200) // Gradually increase opacity as user scrolls
  const headerBlur = Math.min(16, scrollAmount / 30) // Gradually increase blur

  // Dynamic styles for scroll effects
  const headerStyle = {
    boxShadow: isScrolled ? `0 4px 20px rgba(139, 95, 19, ${headerOpacity * 0.1})` : "none",
    backdropFilter: scrollDirection === "up" && isScrolled ? `blur(${headerBlur}px)` : "none",
  }

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gold/20 transition-all duration-300",
          isScrolled ? "shadow-sm" : "",
          scrollDirection === "up" && isScrolled ? "bg-cream/80" : "bg-cream/95",
          className,
        )}
        style={headerStyle}
      >
        {/* Heritage gold line at top */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>

        {/* Background with gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-cream via-cream/70 to-white"
          style={{
            transform: `translateY(${scrollDirection === "down" ? -scrollAmount * 0.05 : 0}px)`,
            opacity: 1 - headerOpacity * 0.3,
          }}
        ></div>

        {/* Heritage pattern overlay */}
        <div
          className="absolute inset-0 heritage-pattern opacity-5"
          style={{
            opacity: 0.05 + headerOpacity * 0.05,
            transform: `scale(${1 + headerOpacity * 0.05})`,
          }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/images/ramesh-logo.svg"
                alt="Ramesh Sweets Logo"
                className="h-12 w-auto -mt-28 -mb-28"
                style={{
                  transform: `scale(${1 - headerOpacity * 0.05})`,
                  transformOrigin: "center left",
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Right Side Actions - ONLY VISIBLE ON DESKTOP */}
            <div className="hidden lg:flex items-center">
              {/* Search Button */}
              <button
                className="p-2 text-gray-700 hover:text-gold transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* User Account - with proper spacing */}
              <div className="ml-4">
                <UserMenu />
              </div>

              {/* Favorites - with proper spacing */}
              <Link
                to="/favorites"
                className="ml-4 p-2 text-gray-700 hover:text-gold transition-colors relative"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Link>

              {/* Cart - with proper spacing */}
              <Link
                to="/cart"
                className="ml-4 p-2 text-gray-700 hover:text-gold transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="primary"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </div>

            {/* Mobile Menu Toggle - Only visible on mobile */}
            <button
              className="p-2 text-gray-700 hover:text-gold transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gold/20 shadow-md z-20 py-4">
            <div className="container mx-auto px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for sweets, gifts, and more..."
                  className="w-full border-2 border-gold/30 rounded-md py-2 px-4 focus:outline-none focus:border-gold"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-dark text-white rounded-md px-4 py-1">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  )
}

