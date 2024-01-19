import GoogleIcons from '@public/assets/icons/google-svgrepo-com 1.svg'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import styles from '@/styles/LogIn.module.scss'

export const GoogleButton = () => {
  const searchParams = useSearchParams()
  const callBackUrl = searchParams.get('callbackUrl') || '/MyProfile'

  return (
    <div className={styles.googleAthIcon} onClick={() => signIn('google', { callBackUrl })}>
      <GoogleIcons />
    </div>
  )
}
