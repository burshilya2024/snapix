import useWindowSize from '@/common/hooks/useWindowsSize'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from '@/styles/Navigation.module.scss'

type NavLink = {
  href: string
  icon: any
  label: string
}
type Props = {
  navLinks: NavLink[]
}

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname()
  const isMobile = useWindowSize()

  return (
    <div className={styles.Navbar_list}>
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href

        // Скрываем последние три элемента при использовании мобильных устройств
        if (isMobile && index >= navLinks.length - 3) {
          return null
        }

        return (
          <Link
            className={`${styles.Navbar_list_link} ${isActive ? styles.active : ''}`}
            href={link.href}
            key={link.label}
          >
            <span className={`${'svg'} ${isActive && styles.activeIcon} `}>{link.icon}</span>
            {!isMobile && link.label}
          </Link>
        )
      })}
    </div>
  )
}

export { Navigation }
