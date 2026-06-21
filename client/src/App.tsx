import { Toaster } from 'react-hot-toast'
import { Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AppLayout from './pages/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Product from './pages/Product'
import Productpage from './pages/ProductPage'
import FlashDeals from './pages/FlashDeals'
import Cheackout from './pages/Cheackout'
import Address from './pages/Address'
import MyOrder from './pages/MyOrder'
import OrderTracking from './pages/OrderTracking'



const App =() => {
  return ( 
    <>
    <Toaster position='top-right' toastOptions={{duration : 3000 , style :{ background :"#1B3022" , color: "#fff" , borderRadius:"12px" , fontSize : "14px" }}}/>
    
    <Routes>
      {/*auth pages- no navbar     / footer*/}
      <Route path='/login' element={<Login />} />
      {/*main pages -with navbar and footer */}
      <Route path='/' element={<AppLayout />} >
        <Route index element={<Home />} />
        <Route path="products" element={<Product />}/>
        <Route path="products/:id" element={<Productpage />}/>
        <Route path="search" element={<search/>}/>
        <Route path="FlashDeals" element={<FlashDeals />} />
        {/*restricting for guest*/}
        <Route element={<ProtectedRoute/>}>
          <Route path="checkout" element={<Cheackout />} />
          <Route path="address" element={<Address />} />
          <Route path="Order" element={<MyOrder />} />
          <Route path="order/:id" element={<OrderTracking/>} />
        </Route>
      </Route>

    </Routes>
      

    </>
  )
}

export default App;