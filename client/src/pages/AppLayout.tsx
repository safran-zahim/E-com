import Banner from "../components/Banner"
import CartSidebar from "../components/CartSidebar"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Home from "./Home"

const AppLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />
    <main className="min-h-screen">
    <Home/>
    </main>
    <Footer/>
    <CartSidebar />
    </>
)
}

export default AppLayout
