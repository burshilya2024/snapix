import React from 'react'

import Profile_info_stats from '@/5_entites/profile-info-stats/Profile_info_stats'

import styles from '@/styles/MyProfile.module.scss'

import { DefaultAvatar_Avatar } from '../UserAvatar/DefaultAvatar_Avatar'
import { useGetUserQuery } from '../UserAvatar/api/Avatar_Api'
import { UserPhotos } from './UserPhotos'

export const MyProfilePage: React.FC = () => {
  const { data: user } = useGetUserQuery()

  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_Avatar_Info_wrapper}>
        <DefaultAvatar_Avatar />
        <Profile_info_stats user={user} /> {/* //!2) информация пользователя */}
      </div>
      <UserPhotos /> {/* //!3) посты юзера */}
    </section>
  )
}
