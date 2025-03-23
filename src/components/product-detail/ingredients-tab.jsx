export default function IngredientsTab({ product }) {
    const ingredients = product.ingredients || [
      "Sugar",
      "Milk",
      "Ghee (Clarified Butter)",
      "Cardamom",
      "Nuts (as applicable)",
    ]
  
    const allergens = product.allergens || ["Milk", "Nuts"]
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
  
        {allergens.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Allergens</h3>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Contains:</span> {allergens.join(", ")}
            </p>
          </div>
        )}
  
        <div>
          <h3 className="text-lg font-semibold mb-3">Storage Instructions</h3>
          <p className="text-muted-foreground">
            {product.storage || "Store in a cool, dry place. Consume within 7 days for best taste and quality."}
          </p>
        </div>
      </div>
    )
  }
  
  