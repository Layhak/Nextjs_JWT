'use client'
import { useState } from 'react'
import { Button } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUpdateProductMutation } from '@/redux/service/ecommerce'

export default function JWT() {
    const [accessToken, setAccessToken] = useState('')
    const [user, setUser] = useState(null)
    const [updateProduct, { data, error, isLoading }] = useUpdateProductMutation()
    const handleLogin = async () => {
        const email = 'henglayhak1@gmail.com'
        const password = 'admin@123'
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(response => response.json()).then(data => {
            setAccessToken(data.accessToken)
            toast.success('Login Successfully')
            // console.log('Data in jwt test', data)
        }).catch(error => {
            toast.error('Login fail')
            // console.log(error)
        })
    }
    const handlePartialUpdate = async () => {
        const body = {
            name: 'test update',
        }
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${321}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        }).then(response => response.json()).then(data => {
            toast.success('Success Update')
            console.log('Data in jwt test', data)
        }).catch(error => {
            toast.error('Update fail')
            console.log(error)
        })
    }
    const handleRefreshToken = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`,
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({}),
            },
        ).then(response => response.json()).then(data => {
            toast.success('Refresh Successfully')
            setAccessToken(data.accessToken)
            console.log('Data in refresh token', data)
        }).then(error => {
            console.log('error:', error)
        })
    }
    const handleLogout = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json()).then(data => {
            toast.success('Logout Successfully')
            console.log('Data in jwt test', data)
        }).catch(error => {
            toast.error('Logout fail')
            console.log(error)
        })
    }
    console.log(data)
    console.log(error)
    const handleUpdateWithRTK = async () => {
        updateProduct(
            {
                id: 321,
                updatedProduct: {
                    name: 'Test  Update Product',
                },
                accessToken: accessToken,
            })
    }
    return (
        <main className={`h-screen grid place-content-center gap-5`}>
            <h1 className={`capitalize text-3xl font-bold`}>Test handle login with JWT</h1>
            <Button onClick={handleLogin}>
                Login
            </Button>
            <Button onClick={handlePartialUpdate}>
                Partial Update
            </Button>

            <Button onClick={handleRefreshToken}>
                Refresh Token
            </Button>
            <Button onClick={handleLogout}>
                Logout
            </Button>
            <Button onClick={handleUpdateWithRTK}>
                Update Handle with RTK
            </Button>
            <ToastContainer />
        </main>
    )
}