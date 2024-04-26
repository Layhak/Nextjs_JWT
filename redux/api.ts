import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// initialize an empty api service that we'll inject endpoints into later as needed
export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL }),
    endpoints: () => ({}),
})
