import { HeritageCorner } from "../heritage-elements"

export default function IngredientsTab({ product }) {
  // Fallback content if no product data is provided
  const fallbackIngredients = "Our sweets are made with premium ingredients including milk, sugar, ghee, and nuts."
  const fallbackIngredientsList = ["Milk", "Sugar", "Ghee", "Nuts", "Cardamom", "Saffron"]
  const fallbackAllergens = ["Milk", "Tree Nuts"]

  // Use product data if available, otherwise use fallback content
  const ingredientsDescription = product?.ingredientsDescription || fallbackIngredients
  const ingredientsList = product?.ingredientsList || fallbackIngredientsList
  const allergens = product?.allergens || fallbackAllergens
  const preparationMethod = product?.preparationMethod || "Traditional method of slow cooking and hand crafting."

  return (
    <div className="relative overflow-y-auto custom-scrollbar p-4">
      <div className="space-y-6">
        {/* Main ingredients description */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ingredients Overview</h3>
          <p className="text-gray-700">{ingredientsDescription}</p>
        </div>

        {/* Ingredients list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ingredientsList.map((ingredient, index) => (
            <div
              key={index}
              className="bg-amber-50/50 rounded-lg p-4 border border-amber-100 flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-amber-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-800 font-medium">{ingredient}</span>
            </div>
          ))}
        </div>

        {/* Allergen information */}
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <div className="flex items-center space-x-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-800"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Allergen Information</h3>
          </div>
          <p className="text-gray-700 mb-2">This product contains the following allergens:</p>
          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800"
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>

        {/* Preparation method */}
        <div className="bg-white rounded-lg p-4 border border-amber-100">
          <div className="flex items-center space-x-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-800"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Preparation Method</h3>
          </div>
          <p className="text-gray-700">{preparationMethod}</p>
        </div>

        {/* Quality promise */}
        <div className="text-center">
          <div className="inline-block">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-800"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-2">Our Quality Promise</h3>
            <p className="text-gray-700 mt-1">
              We use only the finest ingredients with no artificial preservatives or colors.
            </p>
          </div>
        </div>
      </div>

      {/* Heritage corners for decoration */}
      <HeritageCorner className="absolute top-0 left-0 z-10 opacity-30" rotate={0} />
      <HeritageCorner className="absolute top-0 right-0 z-10 opacity-30" rotate={90} />
      <HeritageCorner className="absolute bottom-0 right-0 z-10 opacity-30" rotate={180} />
      <HeritageCorner className="absolute bottom-0 left-0 z-10 opacity-30" rotate={270} />
    </div>
  )
}

