import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

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
      clientId: '939464150373-ecpcd6fr0kr8nuv300t2gtugkb9loo4e.apps.googleusercontent.com'!,
      clientSecret: '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'!,
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
