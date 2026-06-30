import { Toaster } from 'react-hot-toast'
import { Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AppLayout from './pages/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Product from './pages/Product'
import SearchResults from './pages/SearchResults'
import Productpage from './pages/ProductPage'
import FlashDeals from './pages/FlashDeals'
import Checkout from './pages/Checkout'
import Address from './pages/Address'
import MyOrder from './pages/MyOrder'
import OrderTracking from './pages/OrderTracking'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from './pages/admin/AdminLayout'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminOrders from './pages/admin/AdminOrders'
import AdminDeliveryPartners from './pages/admin/AdminDeliveryPartners'
import DeliveryLogin from './pages/delivery/DeliveryLogin'



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
        <Route path="search" element={<SearchResults />}/>
        <Route path="FlashDeals" element={<FlashDeals />} />
        {/*restricting for guest*/}
        <Route element={<ProtectedRoute/>}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="addresses" element={<Address />} />
          <Route path="orders" element={<MyOrder />} />
          <Route path="orders/:id" element={<OrderTracking/>} />
        </Route>
      </Route>
      {/*Admin pages*/}
    <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />}/>
        <Route path="products" element={<AdminProducts />}/>
        <Route path="products/new" element={<AdminProductForm />}/>
        <Route path="products/:id/edit" element={<AdminProductForm />}/>
        <Route path="orders" element={<AdminOrders />}/>
        <Route path="delivery-partners" element={<AdminDeliveryPartners />}/>
    </Route>

    <Route path="/delivery/login" element={<DeliveryLogin />}>
      <Route path='delivery' />
    </Route>

    </Routes>
      

    </>
  )
}

export default App;
