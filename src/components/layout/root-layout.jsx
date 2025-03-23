import { Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"
import AnnouncementBar from "./announcement-bar"

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

