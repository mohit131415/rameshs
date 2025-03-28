"use client"

import { Button } from "../../components/ui/button"

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 10 }) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className="flex items-center border border-gold/30 rounded-md overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-3 py-1 text-gold-dark hover:bg-gold/10 transition-colors h-9 rounded-none"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        -
      </Button>
      <span className="px-4 py-1 border-x border-gold/30 min-w-[40px] text-center bg-white/50">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-3 py-1 text-gold-dark hover:bg-gold/10 transition-colors h-9 rounded-none"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  )
}
