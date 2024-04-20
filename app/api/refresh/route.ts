import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh"
    const credential = cookieStore.get(cookieName)

    console.log("Credential: ",credential)

    return NextResponse.json({
        message: 'Hello from request token',
    }, {
        status: 200,
    })
}
