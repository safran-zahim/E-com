import Banner from "../components/Banner"
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
    </>
)
}

export default AppLayout
