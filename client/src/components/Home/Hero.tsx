import { heroSectionData } from '../../assets/assets'
import { LeafIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
<section className='relative overflow-hidden min-h-[540px] mb-10 rounded-3xl flex items-center'>
    <img src={heroSectionData.hero_image} alt="Hero" className='absolute inset-0 h-full w-full object-cover' />
    <div className='absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent'/>
    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full'>
        <div> 
            <span>
                <LeafIcon size-3 /> Farm-Fresh & Organic
            </span>
            <h1 className=''>
                Nourish your home with <span className='text-orange-300'>Earth's finest</span>
            </h1>
            <p className='text-base text-white/70 leading-relaxed mb-8 max-w-md '>
                {heroSectionData.description}
            </p>
            <div>
                <Link to="/products" className='px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition-all flex-center gap-2 active:scale-[0.98]'>
                </Link>
            </div>
        </div>
    </div>
</section>
  )
}

export default Hero
