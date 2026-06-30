import type { Address } from '../types'
import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from 'lucide-react';

interface AddressCardProps {
  addr: Address;
  onEditHandler: (addr: Address) => void;}

const AddressCard = ({ addr, onEditHandler }: AddressCardProps) => {

const handleDelete =async(id: string ) =>{
    console.log(id)
}

  return (
    <div key={addr._id} className='max-w-3xl bg-white rounded-2xl p-6 flex items-start justify-between'>
        {/*left*/}
        <div className='flex gap-4'>
            <MapPinIcon className="size-5 text-app-green mt-0.5 shrink-0"/>
            <div>
                <div className='flex items-center gap-2 mb-1'>
                    <p className='text-sm font-semibold text-app-green'>{addr.label}</p>
                    {addr.isDefault && (
                        <span className='flex-center gap-1 px-2.5 py-0.5 text-[10px] font-medium bg-app-green text-white rounded-full'>
                            <CheckIcon className='size-2.5' />
                            Default
                        </span>
                    )}
                </div>
                <p className='text-sm text-app-text-light'>{addr.address} , {addr.city} , <br />{addr.state} , {addr.zip}</p>
            </div>
        </div>
        {/*right*/}
        <div className='flex gap-1 items-center flex-row'>
            <button onClick={() => onEditHandler(addr)} className='p-2 flex gap-1 items-center text-app-text-light hover:text-app-green hover:bg-app-cream transition-colors'>
                    <PencilIcon className='size-4'/>  
            </button>
            <button onClick={() => handleDelete(addr._id)} className='p-2 text-app-text-light flex gap-1 items-center hover:text-app-error hover:bg-app-cream transition-colors'>
                    <Trash2Icon className='size-4'/>  
            </button>
        </div>
    </div>
  )
}

export default AddressCard
