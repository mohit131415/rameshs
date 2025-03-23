import { Link } from "react-router-dom"
import { ShoppingBag } from 'lucide-react'
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useCart } from "../../context/cart-context"

export default function SpecialSweetCard({ id, name, description, imageSrc, price, tag }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id,
      name,
      description,
      image: imageSrc,
      price,
      quantity: 1
    })
  }

  return (
    <Card className="overflow-hidden border-gold/10 hover:shadow-xl transition-all duration-300 group h-full">
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        {tag && (
          <div className="absolute top-3 right-3 bg-gold/90 text-white text-xs px-3 py-1 rounded-full">{tag}</div>
        )}
        <div className="absolute -bottom-6 group-hover:-bottom-1 right-3 transition-all duration-300">
          <Button 
            variant="default" 
            size="sm" 
            className="bg-gold hover:bg-gold-dark text-white rounded-full shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gold-dark">{price}</span>
          <Link to={`/products/${id}`}>
            <Button variant="outline" size="sm" className="border-gold text-gold-dark hover:bg-gold/10">
              Order Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
