import Navbar from "./components/Navbar"
import NavigationMobile from "./components/NavigationMobile"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="">
        {children}
      </main>
      <NavigationMobile />
    </div>
  )
}
