import { HeaderMenu } from '@/4_features/HeaderMenu/HeaderMenu'
import LangSelect from '@/4_features/Lang/LangSelect'
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import useWindowSize from '@/6_shared/lib/hooks/useWindowsSize'
import { Typography } from '@/6_shared/ui/Typography'
import Button from '@/6_shared/ui/ui-button'
import InstagramSvg from '@public/assets/icons/instagram.svg'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

const Header = () => {
  const { t } = useTranslation()

  const isAuth = localStorage.getItem('isAuthSnapix')
  const isMobile = useWindowSize()

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        {isMobile ? (
          <InstagramSvg />
        ) : (
          <Typography.H1 className={styles.logo}>Inctagram</Typography.H1>
        )}
      </Link>

      {isAuth == 'false' ? (
        <div className={styles.header_right}>
          <LangSelect />
          <Link href={'/LogIn'}>
            {' '}
            <Button outline>{t.signIn_SignUp.signIn}</Button>
          </Link>
          {/* <Link href={'/SignUp'}>
            {' '}
            <Button primary>{t.signIn_SignUp.signUp}</Button>
          </Link> */}
        </div>
      ) : (
        <HeaderMenu />
      )}
    </header>
  )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
