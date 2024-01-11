import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from '@/styles/Navigation.module.scss'

type NavLink = {
  className: any
  href: string
  label: string
}
type Props = {
  navLinks: NavLink[]
}

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map(link => {
        const isActive = pathname === link.href
        const cl = link.className

        return (
          <Link
            className={`${[styles.link]} ${styles[cl]} ${isActive ? styles.active : ''}`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}

export { Navigation }
