import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import { useCart } from '../components/context/CartContext';
import { HomeIcon, ArrowLeftIcon, LeafIcon, StarIcon, PlusIcon, MinusIcon, ShoppingCartIcon, ArrowRightIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../types';
import Loarding from '../components/Loarding';
import DummyReviewsSection from '../assets/DummyReviewsSection';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, addToCart, updateQuantity, removeFromCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [localQuantity, setLocalQuantity]  = useState(1)


  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0)
    
    const currentProduct = dummyProducts.find((p) => p._id === id)
    setProduct(currentProduct!)
    
    // FIXED: Now filters by the same category, excluding the current product itself
    if (currentProduct) {
      setRelatedProduct(
        dummyProducts.filter((p) => p.category === currentProduct.category && p._id !== currentProduct._id)
      )
    }
    
    setLoading(false)
  }, [id, navigate])

  if (loading) return <Loarding />
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id)
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity 

  const handleMinus = () => {
    if(inCart){
      if(cartItem.quantity > 1) updateQuantity(product._id, cartItem.quantity - 1)
      else removeFromCart(product._id)
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1))
    }
  }

  const handlePlus = () => {
    if(inCart){
       updateQuantity(product._id, cartItem.quantity + 1)
    } else {
      setLocalQuantity(Math.max(1, localQuantity + 1))
    }
  }

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        
        {/* Breadcrumb */}
        <nav className='flex items-center gap-2 text-sm text-app-text-light mb-6'>
          <HomeIcon className="size-4"/>
          <span>/</span>
          <Link to="/products" className='hover:text-app-green transition-colors'>
            products 
          </Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className='hover:text-app-green transition-colors'>
            {categoryLabel}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        
        {/* Back */}
        <button onClick={() => navigate(-1)} className='mb-6 flex items-center gap-0.5  text-app-text-light hover:text-app-green transition-colors'>
          <ArrowLeftIcon className="size-4" />
          Back
        </button>

        {/* Product Details Wrapper */}
        <div className='bg-white/50 rounded-2xl overflow-hidden'>
          
          {/* Main Product Grid (Left Image / Right Info) */}
          <div className='grid md:grid-cols-2 gap-0'>
            
            {/* Left */}
            <div className='relative flex-center p-8 md:p-12 min-h-80 max-h-120 w-auto object-contain'>
              <img src={product.image} alt={product.name} className='max-h-90 w-auto object-contain ' />
              <div className='absolute top-5 left-5 flex flex-wrap gap-1.5'>
                {product.isOrganic && (
                  <span className='flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-app-green text-white rounded-full'>
                      <LeafIcon className="w-3 h-3" />
                      Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className='px-2.5 py-1 text-xs font-medium  bg-app-orange text-white rounded-full'>
                  {product.discount} % OFF
                  </span>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="p-6 md:p-10 flex flex-col justify-center" >
              <p className='text-lg font-semi capitalize'>{categoryLabel}</p>
              <h1 className='text-xl font-semibold text-app-green mb-3 md:text-3xl'>{product.name}</h1>
              
              <div className="flex gap-2 items-center mb-5">
                <div className="flex stroke-orange-500 text-orange-500 items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                      product.rating > index ? (
                        <StarIcon key={index} className='size-4 fill-orange-500 '/>
                      ) : (
                        <StarIcon key={index} className='size-4 '/>
                      )
                  ))}
                </div>
                <p className='text-app-text text-sm'>{product.rating}</p>
                <p className='text-app-text-light text-sm'>({product.reviewCount}  reviews)</p>
              </div>
              
              <div className='flex items-center gap-3'>
                <h1 className='text-2xl font-semibold text-app-green mb-3 md:text-4xl'>{currency}{product.price.toFixed(2)}</h1>
                {product.originalPrice > product.price && 
                  <p className='text-lg font-semi text-app-text-light line-through '>{currency}{product.originalPrice.toFixed(2)} </p>
                }
                <p className='text-sm font-semi text-app-text-light '>/ {product.unit}</p>
              </div>
              
              <p className='text-sm text-app-text-light leading-relaxed mb-6'>{product.description}</p>
              
              <div className='mb-6'>
                {product.stock > 0 ? (
                  <span className='text-sm text-app-success'>
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className='text-sm text-app-error'>
                    Sold Out
                  </span>
                )}
              </div>
              
              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                  <button onClick={handleMinus} className="p-3 hover:bg-app-cream transition-colors">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-semibold min-w-10 text-center">
                    {displayQuantity}
                  </span>
                  <button onClick={handlePlus} className="p-3 hover:bg-app-cream transition-colors">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    if (!inCart) {
                      addToCart(product, localQuantity);
                    }
                  }} 
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"}`}
                >      
                  <ShoppingCartIcon className="w-4 h-4"/>
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div> 

          {/* Reviews and Related Products */}
          <div className="p-6 md:p-10 border-t border-gray-100">
            {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

            {/* Related Products */}
            {relatedProduct.length > 0 && (
              <section className="mt-12 mb-10">
                {/* Header Container */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-app-green">
                      Related Products
                    </h2>
                    <p className="text-sm text-app-text-light mt-1">
                      More from {categoryLabel}
                    </p>
                  </div>
                  
                  <Link 
                    className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
                    to={`/products?category=${product.category}`}
                  >
                    View All <ArrowRightIcon className="size-4" />
                  </Link>
                </div> 

                {/* Product Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8'>
                  {relatedProduct.slice(0, 5).map((rp) => (
                      <ProductCard key={rp._id} product={rp} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage