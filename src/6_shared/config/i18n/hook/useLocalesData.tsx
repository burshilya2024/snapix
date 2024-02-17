import NLFlag from '@public/assets/icons/Flag Netherlands.png'
import RusFlag from '@public/assets/icons/Flag Russia.png'
import EngFlag from '@public/assets/icons/Flag United Kingdom.png'

export const useLocalesData = () => {
  const localesData = [
    { img: EngFlag.src, label: 'English', value: 'en' },
    { img: RusFlag.src, label: 'Russian', value: 'ru' },
    { img: NLFlag.src, label: 'Dutch', value: 'nl' },
  ]

  return { localesData }
}
