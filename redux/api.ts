import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/store'
import { setAccessToken } from '@/redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    // check result of each query. if it's a 401, we'll try to re-authenticate
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.status === 401) {
        const res = await fetch('http://localhost:3000/api/refresh', {
            method: 'POST',
            credentials: 'include',
        })
        if (res.ok) {
            const data = await res.json()
            toast.success("refresh token")
            api.dispatch(setAccessToken(data.accessToken))
            // re-run the query with the new token
            result = await baseQuery(args, api, extraOptions)
        } else {
            const res = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
        }
    }
    return result
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DJANGO_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        // if we have a token, let's set the authorization header
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

// initialize an empty api service that we'll inject endpoints into later as needed
export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery:baseQueryWithReAuth,
    endpoints: () => ({}),
})
