"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { formatPrice } from "../../lib/utils"

export default function GiftOptionCard({ option }) {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected(!selected)
  }

  return (
    <div
      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
        selected ? "border-gold bg-gold/5" : "border-gold/20 hover:bg-gold/5"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{option.title}</h4>
        {selected && <Check className="h-4 w-4 text-gold" />}
      </div>

      {option.image && (
        <div className="h-24 w-full mb-2 rounded overflow-hidden">
          <img src={option.image || "/placeholder.svg"} alt={option.title} className="h-full w-full object-cover" />
        </div>
      )}

      <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
      <p className="text-sm font-semibold text-gold-dark">+ {formatPrice(option.price)}</p>
    </div>
  )
}

