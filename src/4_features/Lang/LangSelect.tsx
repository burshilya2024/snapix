import CustomSelect from '@/6_shared/ui/CustomSelect'
import { useRouter } from 'next/router'
import { useLocalesData } from '@/6_shared/config/i18n/hook/useLocalesData'

const LangSelect: React.FC = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter()
  const { localesData } = useLocalesData()
  const changeLangHandler = (newValue: string | undefined) => {
    push({ pathname, query }, asPath, { locale: newValue })
  }

  return (
    <CustomSelect
      options={localesData}
      defaultOptionValue={locale}
      handlerFunction={changeLangHandler}
    />
  )
}

export default LangSelect
