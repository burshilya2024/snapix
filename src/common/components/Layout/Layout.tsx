import { ReactNode } from 'react'

import Header from '@/common/components/Header/Header'

import styles from '@/styles/Layout.module.scss'

import { Navigation } from '../Navigate/Navigation'
import Public from '../PublicPage/Public'

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const auth = true
  const navigate = [
    { href: '/', icon: '/assets/icons/home-outline.svg', label: 'home' },
    { href: '/create', icon: '/assets/icons/plus-square-outline.svg', label: 'create' },
    { href: '/myprofile', icon: '/assets/icons/person-outline.svg', label: 'My Profile' },
    { href: '/messanger', icon: '/assets/icons/message-circle-outline.svg', label: 'Messanger' },
    { href: '/Statistics', icon: '/assets/icons/trending-up-outline.svg', label: 'Statistics' },
    { href: '/Favorites', icon: '/assets/icons/Layer 2.svg', label: 'Favorites' },
    { href: '/LogIn', icon: '/assets/icons/log-out.svg', label: 'Log Out' },
  ]

  return (
    <div className={styles.LayoutContainer}>
      <div className={styles.LayoutHeader}>
        <Header />
      </div>
      {auth ? (
        <div className={styles.Layout}>
          <div className={styles.LayoutNavbar}>
            <Navigation navLinks={navigate} />
          </div>
          <div className={styles.LayoutChildrenContainer}>
            <main className={styles.LayoutChildren}>{children}</main>
          </div>
        </div>
      ) : (
        <div className={styles.LayoutPublick}>
          <Public />
        </div>
      )}
    </div>
  )
}
