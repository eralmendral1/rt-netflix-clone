import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type Data = {
    name: string
}

export async function GET(request: NextApiRequest, response: NextApiResponse<Data>) {
    // return NextResponse.json({ name: "Neo" })
    response.status(200).json({ name: "neo"})
}