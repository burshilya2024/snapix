import { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from '@/styles/MyProfile.module.scss'

interface LinkItem {
  href: string
  label: string
}

interface PropsType {
  children: ReactNode
}

export const MyProfileTabLinks = ({ children }: PropsType) => {
  const links: LinkItem[] = [
    { href: '/MyProfile/general-information', label: 'General information' },
    { href: '/MyProfile/devices', label: 'Devices' },
    { href: '/MyProfile/account-management', label: 'Account Management' },
    { href: '/MyProfile/my-payments', label: 'My payments' },
  ]
  const pathname = usePathname()

  return (
    <div>
      <div className={styles.profileTabs}>
        {links.map((link, index) => {
          const isActive = pathname === link.href

          return (
            <Link
              className={`${styles.tabLink} ${isActive && styles.tabLinkActive}`}
              href={link.href}
              key={index}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
      {children}
    </div>
  )
}
