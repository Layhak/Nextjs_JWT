'use client'
import CardProduct from '@/components/card/CardProduct'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import React from 'react'
import { useGetProductsQuery } from '@/redux/service/product'
import { CartProductType } from '@/lib/definitions'

const ENDPOINT = 'https://fakestoreapi.com/products/'

export default function Service() {
    const { data: session } = useSession()
    const router = useRouter()
    const [page, setPage] = React.useState(1)
    const { data, error, isLoading, isFetching } = useGetProductsQuery({
        page: page,
        pageSize: 12,
    })

    console.log('Data:', data)
    console.log('Error:', error)
    console.log('Is Loading:', isLoading)


    return (
        <>
            {session ?
                <div className="h-screen mt-6 container mx-auto grid grid-cols-4 grid-flow-row gap-4">
                    {data?.results?.map((product:CartProductType) => (
                        <CardProduct
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            onClick={() =>router.push(`/service/${product.id}/`)}
                        />
                    ))}
                </div> : <div className="w-full h-screen flex flex-col justify-center items-center">
                    Unauthorize!
                </div>}
        </>
    )
}
