import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react"
import RemoteImage from "../ui/remote-image"
import { HeritageCornerDecoration, HeritageDivider } from "../ui/heritage-decorations"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-cream border-t border-gold/30 overflow-hidden">
      {/* Heritage pattern background */}
      <div className="absolute inset-0 heritage-pattern opacity-10 pointer-events-none"></div>

      {/* Top decorative border */}
      <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>

      <div className="container py-16 relative">
        {/* Corner decorations */}
        <HeritageCornerDecoration className="absolute inset-0" variant="full" />

        {/* Decorative circles */}
        <div className="absolute top-24 left-12 w-32 h-32 rounded-full bg-gold/5 blur-xl"></div>
        <div className="absolute bottom-24 right-12 w-40 h-40 rounded-full bg-gold/5 blur-xl"></div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 relative">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 border border-gold/30 rounded-lg"></div>
              <Link to="/" className="relative block p-4">
                <RemoteImage src="/images/ramesh-logo.svg" alt="Ramesh Sweets Logo" className="h-16 w-auto mx-auto" />
              </Link>
            </div>

            <p className="text-muted-foreground font-eb-garamond text-base leading-relaxed">
              Crafting authentic Indian sweets with traditional recipes since 1975. Every bite tells a story of heritage
              and passion.
            </p>

            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/rameshsweetsandcakes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-cinzel text-xl text-gold-dark relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-px bg-gold/40"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-eb-garamond text-base text-muted-foreground hover:text-gold transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/40 rounded-full mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="font-cinzel text-xl text-gold-dark relative inline-block">
              Categories
              <span className="absolute -bottom-1 left-0 w-12 h-px bg-gold/40"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Milk Sweets", path: "/products?category=milk" },
                { label: "Dry Fruits", path: "/products?category=dry-fruits" },
                { label: "Ghee Sweets", path: "/products?category=ghee" },
                { label: "Gift Packs", path: "/products?category=gift-packs" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-eb-garamond text-base text-muted-foreground hover:text-gold transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/40 rounded-full mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="font-cinzel text-xl text-gold-dark relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-px bg-gold/40"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                <span className="font-eb-garamond text-base text-muted-foreground">
                  123 Sweet Lane, Jaipur, Rajasthan, India - 302001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                <span className="font-eb-garamond text-base text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                <span className="font-eb-garamond text-base text-muted-foreground">info@rameshsweets.co.in</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                <span className="font-eb-garamond text-base text-muted-foreground">Open: 9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <HeritageDivider className="my-10" />

        {/* Copyright section */}
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="font-eb-garamond text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} <span className="text-gold-dark">Ramesh Sweets</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy-policy"
                className="font-eb-garamond text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-eb-garamond text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="font-eb-garamond text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
    </footer>
  )
}

