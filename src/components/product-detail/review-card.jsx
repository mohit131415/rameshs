import { Star } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"

export default function ReviewCard({ name, date, rating, review }) {
  return (
    <Card className="border-gold/10 bg-background/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < rating ? "text-gold fill-gold" : "text-muted-foreground"}`} />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{review}</p>
      </CardContent>
    </Card>
  )
}

