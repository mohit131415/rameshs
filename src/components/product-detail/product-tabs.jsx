"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import DetailsTab from "./details-tab"
import IngredientsTab from "./ingredients-tab"
import NutritionTab from "./nutrition-tab"
import ReviewsTab from "./reviews-tab"

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <Tabs defaultValue="details" className="mb-12" onValueChange={setActiveTab}>
      <TabsList className="border-b border-gold/10 w-full justify-start rounded-none bg-transparent h-auto p-0">
        <TabsTrigger
          value="details"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent px-4 py-2"
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="ingredients"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent px-4 py-2"
        >
          Ingredients
        </TabsTrigger>
        <TabsTrigger
          value="nutrition"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent px-4 py-2"
        >
          Nutrition
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent px-4 py-2"
        >
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="pt-6">
        <DetailsTab product={product} />
      </TabsContent>

      <TabsContent value="ingredients" className="pt-6">
        <IngredientsTab product={product} />
      </TabsContent>

      <TabsContent value="nutrition" className="pt-6">
        <NutritionTab product={product} />
      </TabsContent>

      <TabsContent value="reviews" className="pt-6">
        <ReviewsTab product={product} />
      </TabsContent>
    </Tabs>
  )
}

