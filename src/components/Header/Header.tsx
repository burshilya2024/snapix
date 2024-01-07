import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

import { Navigation } from '../Navigate/Navigation'

const navItems = [
  { className: 'profileLink', href: '/Profile', label: 'Profile' },
  { className: 'logInLink', href: '/LogIn', label: 'Log in' },
  { className: 'signUpLik', href: '/SignUp', label: 'Sign up' },
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
