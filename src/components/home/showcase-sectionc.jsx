"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { HeritageHeaderDecorationFull } from "../ui/heritage-decorations"
import { useMediaQuery } from "../../hooks/use-media-query"
import { Link } from "react-router-dom"

// 33 Heritage legacy messages - one for each product
const legacyMessages = [
  {
    id: "legacy-1",
    title: "Tradition",
    message: "Crafting exquisite sweets with the same devotion since 1952",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-2",
    title: "Heritage",
    message: "Treasured recipes passed down through generations of master craftsmen",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-3",
    title: "Craftsmanship",
    message: "Every sweet handcrafted with meticulous attention to detail and perfection",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-4",
    title: "Excellence",
    message: "Perfected over seven decades of dedication to the art of sweetmaking",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-5",
    title: "Authenticity",
    message: "Preserving the authentic flavors of India's rich culinary heritage",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-6",
    title: "Quality",
    message: "Using only the finest ingredients to create moments of pure delight",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-7",
    title: "Artistry",
    message: "Each sweet is a canvas for our artisans to express their creativity",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-8",
    title: "Purity",
    message: "Committed to using pure ingredients with no artificial additives",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-9",
    title: "Celebration",
    message: "Creating sweet moments for your most cherished celebrations since 1952",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-10",
    title: "Devotion",
    message: "Made with devotion to satisfy the most discerning sweet connoisseurs",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-11",
    title: "Mastery",
    message: "Mastering the delicate balance of flavors, textures, and aromas",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-12",
    title: "Legacy",
    message: "Carrying forward a sweet legacy that spans three generations",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-13",
    title: "Passion",
    message: "Infusing every creation with passion that you can taste in every bite",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-14",
    title: "Innovation",
    message: "Blending traditional techniques with innovative flavors and presentations",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-15",
    title: "Perfection",
    message: "Striving for perfection in every sweet that leaves our kitchen",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-16",
    title: "Harmony",
    message: "Creating harmony between traditional recipes and modern sensibilities",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-17",
    title: "Dedication",
    message: "Dedicated to preserving the authentic taste of traditional Indian sweets",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-18",
    title: "Indulgence",
    message: "Crafting moments of sweet indulgence for every special occasion",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-19",
    title: "Precision",
    message: "Precise measurements and techniques passed down through generations",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-20",
    title: "Freshness",
    message: "Committed to freshness that you can taste in every delightful bite",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-21",
    title: "Elegance",
    message: "Presenting sweets with an elegance that delights all the senses",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-22",
    title: "Nostalgia",
    message: "Evoking sweet memories with flavors that transport you to childhood",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-23",
    title: "Integrity",
    message: "Maintaining integrity in our ingredients and preparation methods",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-24",
    title: "Refinement",
    message: "Continuously refining our craft to achieve the perfect balance of flavors",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-25",
    title: "Distinction",
    message: "Distinguished by our commitment to excellence in every creation",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-26",
    title: "Inspiration",
    message: "Drawing inspiration from India's diverse culinary traditions",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-27",
    title: "Patience",
    message: "Practicing patience in slow-cooking techniques that develop rich flavors",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-28",
    title: "Richness",
    message: "Creating rich, complex flavors that dance on your palate",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-29",
    title: "Finesse",
    message: "Applying finesse to every step of our sweet-making process",
    accent: "gold-accent-1",
  },
  {
    id: "legacy-30",
    title: "Harmony",
    message: "Balancing sweetness, texture, and aroma in perfect harmony",
    accent: "gold-accent-2",
  },
  {
    id: "legacy-31",
    title: "Reverence",
    message: "Treating sweet-making with the reverence of a sacred art form",
    accent: "gold-accent-3",
  },
  {
    id: "legacy-32",
    title: "Delight",
    message: "Dedicated to creating moments of pure delight with every sweet",
    accent: "gold-accent-4",
  },
  {
    id: "legacy-33",
    title: "Timelessness",
    message: "Crafting timeless flavors that transcend trends and generations",
    accent: "gold-accent-1",
  },
]

// Hardcoded product data - all 33 products
const productData = [
  {
    id: 1,
    name: "Kaju Katli",
    slug: "kaju-katli",
    image: "/sweets_images/kajukatli.webp",
    price: 850,
    description:
      "Diamond-shaped cashew fudge with a melt-in-your-mouth texture. Made with premium cashews and sugar syrup.",
  },
  {
    id: 2,
    name: "Rasmalai",
    slug: "rasmalai",
    image: "/sweets_images/rasmalai.jpg",
    price: 750,
    description: "Soft cottage cheese dumplings soaked in saffron-infused milk, garnished with pistachios.",
  },
  {
    id: 3,
    name: "Gulab Jamun",
    slug: "gulab-jamun",
    image: "/sweets_images/gulab_jamun.jpg",
    price: 650,
    description: "Deep-fried milk solids soaked in rose-flavored sugar syrup. Soft, juicy, and aromatic.",
  },
  {
    id: 4,
    name: "Jalebi",
    slug: "jalebi",
    image: "/sweets_images/JILEBI.webp",
    price: 500,
    description: "Crispy, pretzel-shaped sweets made from fermented batter, deep-fried and soaked in sugar syrup.",
  },
  {
    id: 5,
    name: "Rasgulla",
    slug: "rasgulla",
    image: "/sweets_images/rasgulla.jpg",
    price: 600,
    description: "Spongy cottage cheese balls soaked in light sugar syrup. Soft, spongy, and refreshing.",
  },
  {
    id: 6,
    name: "Milk Cake",
    slug: "milk-cake",
    image: "/sweets_images/MILKCAKE.webp",
    price: 700,
    description: "Dense, fudgy sweet made from reduced milk and sugar, with a caramelized flavor.",
  },
  {
    id: 7,
    name: "Motichoor Laddoo",
    slug: "motichoor-laddoo",
    image: "/sweets_images/Motichoor_Laddoo.webp",
    price: 650,
    description: "Soft, round sweets made from tiny gram flour balls bound together with sugar syrup.",
  },
  {
    id: 8,
    name: "Mango Milk Barfi",
    slug: "mango-milk-barfi",
    image: "/sweets_images/MangoMilkBarfi.webp",
    price: 750,
    description: "Creamy milk fudge infused with real Alphonso mango pulp for a tropical flavor.",
  },
  {
    id: 9,
    name: "Moong Dal Halwa",
    slug: "moong-dal-halwa",
    image: "/sweets_images/MoongdalHalwa.webp",
    price: 800,
    description: "Rich, ghee-laden dessert made from ground moong dal, slow-cooked to perfection.",
  },
  {
    id: 10,
    name: "Modak",
    slug: "modak",
    image: "/sweets_images/MODAK.webp",
    price: 700,
    description: "Dumpling-shaped sweet with a coconut and jaggery filling, traditionally offered to Lord Ganesha.",
  },
  {
    id: 11,
    name: "Basundi",
    slug: "basundi",
    image: "/sweets_images/Basundi.webp",
    price: 650,
    description: "Rich, creamy condensed milk dessert flavored with cardamom, saffron, and garnished with nuts.",
  },
  {
    id: 12,
    name: "Bhugal Double Daker",
    slug: "bhugal-double-daker",
    image: "/sweets_images/bhugal double daker.jpg",
    price: 850,
    description: "Layered Bengali sweet with alternating textures of soft chhena and khoya, flavored with saffron.",
  },
  {
    id: 13,
    name: "Bhugi Mawa",
    slug: "bhugi-mawa",
    image: "/sweets_images/bhugi mawa.jpg",
    price: 750,
    description: "Rich, grainy milk fudge with a distinctive caramelized flavor and cardamom aroma.",
  },
  {
    id: 14,
    name: "Black Currant Katli",
    slug: "black-currant-katli",
    image: "/sweets_images/black current katli.jpg",
    price: 900,
    description: "Modern twist on traditional katli with black currant flavor and a striking purple hue.",
  },
  {
    id: 15,
    name: "Boondi Ladoo",
    slug: "boondi-ladoo",
    image: "/sweets_images/bundhi laddo.jpg",
    price: 600,
    description:
      "Round sweet made from gram flour droplets fried in ghee, soaked in sugar syrup, and shaped into balls.",
  },
  {
    id: 16,
    name: "Chocolate Bites",
    slug: "chocolate-bites",
    image: "/sweets_images/ch. bites.jpg",
    price: 950,
    description: "Fusion sweet combining traditional Indian flavors with premium Belgian chocolate.",
  },
  {
    id: 17,
    name: "Cham Cham",
    slug: "cham-cham",
    image: "/sweets_images/chamcham.jpg",
    price: 700,
    description:
      "Oblong-shaped Bengali sweet made from chhena, soaked in flavored sugar syrup with a colorful appearance.",
  },
  {
    id: 18,
    name: "Coconut Barfi",
    slug: "coconut-barfi",
    image: "/sweets_images/coconut barfi.jpg",
    price: 650,
    description: "Moist, sweet squares made from freshly grated coconut, condensed milk, and cardamom.",
  },
  {
    id: 19,
    name: "Desi Ghee Boondi Ladoo",
    slug: "desi-ghee-boondi-ladoo",
    image: "/sweets_images/desi ghe bondi laddo.jpg",
    price: 750,
    description: "Premium version of boondi ladoo made with pure desi ghee for an authentic, rich flavor.",
  },
  {
    id: 20,
    name: "Kesar Peda",
    slug: "kesar-peda",
    image: "/sweets_images/kesar peda.jpg",
    price: 720,
    description: "Flattened disc-shaped sweet made from milk solids, infused with saffron and cardamom.",
  },
  {
    id: 21,
    name: "Khoya Barfi",
    slug: "khoya-barfi",
    image: "/sweets_images/khoya.jpg",
    price: 680,
    description: "Rich, dense milk fudge made from reduced milk solids, flavored with cardamom and nuts.",
  },
  {
    id: 22,
    name: "Malai Peda",
    slug: "malai-peda",
    image: "/sweets_images/malai peda.jpg",
    price: 750,
    description: "Soft, creamy milk sweet made with fresh cream and milk solids, delicately flavored with cardamom.",
  },
  {
    id: 23,
    name: "Methi Ladoo",
    slug: "methi-ladoo",
    image: "/sweets_images/methi laddo.jpg",
    price: 680,
    description: "Unique sweet with fenugreek seeds, perfect blend of sweet and slightly bitter flavors.",
  },
  {
    id: 24,
    name: "Mysore Pak",
    slug: "mysore-pak",
    image: "/sweets_images/milk mysore.jpg",
    price: 720,
    description: "Royal South Indian sweet made with generous amounts of ghee, gram flour, and sugar.",
  },
  {
    id: 25,
    name: "Mohan Thal",
    slug: "mohan-thal",
    image: "/sweets_images/mohan thall.jpg",
    price: 750,
    description: "Traditional Gujarati sweet made from gram flour, ghee, and sugar, with a fudge-like texture.",
  },
  {
    id: 26,
    name: "Orange Bite",
    slug: "orange-bite",
    image: "/sweets_images/orange bite.jpg",
    price: 850,
    description:
      "Modern fusion sweet with fresh orange flavor in a traditional milk base, perfect balance of citrus and sweet.",
  },
  {
    id: 27,
    name: "Petha",
    slug: "petha",
    image: "/sweets_images/petha.jpg",
    price: 600,
    description: "Translucent soft candy made from ash gourd, famous from Agra, with a unique crystalline texture.",
  },
  {
    id: 28,
    name: "Pista Chikki",
    slug: "pista-chikki",
    image: "/sweets_images/picts chikki.jpg",
    price: 950,
    description: "Premium brittle made with generous amounts of pistachios and jaggery, perfect crunchy texture.",
  },
  {
    id: 29,
    name: "Pista Barfi",
    slug: "pista-barfi",
    image: "/sweets_images/piss.jpg",
    price: 980,
    description: "Luxurious sweet made with pure pistachio paste and milk solids, vibrant green color and rich flavor.",
  },
  {
    id: 30,
    name: "Pista Mawa Ball",
    slug: "pista-mawa-ball",
    image: "/sweets_images/pista mawa ball.jpg",
    price: 920,
    description: "Soft, round sweets made from milk solids and pistachio paste, melt-in-mouth texture.",
  },
  {
    id: 31,
    name: "Rajwadi Pedha",
    slug: "rajwadi-pedha",
    image: "/sweets_images/RajwadiPedha.webp",
    price: 780,
    description: "Royal version of traditional pedha with saffron, cardamom, and nuts, rich and aromatic.",
  },
  {
    id: 32,
    name: "Shrikhand",
    slug: "shrikhand",
    image: "/sweets_images/Shrikhand.webp",
    price: 650,
    description: "Creamy, strained yogurt dessert flavored with saffron, cardamom, and nuts, sweet and tangy.",
  },
  {
    id: 33,
    name: "Kesar Malai Kulfi",
    slug: "kesar-malai-kulfi",
    image: "/sweets_images/rasmalai.jpg",
    price: 700,
    description: "Traditional Indian ice cream made with reduced milk, saffron, and cardamom, rich and creamy.",
  },
]

export default function ShowcaseSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const controls = useAnimation()
  const [activeItemId, setActiveItemId] = useState(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [marqueeSpeed, setMarqueeSpeed] = useState(20) // Slower speed (higher number = slower)
  const [showcaseItems, setShowcaseItems] = useState([])
  const [isMarqueeReversed, setIsMarqueeReversed] = useState(false)

  // Initialize showcase items - ENSURE ALL PRODUCTS AND MESSAGES ARE ALTERNATING
  useEffect(() => {
    // Create the base array of alternating products and messages
    const baseItems = []
    
    // Add products and messages in alternating order
    for (let i = 0; i < productData.length; i++) {
      const product = productData[i]
      const message = legacyMessages[i]
      
      // Add product
      baseItems.push({
        id: `product-${product.id}`,
        type: "product",
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description || "",
      })
      
      // Add message
      baseItems.push({
        ...message,
        type: "legacy",
        id: `legacy-${i+1}-alt`,
      })
    }
    
    // Create a truly infinite loop by duplicating the array multiple times
    // This ensures no visible restart points
    const allItems = [...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems]
    
    setShowcaseItems(allItems)
  }, [])

  // Ref for the scrollable container
  const marqueeRef = useRef(null)
  const itemRefs = useRef([])

  // Parallax effect for background elements
  const [scrollY, setScrollY] = useState(0)
  const parallaxRef = useRef(null)

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const { top } = parallaxRef.current.getBoundingClientRect()
        setScrollY(top)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Adjust marquee speed based on device
  useEffect(() => {
    setMarqueeSpeed(isDesktop ? 5 : 4)
  }, [isDesktop])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Handle product click
  const handleProductClick = (slug) => {
    // This will be handled by the Link component
    setIsMarqueeReversed(!isMarqueeReversed)
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
      {/* Premium background elements with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        {/* Parallax background pattern */}
        <div
          className="absolute inset-0 bg-heritage-pattern opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            backgroundSize: "200px 200px",
          }}
        ></div>

        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gold/5 to-white/80"></div>

        {/* Animated decorative elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent origin-left"
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent origin-right"
        ></motion.div>

        {/* Animated corner decorations */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold/20 rounded-tl-sm origin-top-left"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-gold/20 rounded-tr-sm origin-top-right"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-gold/20 rounded-bl-sm origin-bottom-left"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/20 rounded-br-sm origin-bottom-right"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with premium heritage styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <HeritageHeaderDecorationFull className="mb-4" />
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold text-gold-dark mb-3">
            Heritage Collection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4"></div>
          <p className="font-eb-garamond text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our exquisite selection of traditional sweets, handcrafted with recipes passed down through
            generations
          </p>

          {/* View All Products Button */}
          <Link to="/products">
            <motion.button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-gold-dark/80 to-gold/80 text-white font-cinzel rounded-sm border border-gold/30 hover:shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(211, 174, 110, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>

        {/* Premium heritage marquee */}
        <div className="relative mb-16">
          {/* Premium outer frame with gold leaf accents */}
          <div className="absolute inset-0 -m-1 border border-gold/30 rounded-sm z-10"></div>
          <div className="absolute inset-0 -m-0.5 border border-gold/10 rounded-sm z-10"></div>

          {/* Gold leaf corner accents */}
          <div className="absolute -top-1 -left-1 w-12 h-12 z-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 L100,0 L100,20 C60,20 40,40 40,100 L20,100 C20,60 0,40 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.6)"
                strokeWidth="1"
                className="gold-glow"
              />
              <path
                d="M0,0 L40,0 L40,10 C30,10 20,20 20,40 L10,40 C10,20 0,10 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.8)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-12 h-12 z-20" style={{ transform: "scaleX(-1)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 L100,0 L100,20 C60,20 40,40 40,100 L20,100 C20,60 0,40 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.6)"
                strokeWidth="1"
                className="gold-glow"
              />
              <path
                d="M0,0 L40,0 L40,10 C30,10 20,20 20,40 L10,40 C10,20 0,10 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.8)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 -left-1 w-12 h-12 z-20" style={{ transform: "scaleY(-1)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 L100,0 L100,20 C60,20 40,40 40,100 L20,100 C20,60 0,40 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.6)"
                strokeWidth="1"
                className="gold-glow"
              />
              <path
                d="M0,0 L40,0 L40,10 C30,10 20,20 20,40 L10,40 C10,20 0,10 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.8)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 z-20" style={{ transform: "scale(-1)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 L100,0 L100,20 C60,20 40,40 40,100 L20,100 C20,60 0,40 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.6)"
                strokeWidth="1"
                className="gold-glow"
              />
              <path
                d="M0,0 L40,0 L40,10 C30,10 20,20 20,40 L10,40 C10,20 0,10 0,0 Z"
                fill="none"
                stroke="rgba(211, 174, 110, 0.8)"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Premium marquee wrapper */}
          <div className="relative overflow-hidden rounded-sm p-4">
            {/* Left and right fade gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Marquee container - FIXED FOR TRULY INFINITE LOOP */}
            <div className="relative">
              <motion.div
                ref={marqueeRef}
                initial={{ x: 0 }}
                animate={{
                  x: isMarqueeReversed ? "100%" : "-100%",
                }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: marqueeSpeed * 4,
                    ease: "linear",
                    repeatDelay: 0,
                  },
                }}
                className="flex items-stretch"
                style={{ width: "1000%" }} // Make the container much wider
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 gold-shimmer opacity-30 pointer-events-none"></div>

                {/* Showcase items - products and legacy messages */}
                {showcaseItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    ref={(el) => (itemRefs.current[index] = el)}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index}
                    whileHover={{
                      y: -8,
                      transition: { type: "spring", stiffness: 300, damping: 15 },
                    }}
                    className={`flex-shrink-0 mx-1 md:mx-1.5 relative group ${
                      activeItemId === item.id ? "z-20" : "z-10"
                    } transition-all duration-500`}
                    onHoverStart={() => setActiveItemId(item.id)}
                    onHoverEnd={() => setActiveItemId(null)}
                  >
                    {item.type === "product" ? (
                      // Product image showcase - PREMIUM STYLING
                      <Link to={`/product/${item.slug}`} onClick={() => handleProductClick(item.slug)}>
                        <div className="w-[140px] md:w-[150px] relative overflow-hidden rounded-sm bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold/10 cursor-pointer">
                          {/* Premium border */}
                          <div className="absolute inset-0 p-0.5">
                            <div className="absolute inset-0 border border-gold/20 rounded-sm"></div>
                          </div>

                          {/* Image container */}
                          <div className="relative h-[140px] md:h-[150px] overflow-hidden">
                            <motion.div
                              className="w-full h-full"
                              initial={{ scale: 1 }}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                              }}
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>

                            {/* Premium gold particle effects on hover */}
                            {activeItemId === item.id && (
                              <>
                                {[...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={`particle-${i}`}
                                    initial={{
                                      opacity: 0,
                                      scale: 0,
                                      x: 0,
                                      y: 0,
                                    }}
                                    animate={{
                                      opacity: [0, 1, 0],
                                      scale: [0, 1, 0.5],
                                      x: Math.random() * 100 - 50,
                                      y: Math.random() * 100 - 50,
                                    }}
                                    transition={{
                                      duration: 1.5 + Math.random(),
                                      ease: "easeOut",
                                      delay: i * 0.1,
                                    }}
                                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-gold/60 gold-glow"
                                  ></motion.div>
                                ))}
                              </>
                            )}

                            {/* Decorative corners with animation */}
                            <motion.div
                              className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold/70 opacity-0 group-hover:opacity-100"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{
                                opacity: 1,
                                scale: 1,
                                boxShadow: "0 0 10px rgba(211, 174, 110, 0.5)",
                              }}
                              transition={{ duration: 0.3, delay: 0 }}
                            ></motion.div>
                            <motion.div
                              className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/70 opacity-0 group-hover:opacity-100"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{
                                opacity: 1,
                                scale: 1,
                                boxShadow: "0 0 10px rgba(211, 174, 110, 0.5)",
                              }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            ></motion.div>
                            <motion.div
                              className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/70 opacity-0 group-hover:opacity-100"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{
                                opacity: 1,
                                scale: 1,
                                boxShadow: "0 0 10px rgba(211, 174, 110, 0.5)",
                              }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            ></motion.div>
                            <motion.div
                              className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold/70 opacity-0 group-hover:opacity-100"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{
                                opacity: 1,
                                scale: 1,
                                boxShadow: "0 0 10px rgba(211, 174, 110, 0.5)",
                              }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            ></motion.div>

                            {/* Premium gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>

                            {/* Product name overlay with reveal animation */}
                            <motion.div
                              className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent"
                              initial={{ opacity: 0.8, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <h3 className="font-cinzel text-xs font-semibold text-white">{item.name}</h3>
                              <p className="text-gold-light text-xs mt-0.5">
                                ₹{item.price} <span className="text-xs text-white/70">per 500g</span>
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      // Legacy message showcase - PREMIUM STYLING
                      <div className="w-[140px] md:w-[150px] h-[140px] md:h-[150px] relative overflow-hidden">
                        {/* Premium border with animation */}
                        <motion.div
                          className="absolute inset-0 border-glow"
                          initial={{ opacity: 0.3 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="absolute inset-0 gold-gradient-border rounded-sm"></div>
                        </motion.div>

                        {/* Legacy message content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-gradient-to-br from-white/95 via-white/90 to-white/95">
                          {/* Decorative elements */}
                          <div className="absolute top-2 left-2 w-4 h-4">
                            <div className="w-full h-full border-t border-l border-gold/60"></div>
                            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gold/40 rounded-full"></div>
                          </div>
                          <div className="absolute top-2 right-2 w-4 h-4">
                            <div className="w-full h-full border-t border-r border-gold/60"></div>
                            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-gold/40 rounded-full"></div>
                          </div>
                          <div className="absolute bottom-2 left-2 w-4 h-4">
                            <div className="w-full h-full border-b border-l border-gold/60"></div>
                            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-gold/40 rounded-full"></div>
                          </div>
                          <div className="absolute bottom-2 right-2 w-4 h-4">
                            <div className="w-full h-full border-b border-r border-gold/60"></div>
                            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-gold/40 rounded-full"></div>
                          </div>

                          {/* Decorative background pattern */}
                          <div className="absolute inset-0 bg-heritage-pattern opacity-5"></div>

                          {/* Message content */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center relative z-10"
                          >
                            <div
                              className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center ${item.accent}`}
                            >
                              <div className="w-6 h-6 rounded-full border-2 border-gold/40 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-gold/20 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gold/30"></div>
                                </div>
                              </div>
                            </div>
                            <h3 className="font-cinzel text-xs md:text-sm font-bold text-gold-dark mb-0.5">
                              {item.title}
                            </h3>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-1"></div>
                            <p className="font-eb-garamond text-[10px] leading-tight text-muted-foreground">
                              {item.message}
                            </p>
                          </motion.div>

                          {/* Decorative swirl */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1.5">
                            <svg viewBox="0 0 100 20" className="w-full h-full fill-gold/20">
                              <path d="M0,10 C30,0 70,0 100,10 C70,20 30,20 0,10 Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Heritage quote with animated reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block relative">
            <div className="w-12 h-1 bg-gold/40 mx-auto mb-4"></div>
            <blockquote className="font-eb-garamond text-lg md:text-xl italic text-muted-foreground max-w-3xl mx-auto px-8 relative">
              <span className="absolute top-0 left-0 text-4xl text-gold/30 font-serif">"</span>
              Our sweets are crafted with the same care and devotion as they were when our journey began in 1952,
              preserving the authentic taste of tradition.
              <span className="absolute bottom-0 right-0 text-4xl text-gold/30 font-serif">"</span>
            </blockquote>
            <div className="w-12 h-1 bg-gold/40 mx-auto mt-4"></div>
            <div className="mt-3 font-cinzel text-sm text-gold-dark">— Ramesh Sweets, Since 1952</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
