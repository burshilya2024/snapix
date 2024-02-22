import { useState } from 'react'

import LangSelect from '@/4_features/Lang/LangSelect'
import { useLogout } from '@/4_features/Register_Login_User/hooks/useLogout'
import ThemeToggle from '@/4_features/ThemeToggle/ThemeToggle'
import { useTranslation } from '@/6_shared/config/i18n/hooks/useTranslation'
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import Favorite from '@public/assets/icons/favorite.svg'
import LogOut from '@public/assets/icons/log-out-outline.svg'
import BurgerMenu from '@public/assets/icons/menu-outline.svg'
import ProfileSettings from '@public/assets/icons/settings.svg'
import Statistics from '@public/assets/icons/trending-up.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/styles/HeaderMenu.module.scss'

import { useLogoutMutation } from '../Register_Login_User/api/register_Login_Api'

export const HeaderMenu = () => {
  const { t } = useTranslation()
  const [Logout] = useLogoutMutation()
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const router = useRouter()

  const logoutSubmit = async () => {
    try {
      await Logout()
      setIsLoggedOut(true)
      alert('вы вышли из системы')
      router.push('/')
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error)
    }
  }

  return (
    <Menu>
      <span className={`svg ${styles.BurgerMenu}`}>
        <MenuButton aria-label={'Options'} as={IconButton} icon={<BurgerMenu />} />
      </span>
      <MenuList className={styles.menuList}>
        <MenuItem icon={<ProfileSettings />}>Settings</MenuItem>
        <MenuItem icon={<Statistics />}>{t.navBar.statistics}</MenuItem>
        <MenuItem icon={<Favorite />}>{t.navBar.favorites}</MenuItem>
        <Link href={''} onClick={logoutSubmit}>
          <MenuItem icon={<LogOut />}>{t.signIn_SignUp.logout}</MenuItem>
        </Link>
        <div className={styles.additionalFeatures}>
          <ThemeToggle />
          <LangSelect />
        </div>
      </MenuList>
    </Menu>
  )
}
