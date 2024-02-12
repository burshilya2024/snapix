import LangSelect from '@/4_features/Lang/LangSelect'
import ThemeToggle from '@/4_features/ThemeToggle/ThemeToggle'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import { Typography } from '@/6_shared/ui/Typography'
import Button from '@/6_shared/ui/ui-button'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import Favorite from '@public/assets/icons/favorite.svg'
import LogOut from '@public/assets/icons/log-out-outline.svg'
import BurgerMenu from '@public/assets/icons/menu-outline.svg'
import ProfileSettings from '@public/assets/icons/settings.svg'
import Statistics from '@public/assets/icons/trending-up.svg'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

// !вынести menu в в фичи
import styles from '@/styles/Header.module.scss'
export const Header = () => {
  const session = useSession()
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <Typography.H1 className={styles.logo}>Inctagram</Typography.H1>

      {!session.data ? (
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
        <Menu>
          <span className={`svg ${styles.BurgerMenu}`}>
            <MenuButton aria-label={'Options'} as={IconButton} icon={<BurgerMenu />} />
          </span>
          <MenuList className={'svg'}>
            <MenuItem icon={<ProfileSettings />}>Settings</MenuItem>
            <MenuItem icon={<Statistics />}>{t.navBar.statistics}</MenuItem>
            <MenuItem icon={<Favorite />}>{t.navBar.favorites}</MenuItem>
            <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
              <MenuItem icon={<LogOut />}>{t.signIn_SignUp.logout}</MenuItem>
            </Link>
            <ThemeToggle />
            <LangSelect />
          </MenuList>
        </Menu>
      )}
    </header>
  )
}
