import { ReactNode } from 'react'

import Link from 'next/link'

import styles from '@/styles/MyProfile.module.scss'

interface PropsType {
  children: ReactNode
}

export const TabLinks = ({ children }: PropsType) => {
  return (
    <div>
      <div className={styles.profileTabs}>
        <Link className={styles.tabLink} href={'/MyProfile/general-information'}>
          General information
        </Link>
        <Link className={styles.tabLink} href={'/MyProfile/devices'}>
          Devices
        </Link>
        <Link className={styles.tabLink} href={'/MyProfile/account-management'}>
          Account Management
        </Link>
        <Link className={styles.tabLink} href={'/MyProfile/my-payments'}>
          My payments
        </Link>
      </div>
      {children}
    </div>
  )
}
