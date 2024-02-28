import GoogleIcons from '@public/assets/icons/google-svgrepo-com 1.svg'

import styles from '@/styles/LogIn.module.scss'

export const GoogleButton = () => {
  const handleGoogleAuth = () => {
    window.location.assign('https://9art.ru/api/v1/oauth/google')
  }

  return (
    <div className={styles.googleAthIcon} onClick={handleGoogleAuth}>
      <GoogleIcons />
    </div>
  )
}
