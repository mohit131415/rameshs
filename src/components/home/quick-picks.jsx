"use client"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/cart-context"
import HeritageSectionHeader from "../ui/heritage-section-header"

// Updated quick picks data with Shrikhand removed
const quickPickItems = [
  {
    id: 103,
    name: "Kesar Peda",
    imageSrc: "/sweets_images/kesar peda.jpg",
    price: "₹600",
    weight: "500g",
  },
  {
    id: 104,
    name: "Khoya",
    imageSrc: "/sweets_images/khoya.jpg",
    price: "₹700",
    weight: "500g",
  },
  {
    id: 105,
    name: "Malai Peda",
    imageSrc: "/sweets_images/malai peda.jpg",
    price: "₹650",
    weight: "500g",
  },
  {
    id: 109,
    name: "Methi Laddoo",
    imageSrc: "/sweets_images/methi laddo.jpg",
    price: "₹650",
    weight: "500g",
  },
  {
    id: 110,
    name: "Piss",
    imageSrc: "/sweets_images/piss.jpg",
    price: "₹650",
    weight: "500g",
  },
]

// SVG Decorative Elements
const HeritageCorner = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute ${className}`}
  >
    <path d="M1 1H15M1 1V15M1 1L15 15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="#D4AF37" fillOpacity="0.3" />
  </svg>
)

const HeritagePattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4af37' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "60px",
      }}
    ></div>
  </div>
)

export default function QuickPicks() {
  const { addItem } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number.parseFloat(product.price.replace("₹", "")),
      image: product.imageSrc,
      quantity: 1,
    })
    navigate("/cart")
  }

  return (
    <section className="py-20 relative bg-gradient-to-b from-cream/5 to-cream/20">
      <HeritagePattern />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heritage Section Header */}
        <HeritageSectionHeader
          title="Royal Quick Picks"
          subtitle="Exquisite delicacies crafted with centuries-old recipes, ready for immediate indulgence"
          preTitle="HERITAGE FAVORITES"
          topSymbol="❖"
          bottomSymbol="✦"
        />

        {/* Decorative frame for the entire section */}
        <div className="relative mx-auto max-w-7xl mt-16 mb-16">
          {/* Outer decorative border */}
          <div className="absolute -inset-4 border border-gold/30"></div>

          {/* Main content container with double border */}
          <div className="relative border-2 border-gold/40 p-10 md:p-16 bg-white/90 shadow-lg">
            {/* Corner decorations */}
            <HeritageCorner className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
            <HeritageCorner className="top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-90" />
            <HeritageCorner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90" />
            <HeritageCorner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-180" />

            {/* Inner decorative border */}
            <div className="absolute inset-4 border border-dashed border-gold/30"></div>

            {/* Products grid - 5 items in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {quickPickItems.map((item) => (
                <div key={item.id} className="group">
                  {/* Product card with shadow and border */}
                  <div className="bg-white border border-gold/30 shadow-md transition-all duration-500 group-hover:shadow-xl overflow-hidden">
                    {/* Product image container */}
                    <div className="relative h-48 overflow-hidden border-b border-gold/20">
                      <img
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Weight badge */}
                      <div className="absolute top-3 right-3 bg-gold/90 text-brown text-xs px-2 py-0.5 font-medium">
                        {item.weight}
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-4 bg-gradient-to-b from-cream/20 to-white">
                      <h3 className="font-cinzel text-base font-semibold mb-1 tracking-wide text-center">
                        {item.name}
                      </h3>
                      <p className="text-gold-dark font-bold text-lg mb-4 text-center">{item.price}</p>

                      {/* Button container */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* VIEW button */}
                        <Link to={`/products/${item.id}`} className="block">
                          <button className="w-full border border-gold bg-transparent text-gold font-medium uppercase tracking-wider text-sm py-2 transition-colors duration-300 hover:bg-gold hover:text-black">
                            VIEW
                          </button>
                        </Link>

                        {/* ADD TO CART button */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-gold text-brown font-medium uppercase tracking-wider text-sm py-2 transition-opacity duration-300 hover:opacity-90"
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View all products button */}
        <div className="text-center">
          <Link to="/products" className="inline-block">
            <button className="border border-gold bg-transparent text-gold font-medium uppercase tracking-wider text-sm py-3 px-10 transition-colors duration-300 hover:bg-gold hover:text-black">
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

