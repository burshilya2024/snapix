import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from '@/styles/Navigation.module.scss'

type NavLink = {
  href: string
  icon: string
  label: string
}
type Props = {
  navLinks: NavLink[]
}

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname()

  return (
    <div className={styles.WrapperLinkNavigation}>
      {navLinks.map(link => {
        const isActive = pathname === link.href

        return (
          <Link
            className={`${styles.NavigationLink} ${isActive ? styles.active : ''}`}
            href={link.href}
            key={link.label}
          >
            <img
              alt={link.label}
              className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}
              src={link.icon}
            />
            {link.label}
          </Link>
        )
      })}
    </div>
  )
}

export { Navigation }
