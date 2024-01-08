import { useEffect, useState } from 'react'

import { Photo } from '@/interface/photo'
import axios from 'axios'
import Image from 'next/image'

import styles from '@/styles/Public.module.scss'

const API_KEY = '-R1NIoPats74w7LQjkm6-zdv3ilBtzlCsL8fJOViYpo'

export default function Public() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const fetchPhotos = async () => {
      //! ТЕСТОВОЕ API ДЛЯ ОТОБРОЖЕНИЕ MOCK FOTO, publick_bursh
      //! ТЕСТОВОЕ API ДЛЯ ОТОБРОЖЕНИЕ MOCK FOTO, publick_bursh 2
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=8&page=1`
        )

        setPhotos(response.data)
      } catch (error) {
        console.error('Ошибка получения данных:', error)
      }
    }

    fetchPhotos()
  }, [])
  const registeredUsers = [0, 0, 9, 2, 1, 3]

  return (
    <div className={styles.publickWrapper}>
      <div className={styles.Registered}>
        <p>Registered users:</p>
        <ul className={styles.registered_people}>
          {registeredUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className={styles.publickPhoto}>
        {photos.map(photo => (
          <Image
            alt={photo.alt_description}
            height={400}
            key={photo.id}
            src={photo.urls.small}
            width={400}
          />
        ))}
      </div>
    </div>
  )
}
