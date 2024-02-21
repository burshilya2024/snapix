import { HeaderMenu } from '@/4_features/HeaderMenu/HeaderMenu'
import LangSelect from '@/4_features/Lang/LangSelect'
import ThemeToggle from '@/4_features/ThemeToggle/ThemeToggle'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import useWindowSize from '@/6_shared/lib/hooks/useWindowsSize'
import { Typography } from '@/6_shared/ui/Typography'
import Button from '@/6_shared/ui/ui-button'
import OutlineBell from '@public/assets/icons/Outline bell.svg'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import styles from '@/styles/Header.module.scss'
export const Header = () => {
  const session = useSession()
  const isMobile = useWindowSize()
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <Typography.H1 className={styles.logo}>Inctagram</Typography.H1>
      </Link>
      {!session.data ? (
        <div className={styles.header_right}>
          {!isMobile && <ThemeToggle />}

          <div className={styles.LangSelect}>
            <LangSelect />
          </div>
          <Link href={'/LogIn'}>
            <Button outline>{t.signIn_SignUp.logIn}</Button>
          </Link>
          <Link href={'/SignUp'}>
            <Button primary>{t.signIn_SignUp.signUp}</Button>
          </Link>
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className={styles.header_right_mobile}>
              <LangSelect />
              <HeaderMenu />
            </div>
          ) : (
            <div className={styles.header_right}>
              <ThemeToggle />

              <div className={styles.header_right_icon}>
                <OutlineBell />
              </div>
              <div className={styles.LangSelect}>
                <LangSelect />
              </div>
            </div>
          )}
        </>
      )}
    </header>
  )
}
