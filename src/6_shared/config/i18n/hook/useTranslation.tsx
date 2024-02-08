import { useRouter } from 'next/router'

import { en } from '../Locales/en'
import { ru } from '../Locales/ru'

export const useTranslation = () => {
  const router = useRouter()

  const t = router.locale === 'en' ? en : ru

  return { t }
}
