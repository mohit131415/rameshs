import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { HeritageCornerDecoration, HeritageHeaderDecorationFull } from "../ui/heritage-decorations"

const CTASection = () => {
  // SVG pattern for the background
  const patternSvg = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill="#d3ae6e" fillOpacity="0.15">
          <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
        </g>
      </g>
    </svg>
  `

  // Convert SVG to data URL for background
  const patternUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(patternSvg)}")`

  return (
    <section className="py-12 relative overflow-hidden bg-gradient-to-b from-cream to-white">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: patternUrl, backgroundSize: "60px" }}
      ></div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gold/5"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gold/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Premium content container with border */}
          <div className="relative p-8 md:p-12 border border-gold/30 backdrop-blur-sm">
            {/* Corner decorations */}
            <HeritageCornerDecoration className="absolute inset-0" />

            {/* Inner content with dashed border */}
            <div className="relative p-6 md:p-8 border border-dashed border-gold/20">
              <div className="text-center">
                {/* Decorative header element */}
                <HeritageHeaderDecorationFull className="mb-6" />

                <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-4 text-dark-brown">
                  Craving Something Sweet?
                </h2>

                <p className="text-lg font-eb-garamond mb-8 text-dark-brown/80">
                  Order now and get your favorite sweets delivered within 60 minutes. We prepare everything fresh, just
                  for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* Premium gold button */}
                  <Link to="/products" className="group">
                    <button
                      className="h-12 px-8 bg-gold hover:bg-gold-dark text-white font-medium rounded-md 
                      transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Order Now <ShoppingBag className="ml-2 h-5 w-5" />
                      </span>
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-dark 
                        bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                        animate-shimmer"
                      ></span>
                    </button>
                  </Link>

                  {/* Premium outline button */}
                  <Link to="/products">
                    <button
                      className="h-12 px-8 border-2 border-gold/70 text-gold-dark hover:bg-gold/10 
                      font-medium rounded-md transition-all duration-300 flex items-center justify-center"
                    >
                      View Menu <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </Link>
                </div>

                {/* Delivery info with gold accent */}
                <div className="mt-8 inline-block relative">
                  <div className="px-6 py-2 bg-gold/5 border border-gold/20 rounded-full">
                    <p className="text-sm font-medium text-dark-brown/80">
                      Free delivery on orders above ₹500 • Same day delivery available
                    </p>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold/40 rounded-full"></div>
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
    </section>
  )
}

export default CTASection

