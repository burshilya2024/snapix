import { useRouter } from 'next/router'
import { en } from '../Locales/en'
import { ru } from '../Locales/ru'
import { nl } from '../Locales/nl'
import { useLocalesData } from '@/6_shared/config/i18n/hook/useLocalesData'

export const useTranslation = () => {
  const router = useRouter()
  const { localesData } = useLocalesData()
  const currentLocaleData = localesData.find(lang => router.locale === lang.value)

  // If we have a matching locale data, use its value, otherwise default to 'en'
  const currentLocale = currentLocaleData?.value || 'en'

  const t = (() => {
    switch (currentLocale) {
      case 'en':
        return en
      case 'ru':
        return ru
      case 'nl':
        return nl
      default:
        return en
    }
  })()

  return { t }
}
