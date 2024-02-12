import React from 'react'
import { LoginComponents } from '@/4_features'
import { GoogleButton } from '@/4_features/GoogleAuthButton/GoogleAuthButton'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import Card from '@/6_shared/ui/Card'

import styles from '@/styles/LogIn.module.scss'
export const LogIn: React.FC<any> = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <div className={styles.tittle}>{t.signIn_SignUp.signIn}</div>
      <GoogleButton />
      <LoginComponents />
    </Card>
  )
}
