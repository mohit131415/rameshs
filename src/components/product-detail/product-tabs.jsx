"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { HeritageCorner, HeritageDivider } from "./heritage-elements"
import DescriptionTab from "./tabs/description-tab"
import IngredientsTab from "./tabs/ingredients-tab"
import NutritionTab from "./tabs/nutrition-tab"
import ReviewSection from "./review-section"
import "./product-tabs.css"

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "nutrition", label: "Nutrition Facts" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionTab product={product} />
      case "ingredients":
        return <IngredientsTab product={product} />
      case "nutrition":
        return <NutritionTab product={product} />
      default:
        return <DescriptionTab product={product} />
    }
  }

  return (
    <div className="mt-12 mb-16">
      <div className="relative">
        {/* Heritage corners */}
        <HeritageCorner className="absolute -top-3 -left-3" rotate={0} />
        <HeritageCorner className="absolute -top-3 -right-3" rotate={90} />
        <HeritageCorner className="absolute -bottom-3 -right-3" rotate={180} />
        <HeritageCorner className="absolute -bottom-3 -left-3" rotate={270} />

        <div className="border border-amber-200 bg-gradient-to-b from-amber-50/50 to-transparent rounded-lg p-6 shadow-sm">
          {/* Tab navigation */}
          <div className="flex flex-wrap border-b border-amber-200 relative">
            {/* Decorative element */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 text-sm font-medium relative transition-all duration-200 ease-in-out",
                  activeTab === tab.id ? "text-amber-900" : "text-gray-500 hover:text-amber-700",
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content with fixed height */}
          <div className="py-6">
            <div className="h-[425px] overflow-y-auto pr-2 custom-scrollbar">{renderTabContent()}</div>
          </div>
        </div>
      </div>

      {/* Quality Promise Section */}
      <div className="mt-8 bg-amber-50/30 border border-amber-100 rounded-lg p-6">
        <HeritageDivider />
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-medium text-amber-900 mb-3">Our Quality Promise</h3>
          <p className="text-gray-700">
            Every product is crafted with care using traditional methods and premium ingredients. We stand behind the
            quality of our sweets and guarantee your satisfaction.
          </p>
        </div>
        <HeritageDivider />
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <ReviewSection product={product} />
      </div>
    </div>
  )
}

export default ProductTabs

