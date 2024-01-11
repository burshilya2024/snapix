import Link from 'next/link'

import styles from '@/styles/Header.module.scss'

import Button from '../Button/Button'
const auth = true
const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <h1 className={styles.logo}>Snapix</h1>
      </Link>
      {auth ? (
        <div className={styles.header_right}>
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
