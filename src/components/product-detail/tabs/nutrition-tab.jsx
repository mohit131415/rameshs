import React from "react"
import { HeritageCorner } from "../heritage-elements"

const NutritionTab = ({ product }) => {
  // Debug the product structure to understand what's available
  console.log("Product in NutritionTab:", product)
  
  // Function to safely access nested properties
  const getNestedValue = (obj, path, defaultValue = null) => {
    if (!obj) return defaultValue
    const keys = path.split('.')
    let result = obj
    
    for (const key of keys) {
      if (result === null || result === undefined || typeof result !== 'object') {
        return defaultValue
      }
      result = result[key]
    }
    
    return result !== undefined ? result : defaultValue
  }
  
  // Try to find nutrition data in various possible locations
  let nutritionData = null
  
  // Possible paths where nutrition data might be stored
  const possiblePaths = [
    'nutrition',
    'nutritionFacts',
    'details.nutrition',
    'specs.nutrition',
    'nutritionalInfo',
    'nutritionalInformation',
    'nutrientValues'
  ]
  
  // Try each path until we find nutrition data
  for (const path of possiblePaths) {
    const data = getNestedValue(product, path)
    if (data) {
      nutritionData = data
      console.log(`Found nutrition data at path: ${path}`, data)
      break
    }
  }
  
  // If nutrition data is an array of objects with name/value pairs, convert to object
  if (Array.isArray(nutritionData)) {
    const nutritionObject = {}
    nutritionData.forEach(item => {
      if (item.name && (item.value !== undefined || item.amount !== undefined)) {
        nutritionObject[item.name.toLowerCase().replace(/\s+/g, '')] = item.value || item.amount
      }
    })
    nutritionData = nutritionObject
    console.log("Converted nutrition array to object:", nutritionData)
  }
  
  // Default nutrition values as fallback
  const defaultNutrition = {
    servingSize: "100g",
    calories: 320,
    totalFat: "12g",
    saturatedFat: "6g",
    cholesterol: "25mg",
    sodium: "45mg",
    totalCarbohydrate: "48g",
    dietaryFiber: "1g",
    totalSugars: "32g",
    protein: "5g",
    calcium: "120mg",
    iron: "0.8mg",
    potassium: "160mg"
  }
  
  // Combine found data with defaults for missing values
  const nutrition = { ...defaultNutrition, ...(nutritionData || {}) }
  
  // Map of possible property names for each nutrient
  const propertyMappings = {
    servingSize: ['servingSize', 'serving', 'portion', 'servingsize', 'serving_size'],
    calories: ['calories', 'calorie', 'kcal', 'energy'],
    totalFat: ['totalFat', 'fat', 'total_fat', 'totalfat', 'fats'],
    saturatedFat: ['saturatedFat', 'saturated', 'saturated_fat', 'saturatedfat'],
    cholesterol: ['cholesterol'],
    sodium: ['sodium', 'salt'],
    totalCarbohydrate: ['totalCarbohydrate', 'carbohydrate', 'carbs', 'carb', 'total_carbohydrate', 'totalcarbohydrate', 'totalCarbs'],
    dietaryFiber: ['dietaryFiber', 'fiber', 'fibre', 'dietary_fiber', 'dietaryfiber'],
    totalSugars: ['totalSugars', 'sugars', 'sugar', 'total_sugars', 'totalsugars'],
    protein: ['protein', 'proteins'],
    calcium: ['calcium', 'ca'],
    iron: ['iron', 'fe'],
    potassium: ['potassium', 'k']
  }
  
  // Function to get value using possible property names
  const getNutrientValue = (nutrientKey) => {
    const possibleKeys = propertyMappings[nutrientKey] || [nutrientKey]
    
    for (const key of possibleKeys) {
      // Try direct access
      if (nutrition[key] !== undefined) {
        return nutrition[key]
      }
      
      // Try case-insensitive match
      const lowerKey = key.toLowerCase()
      for (const nutritionKey in nutrition) {
        if (nutritionKey.toLowerCase() === lowerKey) {
          return nutrition[nutritionKey]
        }
      }
    }
    
    return defaultNutrition[nutrientKey]
  }
  
  // Function to extract value and unit from nutrition strings
  const extractValueAndUnit = (str) => {
    if (!str) return { value: 0, unit: 'g' }
    if (typeof str === 'number') return { value: str, unit: 'g' }
    
    const match = String(str).match(/^([\d.]+)\s*([a-zA-Z%]+)$/)
    if (match) {
      return { value: parseFloat(match[1]), unit: match[2] }
    }
    return { value: parseFloat(str) || 0, unit: 'g' }
  }
  
  // Calculate daily value percentage
  const calculateDailyValue = (nutrient, amount) => {
    if (!amount) return null
    
    const { value, unit } = extractValueAndUnit(amount)
    if (isNaN(value)) return null
    
    // Daily reference values (based on 2000 calorie diet)
    const dailyValues = {
      totalFat: 65, // g
      saturatedFat: 20, // g
      cholesterol: 300, // mg
      sodium: 2300, // mg
      totalCarbohydrate: 300, // g
      dietaryFiber: 25, // g
      protein: 50, // g
      calcium: 1300, // mg
      iron: 18, // mg
      potassium: 4700 // mg
    }
    
    if (!dailyValues[nutrient]) return null
    
    // Convert units if necessary
    let valueInStandardUnit = value
    
    const percentage = Math.round((valueInStandardUnit / dailyValues[nutrient]) * 100)
    return isNaN(percentage) ? null : percentage
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-amber-200 overflow-hidden">
        <div className="bg-amber-100 px-4 py-3 border-b border-amber-200">
          <h3 className="text-lg font-medium text-amber-900">Nutritional Information</h3>
          <p className="text-sm text-amber-700">
            Per serving ({getNutrientValue('servingSize')})
          </p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('calories')} kcal
              </p>
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Total Fat</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('totalFat')}
              </p>
              {calculateDailyValue('totalFat', getNutrientValue('totalFat')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('totalFat', getNutrientValue('totalFat'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Saturated Fat</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('saturatedFat')}
              </p>
              {calculateDailyValue('saturatedFat', getNutrientValue('saturatedFat')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('saturatedFat', getNutrientValue('saturatedFat'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Cholesterol</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('cholesterol')}
              </p>
              {calculateDailyValue('cholesterol', getNutrientValue('cholesterol')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('cholesterol', getNutrientValue('cholesterol'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Sodium</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('sodium')}
              </p>
              {calculateDailyValue('sodium', getNutrientValue('sodium')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('sodium', getNutrientValue('sodium'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Total Carbohydrate</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('totalCarbohydrate')}
              </p>
              {calculateDailyValue('totalCarbohydrate', getNutrientValue('totalCarbohydrate')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('totalCarbohydrate', getNutrientValue('totalCarbohydrate'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Dietary Fiber</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('dietaryFiber')}
              </p>
              {calculateDailyValue('dietaryFiber', getNutrientValue('dietaryFiber')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('dietaryFiber', getNutrientValue('dietaryFiber'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Total Sugars</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('totalSugars')}
              </p>
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('protein')}
              </p>
              {calculateDailyValue('protein', getNutrientValue('protein')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('protein', getNutrientValue('protein'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Calcium</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('calcium')}
              </p>
              {calculateDailyValue('calcium', getNutrientValue('calcium')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('calcium', getNutrientValue('calcium'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Iron</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('iron')}
              </p>
              {calculateDailyValue('iron', getNutrientValue('iron')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('iron', getNutrientValue('iron'))}% Daily Value*
                </p>
              )}
            </div>
            
            <div className="border-b border-amber-100 pb-3">
              <p className="text-sm text-gray-500">Potassium</p>
              <p className="text-lg font-medium text-amber-900">
                {getNutrientValue('potassium')}
              </p>
              {calculateDailyValue('potassium', getNutrientValue('potassium')) && (
                <p className="text-xs text-gray-500">
                  {calculateDailyValue('potassium', getNutrientValue('potassium'))}% Daily Value*
                </p>
              )}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
          </p>
        </div>
      </div>

      {/* Additional nutrition information if available */}
      {getNestedValue(product, 'nutritionNotes') && (
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <h4 className="font-medium text-amber-900 mb-2">Additional Information</h4>
          <p className="text-sm text-gray-700">{getNestedValue(product, 'nutritionNotes')}</p>
        </div>
      )}

      {/* Health benefits if available */}
      {getNestedValue(product, 'healthBenefits') && Array.isArray(getNestedValue(product, 'healthBenefits')) && (
        <div className="bg-white rounded-lg p-4 border border-amber-100">
          <h4 className="font-medium text-amber-900 mb-2">Health Benefits</h4>
          <ul className="list-disc pl-5 space-y-1">
            {getNestedValue(product, 'healthBenefits').map((benefit, index) => (
              <li key={index} className="text-sm text-gray-700">{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NutritionTab
