import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export  async  function  POST(req:  NextRequest)  {
    const  cookieName  =  process.env.COOKIE_REFRESH_TOKEN_NAME  ||  'refresh'
    const  cookieStore  =  cookies()
    const  credential  =  cookieStore.get(cookieName)
    if (!credential) {
        return  NextResponse.json(
            {
                message:  'Token not found',
            },
            {
                status:  404,
            },
        )
    }
    const  refreshToken  =  credential.value
       //If refresh token exist, delete the refresh token from the client-side cookies
    if(refreshToken){
        cookieStore.delete(cookieName)

        return NextResponse.json(
            {
                message: "Logout successful",
            },
            {
                status: 200,
            }
        );
    }
    return NextResponse.json(
        {
            message: "Failed to logout",
        },
        {
            status: 400,
        }
    );

}