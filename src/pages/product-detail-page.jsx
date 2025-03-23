"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import ProductGallery from "../components/product-detail/product-gallery"
import ProductInfo from "../components/product-detail/product-info"
import ProductTabs from "../components/product-detail/product-tabs"
import GiftOptions from "../components/product-detail/gift-options"
import RelatedProducts from "../components/product-detail/related-products"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch product data
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // This would be your actual API call
      // fetchProduct(id).then(data => setProduct(data))

      // For now, using sample data
      const sampleProduct = {
        id: Number(id),
        name: "Kaju Katli",
        description: "Diamond-shaped cashew fudge with a melt-in-your-mouth texture.",
        longDescription:
          "Kaju Katli is one of the most popular Indian sweets, known for its smooth texture and rich cashew flavor. Our Kaju Katli is made with the finest quality cashews, ground to perfection and mixed with sugar syrup to create a delicate, melt-in-your-mouth experience. Each piece is carefully diamond-cut and topped with a thin layer of edible silver foil.",
        image: "/images/sweets/kaju_katli.jpg",
        gallery: [
          "/images/sweets/kaju_katli.jpg",
          "/images/sweets/kaju_katli_2.jpg",
          "/images/sweets/kaju_katli_3.jpg",
        ],
        price: 850,
        weight: "500g",
        category: "dry-fruits",
        tags: ["bestseller", "premium", "gifting"],
        rating: 4.8,
        reviews: 124,
        ingredients: ["Cashews", "Sugar", "Ghee", "Cardamom", "Edible Silver Foil"],
        allergens: ["Nuts"],
        nutritionalInfo: {
          calories: 220,
          fat: "14g",
          carbs: "22g",
          protein: "5g",
          sugar: "18g",
        },
        shelfLife: "15 days when stored in a cool, dry place",
      }

      setProduct(sampleProduct)

      // Sample related products
      setRelatedProducts([
        {
          id: 2,
          name: "Rasmalai",
          description: "Soft cottage cheese dumplings soaked in saffron-infused milk.",
          image: "/images/sweets/rasmalai.jpg",
          price: 750,
          category: "milk",
        },
        {
          id: 3,
          name: "Gulab Jamun",
          description: "Deep-fried milk solids soaked in rose-flavored sugar syrup.",
          image: "/images/sweets/gulab_jamun.jpg",
          price: 650,
          category: "ghee",
        },
        {
          id: 6,
          name: "Besan Ladoo",
          description: "Round sweets made from roasted gram flour, ghee, and sugar.",
          image: "/images/sweets/besan_ladoo.jpg",
          price: 700,
          category: "ghee",
        },
      ])

      setIsLoading(false)
    }, 1000)
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
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Gift Options */}
        <GiftOptions />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}

