import { Link, useSearchParams } from "react-router-dom"
import type { Product } from "../types"
import { useEffect, useState } from "react"
import { dummyProducts } from "../assets/assets"
import { Home } from "lucide-react"
import ProductCard from "../components/ProductCard"


const SearchResults = () => {

    const [products,setProducts] = useState<Product[]>([])
    const [loarding,setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || "" ;

    useEffect(()=>{
        if(!query) return ;
        setLoading(true)
        setProducts(dummyProducts.filter((p)=>p.name.toLowerCase().includes(query.toLowerCase())))
        setLoading(false)
    },[query])

    return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6 ">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">Search Results</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-app-green mb-1"> Results for "{query}" </h1>
          <p className="text-sm text-app-text-light">{loarding ? "Searching" : `${products.length} Results`}</p>
        </div>

        <div>
          {loarding ? (
            <div className="text-center py-12 text-app-text-light">
              loading ...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              {!loarding && products.length === 0 && (
                <div className="col-span-full text-center py-12 text-app-text-light w-full">
                  No products found.
                  <br />
                  <Link to="/products" className="py-2.5 px-5 inline-flex bg-app-green text-white text-sm font-medium rounded-xl hover:bg-app-green-light transition-colors" >
                    View All Products
                  </Link>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
