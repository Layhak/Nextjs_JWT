'use client'
import { useState } from 'react'
import { Button } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function JWT() {
    const [accessToken, setAccessToken] = useState('')
    const [user, setUser] = useState(null)
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
            console.log('Data in jwt test', data)
        }).catch(error => {
            toast.error('Login fail')
            console.log(error)
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
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/token/refresh`,
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({}),
            },
        ).then(response => response.json()).then(data => {
            toast.success('Refresh Successfully')
            console.log('Data in refresh token', data)
        }).then(error => {
            console.log('error:', error)
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
            <ToastContainer />
        </main>
    )
}