import { Star, Clock, Users } from 'lucide-react'

export default function ProductMeta({ product }) {
  // Calculate average rating
  const rating = product.rating || 4.5
  const reviews = product.reviews || 0

  return (
    <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
      {/* Rating stars */}
      <div className="flex items-center">
        <div className="flex items-center mr-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? "text-gold fill-gold" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <span>
          {rating} ({reviews} reviews)
        </span>
      </div>

      {/* Shelf life */}
      {product.shelfLife && (
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4 text-gold" />
          <span>{product.shelfLife}</span>
        </div>
      )}

      {/* Serves */}
      {product.serves && (
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4 text-gold" />
          <span>Serves {product.serves}</span>
        </div>
      )}
    </div>
  )
}
