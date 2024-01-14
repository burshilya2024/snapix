import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

import Button from '../Button/Button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
const auth = true
const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Inctagram</h1>

      {auth ? (
        <div className={styles.header_right}>
          <ThemeToggle />
          <Link href={'/LogIn'}>
            <Button outline>Log in</Button>
          </Link>
          <Link href={'/SignUp'}>
            <Button primary>Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div>xxx</div>
      )}
    </header>
  )
}

export default Header
