import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const BACKEND_BASE_URL = 'https://9art.ru/api'

const users = [
  {
    email: 'bursh2023@gmail.com',
    id: '1',
    name: 'Бурш Илья',
    password: 'qwerty',
    role: 'admin',
  },
  {
    email: 'admin@gmail.com',
    id: '2',
    name: 'Super Admin',
    password: '12345',
    role: 'admin',
  },
  {
    email: 'any@gmail.com',
    id: '3',
    name: 'Just a Guest',
    password: '12345',
    role: 'guest',
  },
]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '742398509930-cdjrjbdminheqjduu8lm20tbr09lp5b7.apps.googleusercontent.com' as string,
      clientSecret: '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' as string,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const currentUser = users.find(user => user.email === credentials.email)

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser

          return userWithoutPass as User
        }

        return null
      },
      credentials: {
        email: { label: 'email', required: true, type: 'email' },
        password: { label: 'password', required: true, type: 'password' },
      },
    }),
  ],
  secret: 'supersecret',
  // eslint-disable-next-line perfectionist/sort-objects
  pages: {
    signIn: '/Login',
  },
}
export default NextAuth(authOptions)
