
import Image from 'next/image'
import React from 'react'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'

function ProductCard({value}) {
  return (
  <Link href={`/product-details/${value?.id}`}>
    <div key={value.id} className=' m-1 p-1 border border-1 border-gray-300 shadow-md bg-gray-100 rounded-lg md:m-2 sm:m-1 hover:shadow-sm hover:bg-gray-50 hover:border-primary hover:shadow-primary active:shadow-xl cursor-pointer'>
        <Image src={value?.attributes?.img?.data?.attributes?.url} width={400} height={350} alt='banner' className='h-[220px] object-cover rounded-t-[7px] '/>
        <div>
            <h2 className={`pl-4 py-4 text-md font-medium max-sm:px-0 max-sm:flex max-sm:justify-center max-sm:items-center`}>
                {value?.attributes?.title}
            </h2>
            <div className='flex flex-row px-3 pb-3 justify-between'>
                <h2 className='underline'>
                  ${value?.attributes?.price}
                </h2>
                  <div className='flex flex-row justify-center items-center'>
                  <AlignJustify className='h-[18px] w-[18px] pr-1' />
                    <h2 className='text-sm text-gray-700'>
                        {value?.attributes?.category}
                    </h2>
                  </div>

            </div>

        </div>
    </div>
</Link>
  )
}

export default ProductCard