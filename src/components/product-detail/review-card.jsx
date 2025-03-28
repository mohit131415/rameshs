import { Star } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"

export default function ReviewCard({ name, date, rating, review }) {
  return (
    <Card className="border-gold/10 bg-cream/30 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-4 relative">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/30"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/30"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30"></div>

        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-cinzel text-gold-dark">{name}</h4>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < rating ? "text-gold fill-gold" : "text-muted-foreground"}`} />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-eb-garamond">{review}</p>
      </CardContent>
    </Card>
  )
}

