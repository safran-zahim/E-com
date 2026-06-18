   import { ArrowUpRightIcon, BikeIcon, CalendarHeartIcon, ChevronDownIcon, LogOutIcon, MapPinIcon, MenuIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from 'lucide-react'
   import React, { useState } from 'react';
   import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext';

   const Navbar = () => {
    const user :any ={name: "Safran Zahim" , email:"safran1600014@gmail.com" , isAdmin:true}
      const {cartCount, setIsCartOpen} =useCart();
      const [searchQuery , setSearchQuery] = useState('')
      const [userMenuOpen, setUserMenuOpen] = useState(false)
      const navigate = useNavigate()

      const handleSearch=(e :React.SubmitEvent)=>{
         e.preventDefault()
         if(searchQuery.trim()){
            navigate('/search?q=${encodeUriComponent(searchQuery.trim()}')
            setSearchQuery('')
         }
      }

      const handleLogout =() =>{
        setUserMenuOpen(false)
        navigate('/')
      }

   return (
         <nav className='bg-white sticky top-0 z-10 border-b py-2 border-app-border'>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
               <Link to='/' className='flex items-center gap-2'>
                  <BikeIcon className="size-6 text-app-green" /> 
                  <span className='text-xl font-semibold text-app-green'>InstaCart</span>
               </Link>
               {/*Navbar desktop*/}
               <div className='hidden md:flex items-center gap-6 text-sm text-zinc-600'>
                  <Link to='/'> Home </Link>
                  <Link to='/products'> Products </Link>
                  <Link to='/deals' className='text-app-orange'> Deals </Link>
               </div>
               {/* Search   */}
               <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm">
               <div className="relative w-full">
                  <SearchIcon 
                     className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" 
                  />

                  <input
                     type="text"
                     placeholder="Search for groceries ..."
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange"
                  />
               </div>
               </form>
               {/*Right Actions */}
               <div className='flex items-center gap-3'>
                  {/*Cart */}
                  <button className='relative p-2 rounded-xl' onClick={()=>setIsCartOpen(true)}>
                     <ShoppingCartIcon className='size-5 text-zinc-900' />
                     { cartCount > 0 && <span className="absolute top-0 right-0 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">{cartCount}</span>}
                  </button>
                  {/* user */}
{/* user */}
<div className='relative'>
  {user ? (
    // LOGGED IN VIEW: Just the button
    <button className='flex items-center gap-2 p-2' onClick={() => setUserMenuOpen(!userMenuOpen)}>
      <div className='size-7 rounded-full bg-green-950 text-white flex-center'>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <ChevronDownIcon className='size-3 text-zinc-500 ' />
    </button>
  ) : (
    // LOGGED OUT VIEW: Sign in link & Mobile menu icons
    <div className='flex-center gap-2 '>
      <Link to='/login' className='hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors'>
        <UserIcon size={16} /> Sign In
      </Link>
      {userMenuOpen ? (
        <XIcon className='md:hidden' onClick={() => setUserMenuOpen(!userMenuOpen)} />
      ) : (
        <MenuIcon className='md:hidden' onClick={() => setUserMenuOpen(!userMenuOpen)} />
      )}
    </div>
  )}

  {/* DROPDOWN MENU: Moved outside the ternary operator so it can trigger properly */}
  {userMenuOpen && (
    <>
      <div className='fixed inset-0 z-40' onClick={() => setUserMenuOpen(false)} />
      <div className='absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in'>
        {user && (
          <div className="px-4 py-2 border-b border-app-border">
            <p className='text-sm font-semibold text-zinc-900 truncate'>{user?.name}</p>
            <p className='text-xs text-zinc-500 truncate'>{user?.email}</p>
          </div>
        )}
        
        <div onClick={() => setUserMenuOpen(false)}>
          {!user && <Link to='/login' className='dropdown-link'><UserIcon size={16} /> Sign In</Link>}
          {user && <Link to='/orders' className='dropdown-link'><CalendarHeartIcon size={16} /> My Orders</Link>}
          {user && <Link to='/addresses' className='dropdown-link'><MapPinIcon size={16} /> Addresses </Link>}
          
          <Link className='dropdown-link md:hidden' to="/products"> <ArrowUpRightIcon size={16} /> Products </Link>
          <Link className='dropdown-link md:hidden' to="/deals"> <ArrowUpRightIcon size={16} /> Deals </Link>
          
          {user?.isAdmin && (
            <Link to='/admin/products' className='dropdown-link'>
              <ShieldIcon size={16} className='text-app-orange-dark' />
              <span className='text-app-orange-dark'> Admin Panel</span>
            </Link>
          )}

          {user && (
            <div className='border-t border-app-border pt-1'>
              <button onClick={handleLogout} className='flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors'>
                <LogOutIcon size={16} className='text-red-500' /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )}
</div>

               </div>

            </div>


         </nav>
   )
   }

   export default Navbar
