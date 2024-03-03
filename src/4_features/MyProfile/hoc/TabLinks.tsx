import styles from '@/styles/MyProfile.module.scss'
import Link from 'next/link';
import { ReactNode } from 'react';

interface PropsType {
  children: ReactNode
}

export const TabLinks = ({ children }: PropsType) => {
  return (
    <div>
      <div className={styles.profileTabs}>
        <Link href={'/MyProfile/general-information'} className={styles.tabLink}>General information</Link>
        <Link href={'/MyProfile/devices'} className={styles.tabLink}>Devices</Link>
        <Link href={'/MyProfile/account-management'} className={styles.tabLink}>Account Management</Link>
        <Link href={'/MyProfile/my-payments'} className={styles.tabLink}>My payments</Link>
      </div>
      {children}
    </div >
  );
}
