// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'
// import Credentials from 'next-auth/providers/credentials'
// import GoogleProvider from 'next-auth/providers/google'

// export const authOptions = {
//   pages: {
//     signIn: '/Login',
//   },
//   providers: [
//     GoogleProvider({
//       clientId: '742398509930-cdjrjbdminheqjduu8lm20tbr09lp5b7.apps.googleusercontent.com'!,
//       clientSecret: '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'!,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           return null
//         }

//         try {
//           const response = await axios.post('https://9art.ru/api/v1/auth/login', {
//             email: credentials.email,
//             password: credentials.password,
//           })

//           if (response.data && response.data.accessToken) {
//             const accessToken = await jwtDecode(response?.data?.accessToken)
//             // @ts-ignore
//             const user = accessToken.user

//             return user
//           } else {
//             return null
//           }
//         } catch (error) {
//           console.error('Authentication failed:', error)

//           return null
//         }
//       },
//       credentials: {
//         email: { label: 'email', required: true, type: 'email' },
//         password: { label: 'password', required: true, type: 'password' },
//       },
//     }),
//   ],
//   secret: process.env.SECRET_KEY,
// }
