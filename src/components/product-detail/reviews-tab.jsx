"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "../../components/ui/button"
import ReviewCard from "./review-card"

// Sample reviews
const sampleReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    date: "2 months ago",
    rating: 5,
    review: "Absolutely divine! Perfect sweetness and melt-in-mouth texture. Will definitely order again!",
  },
  {
    id: 2,
    name: "Rajesh Patel",
    date: "3 months ago",
    rating: 4,
    review: "Excellent quality and taste. Reminds me of the sweets my grandmother used to make. Fresh and delicious.",
  },
  {
    id: 3,
    name: "Ananya Banerjee",
    date: "1 month ago",
    rating: 5,
    review:
      "Ordered for a family celebration and everyone loved it. The packaging was beautiful too. Will definitely order again!",
  },
]

export default function ReviewsTab({ product }) {
  const [showWriteReview, setShowWriteReview] = useState(false)

  // Use product reviews if available, otherwise use sample reviews
  const reviews = product.reviewsList || sampleReviews
  const rating = product.rating || 4.5
  const reviewCount = product.reviews || reviews.length

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(rating) ? "text-gold fill-gold" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <span className="text-lg font-semibold">{rating} out of 5</span>
      </div>

      <p className="text-muted-foreground">Based on {reviewCount} reviews</p>

      <Button
        variant="outline"
        className="border-gold text-gold-dark hover:bg-gold/10"
        onClick={() => setShowWriteReview(!showWriteReview)}
      >
        {showWriteReview ? "Cancel" : "Write a Review"}
      </Button>

      {showWriteReview && (
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Write Your Review</h3>
          {/* Review form would go here */}
          <p className="text-muted-foreground mb-3">
            Share your experience with this product. Your review will help other customers make better purchase
            decisions.
          </p>
          <p className="text-sm text-muted-foreground">
            This is a placeholder for a review form. In a real implementation, this would include fields for rating,
            review text, and a submit button.
          </p>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4 mt-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            date={review.date}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </div>
    </div>
  )
}

