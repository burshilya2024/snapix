import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import useWindowSize from '@/6_shared/lib/hooks/useWindowsSize'
import LogInIcon from '@public/assets/icons/log-out.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import styles from '@/styles/Navigation.module.scss'

type NavLink = {
  href: string
  icon: any
  label: string
}
type Props = {
  navLinks: NavLink[]
}
// !вынести логику в фичи
export const NavBar = ({ navLinks }: Props) => {
  const pathname = usePathname()
  const isMobile = useWindowSize()
  const { t } = useTranslation()

  return (
    <div className={styles.Navbar_list}>
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href

        //! Скрываем последние три элемента при использовании мобильных устройств
        if (isMobile && index >= navLinks.length - 2) {
          return null
        }

        return (
          <Link
            className={`${styles.Navbar_list_link} ${isActive ? styles.active : ''}`}
            href={link.href}
            key={link.label}
          >
            <span className={`${'svg'} ${isActive && styles.activeIcon} `}>{link.icon}</span>
            {!isMobile && link.label}
          </Link>
        )
      })}
      {!isMobile && (
        <Link
          className={styles.LogOutLink}
          href={'#'}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <span className={'svg'}>
            <LogInIcon />
          </span>
          <span>{t.signIn_SignUp.logout}</span>
        </Link>
      )}
    </div>
  )
}
