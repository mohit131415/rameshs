import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2 } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { useCart } from "../../context/cart-context"
import { formatPrice } from "../../lib/utils"

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const [quantity, setQuantity] = useState(item.quantity)
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10)
    if (newQuantity > 0) {
      setQuantity(newQuantity)
      updateQuantity(item.id, newQuantity)
    }
  }
  
  const handleRemove = () => {
    removeItem(item.id)
  }
  
  const itemPrice = typeof item.price === 'number' 
    ? formatPrice(item.price) 
    : item.price
    
  const itemTotal = typeof item.price === 'number' 
    ? formatPrice(item.price * item.quantity) 
    : `${item.price} × ${item.quantity}`

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gold/10">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mr-4 mb-3 sm:mb-0">
        <Link to={`/products/${item.id}`}>
          <img 
            src={item.image || "/placeholder.svg"} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-grow mr-4">
        <Link to={`/products/${item.id}`} className="font-medium hover:text-gold-dark transition-colors">
          {item.name}
        </Link>
        
        {item.weight && (
          <p className="text-sm text-muted-foreground">{item.weight}</p>
        )}
        
        {item.variant && (
          <p className="text-sm text-muted-foreground">{item.variant}</p>
        )}
        
        <div className="flex items-center mt-2">
          <p className="text-sm text-muted-foreground mr-4">{itemPrice}</p>
          
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
            <select 
              id={`quantity-${item.id}`}
              value={quantity} 
              onChange={handleQuantityChange}
              className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Price and Remove */}
      <div className="flex flex-col items-end mt-3 sm:mt-0">
        <p className="font-medium text-gold-dark">{itemTotal}</p>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-destructive mt-2"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Remove</span>
        </Button>
      </div>
    </div>
  )
}
