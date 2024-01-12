import { useEffect, useState } from 'react'

import useWindowSize from '@/common/hooks/useWindowsSize'
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
  const isMobile = useWindowSize()
  // Пустой массив означает, что эффект сработает только при монтировании и демонтаже компонента

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
            <img
              alt={link.label}
              className={`${styles.Navbar_list_icon} ${isActive ? styles.activeIcon : ''}`}
              src={link.icon}
            />
            {!isMobile && link.label}
          </Link>
        )
      })}
    </div>
  )
}

export { Navigation }
