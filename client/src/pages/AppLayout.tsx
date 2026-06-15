import Banner from "../components/Banner"
import Navbar from "../components/Navbar"

const AppLayout = () => {
  return (
    <>
    <Banner />
    <Navbar />

    <main className="min-h-screen">
      home page
    </main>
    <footer>footer</footer>
    </>
)
}

export default AppLayout
