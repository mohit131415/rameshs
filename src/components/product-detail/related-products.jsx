"use client"

import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useCart } from "../../context/cart-context"
import { formatPrice } from "../../lib/utils"

export default function RelatedProducts({ products = [] }) {
  if (!products.length) return null

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function RelatedProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    e.preventDefault()

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: product.weight,
    })
  }

  return (
    <Card className="overflow-hidden border-gold/10 hover:shadow-md transition-shadow group">
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-gold/90 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        </div>
      </Link>
      <CardContent className="p-3">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-base font-semibold mb-1 hover:text-gold-dark transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gold-dark">
            {typeof product.price === "number" ? formatPrice(product.price) : product.price}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-gold-dark hover:bg-gold/10 p-0 h-8 w-8"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

