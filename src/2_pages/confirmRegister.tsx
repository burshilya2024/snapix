import React, { useEffect } from 'react'

import { ConfirmRegistrComponent } from '@/5_entites/confirm-register/confirm-register'
import axios from 'axios'
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
      setTimeout(() => {
        // check in network how work this post request
        confirmRegistration(token)
      }, 5000)
    }
  }, [router.query.token])

  return (
    <div>
      <ConfirmRegistrComponent />
    </div>
  )
}
