export default function DetailsTab({ product }) {
    return (
      <div className="prose max-w-none">
        <p>{product.longDescription || product.description}</p>
  
        {product.details && (
          <>
            <h3>Product Details</h3>
            <p>{product.details}</p>
          </>
        )}
  
        {product.origin && (
          <>
            <h3>Origin</h3>
            <p>{product.origin}</p>
          </>
        )}
  
        {product.preparation && (
          <>
            <h3>Preparation</h3>
            <p>{product.preparation}</p>
          </>
        )}
  
        {product.servingSuggestion && (
          <>
            <h3>Serving Suggestion</h3>
            <p>{product.servingSuggestion}</p>
          </>
        )}
  
        {!product.details && !product.origin && !product.preparation && !product.servingSuggestion && (
          <>
            <p>
              Our {product.name} is made fresh daily using traditional methods that have been passed down through
              generations. We use only the finest ingredients to ensure authentic taste and premium quality.
            </p>
            <p>Perfect for gifting during festivals, celebrations, or simply to satisfy your sweet cravings.</p>
          </>
        )}
      </div>
    )
  }
  
  