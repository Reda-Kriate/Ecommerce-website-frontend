'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import CartContext from '../../context/CartContext'
import CartApis from '../utlis/CartApis'
import Cart from './Cart.jsx'

function Header() {

  const {user} = useUser();
  console.log("href" , window.location.href.toString().includes("sign-in","sign-up"));
  useEffect(()=>{
    setLogged(window.location.href.toString().includes("sign-in"))
    setLogged1(window.location.href.toString().includes("sign-up"))
  },[])
  useEffect(()=>{
    user&&getdatausercart();
  },[user])
  const getdatausercart = ()=>{
    CartApis.getusercart(user.primaryEmailAddress.emailAddress).then(res=>{
      console.log('data cart is :',res?.data?.data);
      res?.data?.data.forEach(cItems => {
        setCart((oldcart) => [
          ...oldcart,
          {
            id : cItems.id,
            products : cItems?.attributes?.products?.data[0],
          }
        ])
        
      });
    }).catch(err=>{
      console.log('no data cart here',err);
    })
  }

  const handleClick = ()=>{
    if(click === "hidden"){
      setClick("block");
    }else{
      setClick("hidden")
    }
  } 

  const [click,setClick] = useState("hidden")
  const [logged , setLogged] = useState();
  const [logged1 , setLogged1] = useState();
  const [cart,setCart] = useContext(CartContext);

  return !logged && !logged1 &&(
    <header className="bg-white">
  <div className="mx-auto max-w-screen-xl shadow-md rounded-lg px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
        <a className="block text-primary" href="#">
          <span className="sr-only">Home</span>
          <Image src='/logo.svg' alt='logo' width={50} height={50} className='w-auto h-auto'/>
        </a>
      </div>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About US </a>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">

        <div className="sm:flex sm:gap-4">
        {
          !user ? 
          <>
          <a
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-primaryHover active:bg-violet-600"
          href="/sign-in"
        >
            Login
        </a>
        <a className="rounded-md bg-slate-50 px-5 py-2.5 text-sm font-medium text-primary shadow hover:bg-slate-100 "
           href="/sign-up">
          Registre
        </a> 
        </>
          :
          <div className='flex flex-row gap-3 items-center justify-center'>

            <div className='flex flex-row gap-1 items-center cursor-pointer' onClick={()=>handleClick()}>           
               <ShoppingCart/>
               <p>({cart?.length})</p>
               <Cart frame={click}/>
            </div>

          <a href="">
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </a>
          </div>
        }





        </div>

        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
    
  )
}

export default Header