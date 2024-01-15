import { ReactNode, useEffect, useState } from 'react'

import Header from '@/common/components/Header/Header'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'

import styles from '@/styles/Layout.module.scss'

import CreateIcon from '../../../../public/assets/icons/create.svg'
import FavoritesIcon from '../../../../public/assets/icons/favorite.svg'
import HomeIcon from '../../../../public/assets/icons/home-light.svg'
import LogInIcon from '../../../../public/assets/icons/log-out.svg'
import MessangerIcon from '../../../../public/assets/icons/message.svg'
import MyProfileIcon from '../../../../public/assets/icons/person.svg'
import SearchIcon from '../../../../public/assets/icons/search.svg'
import StatisticsIcon from '../../../../public/assets/icons/trending-up-outline.svg'
import Button from '../Button/Button'
import { Navigation } from '../Navigate/Navigation'
import Public from '../PublicPage/Public'

interface LayoutProps {
  children: ReactNode
}
const navigate = [
  { href: '/', icon: <HomeIcon />, label: 'home' },
  { href: '/create', icon: <CreateIcon />, label: 'create' },
  { href: '/messanger', icon: <MessangerIcon />, label: 'Messanger' },
  { href: '/search', icon: <SearchIcon />, label: 'search' },
  { href: '/myprofile', icon: <MyProfileIcon />, label: 'My Profile' },
  { href: '/Statistics', icon: <StatisticsIcon />, label: 'Statistics' },
  { href: '/Favorites', icon: <FavoritesIcon />, label: 'Favorites' },
  { href: '/LogIn', icon: <LogInIcon />, label: 'Log Out' },
]

export default function Layout({ children }: LayoutProps) {
  const [isClient, setIsClient] = useState(false)

  const authLocalStorage = useLocalStorage<boolean>('auth', false)
  const [auth, setAuth] = isClient ? authLocalStorage : [false, () => {}]

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={styles.LayoutContainer}>
      <header className={styles.LayoutHeader}>
        <Button onClick={() => setAuth(!auth)} outline>
          {auth ? 'ВЫЙТИ из аккаунта' : 'войти в аккаунт'}
        </Button>
        <Header />
      </header>
      {auth ? (
        <div className={styles.LayoutWrapper_navBar_chiildren}>
          <nav className={styles.Layout_navbar}>
            <Navigation navLinks={navigate} />
          </nav>
          <div className={styles.Layout_children}>{children}</div>
        </div>
      ) : (
        <div className={styles.LayoutPublick}>
          <Public />
        </div>
      )}
    </div>
  )
}
