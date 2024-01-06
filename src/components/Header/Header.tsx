import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

import { Navigation } from '../Navigate/Navigateon'

const navItems = [
  { className: 'profileLinl', href: '/Profile', label: 'Profile' },
  { className: 'SignInLink', href: '/SignIn', label: 'Sign In' },
  { className: 'SignUpLik', href: '/SignUp', label: 'Sign Up' },
]

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Snapix</h1>
      </Link>
      <div className={styles.header_right}>
        <Navigation navLinks={navItems} />
      </div>
    </header>
  )
}

export default Header
