import React from 'react'

import Profile_info_stats from '@/5_entites/profile-info-stats/Profile_info_stats'

import styles from '@/styles/MyProfile.module.scss'

import { DefaultAvatar_Avatar } from '../UserAvatar/DefaultAvatar_Avatar'
import { UserPhotos } from './UserPhotos'

export const MyProfilePage: React.FC = () => {
  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_Avatar_Info_wrapper}>
        <DefaultAvatar_Avatar />
        <Profile_info_stats /> {/* //!2) информация пользователя */}
      </div>
      <UserPhotos /> {/* //!3) посты юзера */}
    </section>
  )
}
