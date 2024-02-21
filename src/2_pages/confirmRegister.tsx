import React, { useEffect } from 'react'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface ConfirmRegisterPageProps {}

// Задаем тип для компоненты ConfirmRegisterPage
export const ConfirmRegister: React.FC<ConfirmRegisterPageProps> = () => {
  const router = useRouter()

  useEffect(() => {
    const confirmRegistration = async (token: string | string[]) => {
      try {
        // Отправляем POST запрос на сервер с токеном для подтверждения регистрации
        const response = await axios.post('https://9art.ru/api/v1/auth/register/confirm', {
          token: token,
        })

        console.log('Response:', response.data) // Ответ от сервера после подтверждения регистрации
      } catch (error) {
        console.error('Error while confirming registration:', error)
      }
    }

    // Получаем токен из параметров URL-адреса
    const token = router.query.token

    console.log('ТОКЕН УСПЕШНОЙ РЕГИСТРАЦИИ', token)

    // Проверяем, есть ли токен в URL-адресе
    if (token) {
      // Вызываем функцию для подтверждения регистрации с полученным токеном
      confirmRegistration(token)
    }
  }, [router.query.token])

  return (
    <div>
      <h1>Confirmation Page</h1>
      <h3>Вы успешно зарегистрировались</h3>
      <h2>вы можете перейти на страницу вашего профиля</h2>
      <Link href={'/MyProfile'}>MyProfile</Link>
    </div>
  )
}
