import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { RootLayout } from "./components/layout/root-layout"
import HomePage from "./pages/home-page"
import ProductsPage from "./pages/products-page"
import ProductDetailPage from "./pages/product-detail-page"
import CartPage from "./pages/cart-page"
import CheckoutPage from "./pages/checkout-page"
import AboutPage from "./pages/about-page"
import ContactPage from "./pages/contact-page"
import NotFoundPage from "./pages/not-found-page"
import { ToastProvider } from "./components/ui/use-toast"

// ScrollToTop component to handle scrolling to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // Instantly scroll to top without animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto" // Use "auto" instead of "smooth" for instant scrolling
    })
  }, [pathname])
  
  return null
}

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}

export default App
