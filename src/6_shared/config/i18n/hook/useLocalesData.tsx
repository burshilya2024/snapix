import RusFlag from '@public/assets/icons/Flag Russia.png'
import EngFlag from '@public/assets/icons/Flag United Kingdom.png'
import NLFlag from '@public/assets/icons/Flag Netherlands.png'

export const useLocalesData = () => {
  const localesData = [
    { value: 'en', label: 'English', img: EngFlag.src },
    { value: 'ru', label: 'Russian', img: RusFlag.src },
    { value: 'nl', label: 'Dutch', img: NLFlag.src },
  ]
  return { localesData }
}
