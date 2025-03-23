import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag, Gift } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import { useCart } from "../../context/cart-context"
import { formatPrice } from "../../lib/utils"

export default function CartSummary({ onCheckout }) {
  const { items, totalAmount } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isGiftWrap, setIsGiftWrap] = useState(false)
  
  // Calculate summary values
  const subtotal = totalAmount
  const shipping = subtotal > 500 ? 0 : 50
  const giftWrapCost = isGiftWrap ? 50 : 0
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + giftWrapCost + tax
  
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value)
  }
  
  const handleApplyPromoCode = (e) => {
    e.preventDefault()
    // Promo code logic would go here
    alert(`Promo code "${promoCode}" applied!`)
  }
  
  const handleCheckout = () => {
    onCheckout?.()
  }

  return (
    <div className="bg-cream/30 rounded-lg p-6">
      <h2 className="text-xl font-display font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        
        {isGiftWrap && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gift Wrapping</span>
            <span>{formatPrice(giftWrapCost)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gold/10 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-gold-dark">{formatPrice(total)}</span>
        </div>
      </div>
      
      {/* Promo Code */}
      <form onSubmit={handleApplyPromoCode} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            className="border-gold/20 focus-visible:ring-gold"
          />
          <Button 
            type="submit" 
            variant="outline" 
            className="border-gold text-gold-dark hover:bg-gold/10"
            disabled={!promoCode}
          >
            Apply
          </Button>
        </div>
      </form>
      
      {/* Gift Wrap Option */}
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox 
          id="gift-wrap" 
          checked={isGiftWrap} 
          onCheckedChange={setIsGiftWrap} 
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="gift-wrap" className="flex items-center">
            <Gift className="h-4 w-4 mr-1 text-gold" />
            Add Gift Wrapping
          </Label>
          <p className="text-xs text-muted-foreground">
            Add premium gift wrapping for ₹50
          </p>
        </div>
      </div>
      
      {/* Checkout Button */}
      <Button 
        variant="default" 
        size="lg" 
        className="w-full bg-gold hover:bg-gold-dark text-white"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        {items.length === 0 ? (
          <Link to="/products" className="flex items-center justify-center w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop Now
          </Link>
        ) : (
          <>
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Free shipping on orders above ₹500
      </p>
    </div>
  )
}
