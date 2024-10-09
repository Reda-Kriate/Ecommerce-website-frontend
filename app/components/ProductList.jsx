import React from 'react'
import ProductCard from './ProductCard'

function ProductList({productListVal}) {
  return (
    <div className=' grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4  justify-center items-center m-auto'>
      {
        productListVal.map(item=>(
          <ProductCard value ={item} key={item.id}/>
        ))
      }
    </div>
  )
}

export default ProductList