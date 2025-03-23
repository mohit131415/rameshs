import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import MegaMenu from "./mega-menu"

// Category menu items
const categoryItems = [
  {
    heading: "Sweet Types",
    links: [
      { label: "Milk Sweets", href: "/products?category=milk", image: "/sweets_images/MangoMilkBarfi.webp" },
      { label: "Dry Fruit Sweets", href: "/products?category=dry-fruits", image: "/sweets_images/kajukatli.webp" },
      { label: "Ghee Sweets", href: "/products?category=ghee", image: "/sweets_images/Motichoor_Laddoo.webp" },
      { label: "Bengali Sweets", href: "/products?category=bengali", image: "/sweets_images/rasmalai.jpg" },
    ],
  },
  {
    heading: "Special Collections",
    links: [
      { label: "Festive Specials", href: "/products?category=festive", image: "/sweets_images/MODAK.webp" },
      { label: "Gift Packs", href: "/products?category=gifting", image: "/sweets_images/Shrikhand.webp" },
      { label: "Sugar-Free Options", href: "/products?category=sugar-free", image: "/sweets_images/MILKCAKE.webp" },
      { label: "Premium Selection", href: "/products?category=premium", image: "/sweets_images/RajwadiPedha.webp" },
    ],
  },
]

// Corporate gifts menu items
const corporateGiftItems = [
  {
    heading: "Corporate Offerings",
    links: [
      { label: "Corporate Gift Boxes", href: "/corporate-gifts/boxes", image: "/sweets_images/MoongdalHalwa.webp" },
      { label: "Branded Sweets", href: "/corporate-gifts/branded", image: "/sweets_images/JILEBI.webp" },
      { label: "Bulk Corporate Orders", href: "/corporate-gifts/bulk", image: "/sweets_images/Basundi.webp" },
    ],
  },
]

// Wedding gifts menu items
const weddingGiftItems = [
  {
    heading: "Wedding Collections",
    links: [
      { label: "Wedding Favor Boxes", href: "/wedding-gifts/favors", image: "/sweets_images/gulab_jamun.jpg" },
      { label: "Trousseau Packing", href: "/wedding-gifts/trousseau", image: "/sweets_images/chamcham.jpg" },
      { label: "Gift Hampers", href: "/wedding-gifts/hampers", image: "/sweets_images/rasgulla.jpg" },
    ],
  },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/products" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Sweets Library
          </Link>
        </li>
        <li>
          <MegaMenu title="Categories" items={categoryItems} columns={2} />
        </li>
        <li>
          <MegaMenu title="Corporate Gifts" items={corporateGiftItems} />
        </li>
        <li>
          <MegaMenu title="Wedding Gifts" items={weddingGiftItems} />
        </li>
        <li>
          <Link
            to="/bulk-order"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/bulk-order" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Bulk Order
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/contact" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
