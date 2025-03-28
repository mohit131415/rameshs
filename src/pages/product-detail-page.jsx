"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { products } from "../data/products"
import ProductGallery from "../components/product-detail/product-gallery"
import ProductInfo from "../components/product-detail/product-info"
import ProductTabs from "../components/product-detail/product-tabs"
import RelatedProducts from "../components/product-detail/related-products"
import { HeritageCornerDecoration } from "../components/ui/heritage-decorations"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch product data
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call with a small delay
    setTimeout(() => {
      // Find the product with the matching ID
      const foundProduct = products.find((p) => p.id === Number.parseInt(id) || p.id === id)

      if (foundProduct) {
        setProduct(foundProduct)

        // Get related products (same category, excluding current product)
        const related = products
          .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3)

        setRelatedProducts(related)
      }

      setIsLoading(false)
    }, 500)
  }, [id])

  // If product not found, redirect to 404
  useEffect(() => {
    if (!isLoading && !product) {
      navigate("/not-found")
    }
  }, [product, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-muted h-[500px] rounded-lg animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-8 w-1/3 bg-muted animate-pulse"></div>
              <div className="h-12 w-3/4 bg-muted animate-pulse"></div>
              <div className="h-6 w-1/4 bg-muted animate-pulse"></div>
              <div className="h-24 w-full bg-muted animate-pulse"></div>
              <div className="h-12 w-full bg-muted animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="pt-4 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-2">
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div
          className="relative bg-cream/30 rounded-xl p-6 mb-12 border border-gold/10 overflow-hidden"
          style={{ zIndex: 20 }}
        >
          {/* Heritage corner decorations */}
          <HeritageCornerDecoration className="absolute inset-0 pointer-events-none" variant="full" />

          {/* Decorative background elements */}
          <div className="absolute top-24 left-12 w-32 h-32 rounded-full bg-gold/5 blur-xl"></div>
          <div className="absolute bottom-24 right-12 w-40 h-40 rounded-full bg-gold/5 blur-xl"></div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Product Gallery */}
            <ProductGallery product={product} />

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}

