import { useEffect } from 'react'

import { Photo } from '@/common/types/photo'
import { useFetchDataPhotoQuery } from '@/store/UnsplashTestApi'

import styles from '@/styles/Public.module.scss'

import Slider from '../Slider/Slider'

const shuffleArray = (array: Photo[]) => {
  const newArray = array.slice() // Копируем массив, чтобы не изменять оригинальный

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // Обмен местами элементов
  }

  return newArray
}

const chunkArray = (array: Photo[], size: number) => {
  const chunkedArray: Photo[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size))
  }

  return chunkedArray
}

export default function Public() {
  const { data: photos = [], error, isLoading, refetch } = useFetchDataPhotoQuery()

  useEffect(() => {
    // Выполняется при монтировании компонента
    refetch() // Запустить запрос для получения данных
  }, [refetch]) // Запускать запрос при изменении refetch (например, когда зависимости useEffect изменяются)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const registeredUsers = [0, 0, 9, 2, 1, 3]

  const shuffledPhotos = shuffleArray(photos)
  const chunkedPhotos = chunkArray(shuffledPhotos, 4)

  //! Создаем массив с компонентами Slider
  const sliders = chunkedPhotos.map((chunk, index) => <Slider key={index} photos={chunk} />)

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
      {/* //!mock SLIDER  */}
      <div className={styles.publickPhoto}>{sliders}</div>
    </div>
  )
}
