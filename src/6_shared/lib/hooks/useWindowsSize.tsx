// useWindowSize.ts
import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Выполняем проверку при монтировании компонента
    checkWindowSize()

    // Ожидаем загрузки клиентского окружения
    const waitForClientEnvironment = () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', checkWindowSize)
      } else {
        setTimeout(waitForClientEnvironment, 100)
      }
    }

    waitForClientEnvironment()

    // Очистка слушателя при демонтаже компонента
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkWindowSize)
      }
    }
  }, []) // Пустой массив означает, что эффект сработает только при монтировании и демонтаже компонента

  return isMobile
}

export default useWindowSize
