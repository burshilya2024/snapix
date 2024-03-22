import { useFetchDataPhotoQuery } from '@/4_features/public/api/UnsplashTestApi'
import Image from 'next/image'

import styles from '@/styles/MyProfile.module.scss'
// ?Mock fotos
export const UserPhotos: React.FC = () => {
  const { data: photos = [], isLoading } = useFetchDataPhotoQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.profile_photos}>
      {photos.map(photo => (
        <Image
          alt={'photo'}
          height={256}
          key={photo.id}
          src={photo.urls.small}
          style={{ height: '256px', objectFit: 'cover', width: '256px' }}
          width={256}
        />
      ))}
    </div>
  )
}
