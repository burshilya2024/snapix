import { ReactNode } from 'react'

import { Header, NavBar } from '@/3_widgets'
import { useTranslation } from '@/6_shared/config/i18n/hook/useTranslation'
import CreateIcon from '@public/assets/icons/create.svg'
import FavoritesIcon from '@public/assets/icons/favorite.svg'
import HomeIcon from '@public/assets/icons/home-light.svg'
import MessengerIcon from '@public/assets/icons/message.svg'
import MyProfileIcon from '@public/assets/icons/person.svg'
import SearchIcon from '@public/assets/icons/search.svg'
import StatisticsIcon from '@public/assets/icons/trending-up-outline.svg'
import { useSession } from 'next-auth/react'

import styles from '@/styles/Layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const session = useSession()
  const { t } = useTranslation()
  const navigate = [
    { href: '/', icon: <HomeIcon />, label: t.navBar.home },
    { href: '/Create', icon: <CreateIcon />, label: t.navBar.create },
    { href: '/Messenger', icon: <MessengerIcon />, label: t.navBar.messenger },
    { href: '/Search', icon: <SearchIcon />, label: t.navBar.search },
    { href: '/MyProfile', icon: <MyProfileIcon />, label: t.navBar.myProfile },
    { href: '/Statistics', icon: <StatisticsIcon />, label: t.navBar.statistics },
    { href: '/Favorites', icon: <FavoritesIcon />, label: t.navBar.favorites },
  ]

  return (
    <div className={styles.LayoutContainer}>
      <header className={styles.LayoutHeader}>
        <Header />
      </header>
      <div className={` ${styles.LayoutWrapper_navBar_chiildren}`}>
        {session.data ? (
          <nav className={`scrollable_container ${styles.Layout_navbar}`}>
            <NavBar navLinks={navigate} />
          </nav>
        ) : null}

        <div className={`scrollable_container ${styles.Layout_children}`}>{children}</div>
      </div>
    </div>
  )
}
