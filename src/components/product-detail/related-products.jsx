"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { products } from "../../data/products" // Import products from the data file
import { HeritageCorner, HeritageDivider } from "./heritage-elements"

const RelatedProductCard = ({ product }) => {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-lg border border-amber-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
        {/* Heritage corners */}
        <HeritageCorner className="absolute top-0 left-0 z-10 opacity-70" rotate={0} />
        <HeritageCorner className="absolute top-0 right-0 z-10 opacity-70" rotate={90} />
        <HeritageCorner className="absolute bottom-0 right-0 z-10 opacity-70" rotate={180} />
        <HeritageCorner className="absolute bottom-0 left-0 z-10 opacity-70" rotate={270} />

        {/* Product image with fixed height */}
        <div className="h-64 overflow-hidden">
          <img
            src={product.image || product.gallery?.[0] || `/placeholder.svg?height=256&width=256`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product details */}
        <div className="p-4">
          <h3 className="mb-1 text-lg font-medium text-gray-900">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-amber-800">₹{product.price}</span>
              <span className="ml-2 text-sm text-gray-500">{product.weight}</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-600">{product.rating || 4.5}</span>
            </div>
          </div>
        </div>

        {/* Quick view button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={`/products/${product.id}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-amber-800 shadow-md transition-all hover:bg-amber-50"
          >
            Quick View
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RelatedProducts({ currentProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const { id: urlProductId } = useParams()

  // Use either the passed productId prop or the one from URL params
  const productId = currentProductId || urlProductId

  useEffect(() => {
    if (!productId || !products.length) return

    // Find the current product
    const currentProduct = products.find((p) => p.id.toString() === productId.toString())

    if (!currentProduct) return

    // Get related products based on the same category or tags
    const related = products
      .filter((p) => {
        // Don't include the current product
        if (p.id.toString() === productId.toString()) return false

        // Check if products share the same category
        if (currentProduct.category && p.category === currentProduct.category) return true

        // Check if products share any tags
        if (currentProduct.tags && p.tags) {
          return currentProduct.tags.some((tag) => p.tags.includes(tag))
        }

        return false
      })
      .slice(0, 4) // Limit to 4 related products

    // If we don't have enough related products, add some popular ones
    if (related.length < 4) {
      const popularProducts = products
        .filter((p) => p.id.toString() !== productId.toString() && !related.some((r) => r.id === p.id))
        .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
        .slice(0, 4 - related.length)

      setRelatedProducts([...related, ...popularProducts])
    } else {
      setRelatedProducts(related)
    }
  }, [productId, products])

  if (!relatedProducts.length) return null

  return (
    <section className="my-12 px-4">
      {/* Heritage-styled header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-200"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-6">
            <div className="relative inline-block">
              <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
              <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG element */}
      <div className="flex justify-center mb-6">
        <svg width="200" height="30" viewBox="0 0 200 30" fill="none" className="opacity-60">
          <path d="M0 15H85M115 15H200" stroke="#B8860B" strokeWidth="1" />
          <path
            d="M85 15C85 6.75 93.25 0 100 0C106.75 0 115 6.75 115 15C115 23.25 106.75 30 100 30C93.25 30 85 23.25 85 15Z"
            stroke="#B8860B"
            strokeWidth="1"
          />
          <path
            d="M95 15C95 12.25 97.25 10 100 10C102.75 10 105 12.25 105 15C105 17.75 102.75 20 100 20C97.25 20 95 17.75 95 15Z"
            fill="#B8860B"
            fillOpacity="0.3"
          />
          <circle cx="100" cy="15" r="2" fill="#B8860B" />
          <path
            d="M40 15C40 12.25 42.25 10 45 10C47.75 10 50 12.25 50 15C50 17.75 47.75 20 45 20C42.25 20 40 17.75 40 15Z"
            fill="#B8860B"
            fillOpacity="0.1"
          />
          <path
            d="M150 15C150 12.25 152.25 10 155 10C157.75 10 160 12.25 160 15C160 17.75 157.75 20 155 20C152.25 20 150 17.75 150 15Z"
            fill="#B8860B"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* Heritage-styled container */}
      <div className="relative rounded-lg border border-amber-100 bg-gradient-to-b from-amber-50/50 to-transparent p-6 shadow-md">
        {/* Heritage corners */}
        <HeritageCorner className="absolute top-0 left-0 z-10" rotate={0} />
        <HeritageCorner className="absolute top-0 right-0 z-10" rotate={90} />
        <HeritageCorner className="absolute bottom-0 right-0 z-10" rotate={180} />
        <HeritageCorner className="absolute bottom-0 left-0 z-10" rotate={270} />

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-8 flex justify-center">
          <a
            href="/products"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-amber-300 bg-white px-6 py-3 font-medium text-amber-800 shadow-sm transition-all duration-300 hover:border-amber-400 hover:bg-amber-50"
          >
            <span className="relative">View All Products</span>
            <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mt-6 flex justify-center">
        <HeritageDivider />
      </div>
    </section>
  )
}

