import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import { useCart } from '../components/context/CartContext';
import { ArrowLeft, Star, Plus } from 'lucide-react';

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$"
  const {id} = useParams()
  const navigate = useNavigate()
  const {} =useCart()

  return (
    <div>
      
    </div>
  )
}

export default ProductPage
