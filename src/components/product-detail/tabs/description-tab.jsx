import React from "react"
import { HeritageCorner } from "../heritage-elements"

export default function DescriptionTab({ product }) {
  // Fallback content if no product data is provided
  const fallbackDescription = `
    Our traditional sweets are made with the finest ingredients, following recipes passed down through generations. 
    Each sweet is handcrafted with care and attention to detail, ensuring authentic taste and premium quality.
  `

  // Use product data if available, otherwise use fallback content
  const description = product?.description || fallbackDescription
  const features = product?.features || []
  const origin = product?.origin || "Our sweets have been crafted using traditional methods for over 50 years."
  const shelfLife = product?.shelfLife || "7-10 days when stored in a cool, dry place."

  return (
    <div className="relative overflow-y-auto custom-scrollbar p-4">
      <div className="space-y-6">
        {/* Main description */}
        <div className="relative">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">About This Product</h3>
              <div className="prose prose-amber max-w-none">
                <p className="text-gray-700">{description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Origin Story */}
        <div className="relative">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Heritage & Origin</h3>
              <p className="text-gray-700">{origin}</p>
            </div>
          </div>
        </div>

        {/* Storage & Shelf Life */}
        <div className="relative">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Storage & Shelf Life</h3>
              <p className="text-gray-700">{shelfLife}</p>
              <p className="text-gray-700 mt-2">For best taste and texture, consume within 3-4 days of purchase.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage corners for decoration */}
      <HeritageCorner className="absolute top-0 left-0 z-10 opacity-30" rotate={0} />
      <HeritageCorner className="absolute top-0 right-0 z-10 opacity-30" rotate={90} />
      <HeritageCorner className="absolute bottom-0 right-0 z-10 opacity-30" rotate={180} />
      <HeritageCorner className="absolute bottom-0 left-0 z-10 opacity-30" rotate={270} />

        {/* Customer Quote */}
        <div className="relative bg-amber-50 p-4 rounded-lg border border-amber-100 mt-5">
          <div className="absolute -top-3 -left-3 text-amber-500 text-4xl">"</div>
          <div className="absolute -bottom-3 -right-3 text-amber-500 text-4xl">"</div>
          <blockquote className="italic text-gray-700 px-6 py-2">
            The authentic taste of these sweets reminds me of my childhood. Absolutely delicious and made with love!
          </blockquote>
          <div className="text-right text-sm font-medium text-gray-900 mt-2 pr-6">— Satisfied Customer</div>
        </div>
    </div>
  )
}
