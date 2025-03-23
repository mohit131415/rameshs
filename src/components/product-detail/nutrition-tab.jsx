export default function NutritionTab({ product }) {
    // Default nutrition info if not provided
    const nutritionalInfo = product.nutritionalInfo || {
      calories: 220,
      fat: "14g",
      carbs: "22g",
      protein: "5g",
      sugar: "18g",
      servingSize: "100g",
    }
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Nutritional Information</h3>
          <p className="text-sm text-muted-foreground mb-4">Per {nutritionalInfo.servingSize || "100g"} serving</p>
  
          <div className="bg-cream/50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border-b border-gold/10 pb-2">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-medium">{nutritionalInfo.calories} kcal</p>
              </div>
              <div className="border-b border-gold/10 pb-2">
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="font-medium">{nutritionalInfo.fat}</p>
              </div>
              <div className="border-b border-gold/10 pb-2">
                <p className="text-sm text-muted-foreground">Carbohydrates</p>
                <p className="font-medium">{nutritionalInfo.carbs}</p>
              </div>
              <div className="border-b border-gold/10 pb-2">
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="font-medium">{nutritionalInfo.protein}</p>
              </div>
              <div className="border-b border-gold/10 pb-2">
                <p className="text-sm text-muted-foreground">Sugar</p>
                <p className="font-medium">{nutritionalInfo.sugar}</p>
              </div>
              {nutritionalInfo.fiber && (
                <div className="border-b border-gold/10 pb-2">
                  <p className="text-sm text-muted-foreground">Fiber</p>
                  <p className="font-medium">{nutritionalInfo.fiber}</p>
                </div>
              )}
            </div>
          </div>
  
          <p className="text-xs text-muted-foreground mt-2">
            * Nutritional values are approximate and may vary slightly.
          </p>
        </div>
  
        {product.dietaryInfo && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Dietary Information</h3>
            <p className="text-muted-foreground">{product.dietaryInfo}</p>
          </div>
        )}
      </div>
    )
  }
  
  