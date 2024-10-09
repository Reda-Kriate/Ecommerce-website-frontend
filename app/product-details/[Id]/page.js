'use client'
import React, { useEffect, useState, useContext, Suspense } from 'react'
import oneProduct from '/app/utlis/oneProduct.js';
import ProductCategory from '/app/utlis/ProductCategory.js';
import Breadcrumb from './componentsDyn/Breadcrumb';
import Image from 'next/image';
import { AlignJustify, BadgeAlert, BadgeCheck } from 'lucide-react'
import { ShoppingCart } from 'lucide-react';
import ProductList from '/app/components/ProductList.jsx';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../utlis/CartApis'
import CartContext from '../../../context/CartContext';

function page({params}) {
    const {user} = useUser();
    const router = useRouter(); 
    const [cart,setCart]=useContext(CartContext)

    const [value,setValue]=useState([]);
    const [valueCat,setValueCat]=useState([]);
    const pageid= params?.Id;
    useEffect(()=>{
        datafetch();
    },[pageid])

    const datafetch=()=>{
        oneProduct.getoneproduct(pageid).then(res=>{
         setValue(res.data.data);
         datafetchCategory(res.data.data);
        })
    }

    const datafetchCategory=(product)=>{
        ProductCategory.getProductByCategory(product.attributes.category).then(res=>{
            setValueCat(res.data.data);
        })
    }
    console.log(valueCat)



    const addToCartClick =()=>{
        if(!user){
            console.log("false")
            router.push("/sign-in")
        }else{
            const data = {
                data:{
                    username : user.fullName,
                    email : user.primaryEmailAddress.emailAddress,
                    products : [value?.id]
            }
        }
            CartApis.addToCart(data).then(res=>{
                console.log("cart created successfully",res)
                setCart(oldcart=>[
                    ...oldcart,
                    {
                        id : res?.data?.data?.id,
                        value
                    }
                ])
                console.log("cart is: ",cart)
            }).catch(err=>{
                console.log("cart not created ", err)
            })
        }
        window.location.reload();
    }

  return (
    <div>
        <div className='px-8 py-8 '>
            <Breadcrumb idProduct={value?.id}/>
        </div>

        <div className='flex flex-col md:flex-row'>
            <Image
            src={value?.attributes?.img?.data?.attributes?.url}
            width={500}
            height={400}
            alt='product'
            className='max-w-full p-2 m-auto md:m-1 md:w-1/2 md:object-cover rounded-2xl'
            />

            <div className='w-full pl-4 pr-4 flex flex-col justify-evenly md:w-1/2 max-lg:gap-5 max-lg:mt-6 max-lg:px-6'>
                <h1 className='text-4xl font-bold max-lg:text-3xl'>
                    {value?.attributes?.title}
                    <p className='text-sm text-gray-500 flex flex-row gap-2 items-center '>
                        <AlignJustify className='w-4'/>
                    {value?.attributes?.category}
                </p>
                </h1>

                <p className='text-lg font-semibold max-lg:font-medium text-gray-700'>
                    {value?.attributes?.description[0]?.children[0]?.text}
                </p>
                <p className='flex flex-row gap-2 items-center text-gray-700'>
                    {value?.attributes?.instantDelivery ? <BadgeCheck className='w-5 text-green-600'/> : <BadgeAlert className='w-5 text-red-600'/>}
                    Eligible For Instant Delivery
                </p>
                <p className='text-xl font-extrabold underline text-primary'>
                    ${value?.attributes?.price}
                </p>
                <button className='px-8 py-4 bg-primary text-white w-56 rounded-lg flex flex-row gap-2 items-center justify-center' 
                onClick={()=>addToCartClick()}>
                    <ShoppingCart/>
                    Add to Card
                </button>
            </div>
        
        </div>
        <div>

        </div>
        <div>
            <h1 className='sm:mt-40 mt-14 text-3xl font-semibold ml-10 mb-6'>Similar <span className='text-primary'>Courses </span>:</h1>
          <ProductList productListVal={valueCat}/>
        </div>
    </div>
  )
}

export default page