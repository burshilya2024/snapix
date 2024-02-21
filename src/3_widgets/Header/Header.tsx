import { HeaderMenu } from '@/4_features/HeaderMenu/HeaderMenu'
import LangSelect from '@/4_features/Lang/LangSelect'
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import { useLocalStorage } from '@/6_shared/lib/hooks/useLocalStorage'
import { Typography } from '@/6_shared/ui/Typography'
import Button from '@/6_shared/ui/ui-button'
import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

export const Header = () => {
  const { t } = useTranslation()

  // const isAuth = false
  const [isAuth, setIsAuth] = useLocalStorage<boolean>('isAuthSnapix', false)

  return (
    <header className={styles.header}>
      <Typography.H1 className={styles.logo}>Inctagram</Typography.H1>
      {!isAuth ? (
        <div className={styles.header_right}>
          <LangSelect />
          <Link href={'/LogIn'}>
            {' '}
            <Button outline>{t.signIn_SignUp.signIn}</Button>
          </Link>
          <Link href={'/SignUp'}>
            {' '}
            <Button primary>{t.signIn_SignUp.signUp}</Button>
          </Link>
        </div>
      ) : (
        <HeaderMenu />
      )}
    </header>
  )
}
