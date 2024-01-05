import { useEffect, useState } from 'react'

import axios from 'axios'
import { Photo } from '@/src/interface/photo'
import styles from '@/src/styles/Public.module.scss'
import Image from 'next/image'

const API_KEY = '-R1NIoPats74w7LQjkm6-zdv3ilBtzlCsL8fJOViYpo'

export default function Public() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const fetchPhotos = async () => {
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

  const text = '123456'
  const letters = text.split('').map((letter, index) => <span key={index}>{letter}</span>)

  return (
    <>
      <div className={styles.publickWrapper}>
        <div className={styles.Registered}>
          <p>Registered users:</p>
          <ul className={styles.registered_people}>
            <li>0</li>
            <li>0</li>
            <li>9</li>
            <li>2</li>
            <li>1</li>
            <li>3</li>
          </ul>
        </div>
      </div>
      <div className={styles.publickPhoto}>
        {photos.map(photo => (
          <Image
            alt={photo.alt_description}
            key={photo.id}
            src={photo.urls.small}
            width={400}
            height={400}
          />
        ))}
      </div>
    </>
  )
}
