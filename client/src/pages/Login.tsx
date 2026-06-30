import { useState } from 'react'
import type { FormEvent } from 'react'
import { heroSectionData } from '../assets/assets'
import { BikeIcon, UserIcon ,Mail, LockIcon, Loader2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'



const Login = () => {
  const [isLoginState , setIsloginState] = useState(true)
  const [name ,  setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword ] = useState('')
  const [Loading , setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setLoading(true)
    setTimeout(()=> window.location.href = '/' , 1000)

  }


  return (
    <div className='min-h-screen flex'>
      {/*L side*/}
      <div className='hidden lg:flex lq:w-1/2 bg-app-green relative items-center justify-center w-1/2 '>
        <img className='absolute inset-0 h-full object-cover bg-center opacity-10' src={heroSectionData.hero_image} alt="" />
        <div className='relative text-center px-12'>
            <h2 className='text-4xl font-semibold text-white mb-4'>Welcome back to InstaCart</h2>
            <p className='text-white/60 font-serif text-xl max-w-sm mx-auto'> Fresh groceries and organic produce , deliverd to your doorstep.</p>
        </div>
      </div>
      {/*R side*/}
      <div className='flex-1 flex-center px-4 py-12 bg-app-cream flex-col'>
        <div className="w-full max-w-full justify-center flex-center flex-col mb-6 ">
           {/*logo*/}
          <Link to='/' className='flex gap-2 mb-6'>
            <BikeIcon className="size-8 text-app-green" /> 
            <span className='text-2xl font-semibold text-app-green'>InstaCart</span>
          </Link>

          <h1 className='text-2xl font-semibold text-app-green mb-2'>
            {isLoginState ? 'Sign in to your account' : 'Sign up for an account'}
          </h1>

          <p className='text-sm text-app-text-light'>
            {isLoginState ? "Don't have an account?" : "Already have an account?"}
            <button onClick={()=> setIsloginState(!isLoginState)} className='text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors'> 
              { isLoginState ? "Create one" : "Sign in" } 
            </button>
          </p>

        </div>

          {/*login or register form */}
          <form onSubmit = {handleSubmit} className='space-y-5 w-2xs mx-auto ' >
            {!isLoginState && (
              <div>
              <label className='text-sm flex flex-col gap-1'>
                Name
                  <div className="relative flex items-center w-full">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border focus:border-app-border transition-all"
                    />
                  </div>
              </label>

              </div>
            )}
            
              <label className='text-sm flex flex-col gap-'>
                Email Address
                  <div className="relative flex items-center w-full">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border focus:border-app-border transition-all"
                    />
                  </div>
              </label>

              <label className='text-sm flex flex-col gap-1'>
                Password
                  <div className="relative flex items-center w-full">
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />

                    <input
                      type="Password"
                      value={""}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="............."
                      className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border focus:border-app-border transition-all"
                    />
                  </div>
              </label>
              <button type='submit' disabled={Loading} className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors dissabled:opacity-50">
                { Loading? <Loader2Icon className='animate-spin'/> : isLoginState ? "Sign in" : "Sign up" }
              </button>
          </form>
      </div>
    </div>
  )
}

export default Login
