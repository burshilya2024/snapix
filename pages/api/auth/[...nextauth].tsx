//@ts-ignore
import { authOptions } from '@/1_app/Configs/AuthConfig'
import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'

const handler: NextApiHandler = async (req, res) => {
  await NextAuth(req, res, authOptions)
}

export default handler
export const GET: NextApiHandler = handler
export const POST: NextApiHandler = handler
