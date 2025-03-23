import { Gift } from "lucide-react"
import GiftOptionCard from "./gift-option-card"

// Sample gift options
const giftOptions = [
  {
    id: 1,
    title: "Standard Box",
    description: "Elegant box with ribbon",
    price: 100,
    image: "/images/gifts/standard-box.jpg",
  },
  {
    id: 2,
    title: "Premium Box",
    description: "Luxury box with personalized message",
    price: 250,
    image: "/images/gifts/premium-box.jpg",
  },
  {
    id: 3,
    title: "Festival Special",
    description: "Decorative box with diyas",
    price: 350,
    image: "/images/gifts/festival-box.jpg",
  },
]

export default function GiftOptions() {
  return (
    <div className="mb-12 bg-cream/50 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="bg-gold/10 p-3 rounded-full">
          <Gift className="h-6 w-6 text-gold" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-display font-semibold mb-2">Perfect for Gifting</h3>
          <p className="text-muted-foreground mb-6">
            Make someone's day special with our premium gift packaging options.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {giftOptions.map((option) => (
              <GiftOptionCard key={option.id} option={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

