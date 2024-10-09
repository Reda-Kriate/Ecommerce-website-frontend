import React from 'react'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Link from 'next/link';

const Cart = ({frame}) => {
    const [cart,setCart] = useContext(CartContext);
    console.log('cart cart cart :',cart)

  return (
    <div className={`bg-slate-300 w-[250px] h-[300px] absolute top-14 z-10 right-10 border shadow-sm rounded-md overflow-auto mx-10 p-5 ${frame}`}>
            {cart.map((items,i)=>(

            
          <div className="space-y-6" key={i}>
    <ul className="space-y-4">
      <li className="flex items-center gap-4 mb-2">
        <img
          src={items?.products?.attributes?.img?.data?.attributes?.url}
          alt=""
          className="size-16 rounded object-cover"
        />

        <div>
          <h3 className="text-sm text-gray-900 line-clamp-1">{items?.products?.attributes?.title}</h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <dt className="inline">Category:</dt>
              <dd className="inline">{items?.products?.attributes?.category}</dd>
            </div>

            <div>
              <dt className="inline">Price: </dt>
              <dd className="inline">${items?.products?.attributes?.price}</dd>
            </div>
          </dl>
        </div>
      </li>

      
    </ul>
    
    </div>
    ))}
    <div className="mt-5 space-y-4 text-center">
      <Link
        href="/cart"
        className="block rounded border border-primary px-5 py-3 text-sm text-white bg-primary transition hover:ring-1 hover:bg-primaryHover"
      >
        View my cart ({cart?.length})
      </Link>


      <Link
        href="/"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </Link>
    </div>
    </div>
  )
}

export default Cart