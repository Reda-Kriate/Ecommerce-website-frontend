'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import ProductApis from '../utlis/ProductApis'

function ProductSession() {
    const [productListVal , setProductListVal]=useState([])
    useEffect(()=>{
      getLatestProduct_();
  },[])
    const getLatestProduct_ = ()=>{
        ProductApis.getlatestProduct().then(res=>{
            setProductListVal(res.data.data)
        })
    }
  return (
    <>
    <h1 className='text-center text-5xl font-bold pb-8'>Our <span className='text-primary'>New Courses</span> !</h1>
    <div className='p-4'>
      <ProductList productListVal = {productListVal}/>
    </div>
    </>
  )
}

export default ProductSession
