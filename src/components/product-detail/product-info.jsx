"use client"

import { useState } from "react"
import { ShoppingBag, Gift } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useCart } from "../../context/cart-context"
import ProductMeta from "./product-meta"
import QuantitySelector from "./quantity-selector"
import { formatPrice } from "../../lib/utils"

export default function ProductInfo({ product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      weight: product.weight,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      weight: product.weight,
    })

    // Navigate to checkout
    window.location.href = "/checkout"
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark rounded-full text-sm font-medium mb-2">
          {product.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{product.name}</h1>

        <ProductMeta product={product} />

        <div className="mt-4">
          <p className="text-2xl font-semibold text-gold-dark">
            {typeof product.price === "number" ? formatPrice(product.price) : product.price}
            <span className="text-sm text-muted-foreground ml-1">/{product.weight || "500g"}</span>
          </p>
        </div>
      </div>

      <p className="text-muted-foreground">{product.longDescription || product.description}</p>

      <div className="flex flex-wrap gap-2">
        {product.tags?.map((tag) => (
          <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full capitalize">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-6 border-t border-gold/10">
        <div className="bg-cream/50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <span className="text-sm text-muted-foreground">
              Total:{" "}
              <span className="font-semibold text-gold-dark">
                {typeof product.price === "number"
                  ? formatPrice(product.price * quantity)
                  : `${product.price} × ${quantity}`}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="default" className="bg-gold hover:bg-gold-dark text-white" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="default" className="bg-maroon hover:bg-maroon-dark text-white" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Gift className="h-4 w-4 text-gold" />
          <span>Gift wrapping available. See options below.</span>
        </div>
      </div>
    </div>
  )
}

