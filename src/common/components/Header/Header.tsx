import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import styles from '@/styles/Header.module.scss'

import Button from '../Button/Button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const Header = () => {
  const session = useSession()

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Inctagram</h1>

      {!session?.data ? (
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
        <div>
          <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
            <span> sign out {session?.data?.user?.name}</span>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
