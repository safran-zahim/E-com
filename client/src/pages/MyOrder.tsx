import React, { useEffect, useState } from 'react';
import type { Order } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { dummyDashboardOrdersData, statusColors } from '../assets/assets';
import { useCart } from '../components/context/CartContext';
import Loading from '../components/Loading';
import { CalendarIcon, ChevronRightIcon, PackageIcon } from 'lucide-react';

const MyOrder = () => {
  // 1. State and variables are now directly inside the component
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  // 2. Cleaned up tab names
  const tabs = ["all", "placed", "Out For Delivery", "Delivered"];

  const fetchOrders = async () => {
    setOrders(dummyDashboardOrdersData as any);
    setLoading(false);
  };

  const { clearCart } = useCart();

  useEffect(() => {
    if (searchParams.get("")) {
      clearCart();
      setSearchParams({}); 
      
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    } else {
      fetchOrders();
    }
    setLoading(false)
  }, [activeTab, searchParams, clearCart, setSearchParams]);

  return (
    <div className='min-h-screen bg-app-cream mb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-2xl font-semibold text-app-green mb-6'>
          My Orders
        </h1>
        
        {/* Tabs */}
        <div className='flex gap-2 mb-6 overflow-x-auto pb-2'>
          {tabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? "bg-app-green text-white" 
                  : "bg-white text-app-text-light hover:bg-app-cream"
              }`}
            >
              {tab === 'all' ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* Order List */}
        <div>
          {
            loading ? (
              <Loading />
            ) : orders.length === 0 ? (
                <div className='text-center py-16 '>
                    <PackageIcon  className='size-16 text-app-border mx-auto mb-4 '/>
                    <h2 className='text-lg font-medium text-app-green mb-2'>No orders yet</h2>
                    <p className='text-sm text-app-text-light mb-4'>Starting shopping to see your orders here</p>
                    <Link to="/products" className="inline-flex px-4 py-2 bg-app-green text-white text-sm rounded-lg">Start Shopping</Link>
                </div>
            ) :(<div className='space-y-4'>
  {orders.map((order) => (
    <Link 
      key={order._id} 
      to={`/orders/${order._id}`} 
      className="bg-white px-4 py-3 rounded-xl flex flex-col w-full hover:shadow-md transition-shadow"
    > 
      
      {/* --- TOP ROW: Header --- */}
      <div className="flex justify-between items-start w-full mb-4">
        {/* Left Side: Order ID and Date */}
        <div className='flex flex-col items-start'>
          <div className='font-medium text-app-green'>
            Order #{order._id.slice(-8).toUpperCase()}
          </div>
          
          <div className='flex items-center gap-2 mt-1'>
            <CalendarIcon className='size-3 text-app-text-light' />
            <span className='text-app-text-light text-xs'>
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short", 
                day: "numeric", 
                year: "numeric"
              })}
            </span>
          </div>
        </div>

        {/* Right Side: Status Pill and Chevron */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 flex items-center text-xs font-medium rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
            {order.status.toUpperCase()} 
          </span>
          <ChevronRightIcon className='size-5 text-app-text-light' />
        </div>
      </div>

      {/* --- MIDDLE ROW: Images --- */}
      <div className='flex items-center gap-2 mb-3'>
        {order.items.slice(0, 4).map((item, i) => (
          <img 
            key={i} 
            src={item.image} 
            alt={item.name} 
            className='size-12 sm:size-16 rounded-lg object-cover border border-app-border'
          />
        ))}
        {order.items.length > 4 && (
          <div className='size-12 sm:size-16 rounded-lg bg-app-cream flex items-center justify-center text-xs font-semibold text-app-text-light'>
            + {order.items.length - 4}
          </div> 
        )}
      </div>

      {/* --- BOTTOM ROW: Footer Totals --- */}
      <div className='w-full flex justify-between items-center'>
        <div className='text-sm text-app-text-light'>
          {order.items.length} items
        </div>
        <div className='text-app-text font-bold'>
          {currency} {order.total}
        </div>
      </div>

    </Link>
  ))}
</div>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default MyOrder;
