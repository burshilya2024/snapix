import { useState } from 'react'

import ThemeToggle from '@/4_features/ThemeToggle/ThemeToggle'
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

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Inctagram</h1>

      {!session.data ? (
        <div className={styles.header_right}>
          <Link href={'/LogIn'}>
            {' '}
            <Button outline>Log in</Button>
          </Link>
          <Link href={'/SignUp'}>
            {' '}
            <Button primary>Sign Up</Button>
          </Link>
        </div>
      ) : (
        <Menu>
          <span className={styles.BurgerMenu}>
            <MenuButton
              aria-label={'Options'}
              as={IconButton}
              icon={<BurgerMenu />}
              variant={'outline'}
            />
          </span>
          <MenuList>
            <MenuItem icon={<ProfileSettings />}>Settings</MenuItem>
            <MenuItem icon={<Statistics />}>Statistics</MenuItem>
            <MenuItem icon={<Favorite />}>Favorite</MenuItem>
            <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
              <MenuItem icon={<LogOut />}>LogOut</MenuItem>
            </Link>
            <ThemeToggle />
          </MenuList>
        </Menu>
      )}
    </header>
  )
}
