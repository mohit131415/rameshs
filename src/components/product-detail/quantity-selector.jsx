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
    <div className="flex items-center border border-gold/20 rounded-md">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-3 py-1 text-gold-dark hover:bg-gold/10 transition-colors h-9 rounded-none rounded-l-md"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        -
      </Button>
      <span className="px-4 py-1 border-x border-gold/20 min-w-[40px] text-center">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="px-3 py-1 text-gold-dark hover:bg-gold/10 transition-colors h-9 rounded-none rounded-r-md"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  )
}

