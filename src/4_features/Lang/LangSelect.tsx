import { ChangeEvent } from 'react'

import { Box, Select } from '@chakra-ui/react'
import RusFlag from '@public/assets/icons/Flag Russia.png'
import EngFlag from '@public/assets/icons/Flag United Kingdom.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const LangSelect = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale: selectedLocale })
  }

  // Создайте массив объектов с данными для каждого языка, включая флаги
  const localesData = [
    { flag: RusFlag.src, locale: 'ru' },
    { flag: EngFlag.src, locale: 'en' },
    // Добавьте другие языки и их флаги по аналогии
  ]

  return (
    <Box alignItems={'center'} display={'flex'}>
      {/* //!при использовании картинке в option возникает проблема с гидрации, пофикшу как разберусь с этой проблемой */}
      {localesData.map(lang => (
        <Box key={lang.locale} mr={2}>
          <Image
            alt={`${lang.locale}`}
            height={20}
            objectFit={'cover'}
            priority
            src={`${lang.flag}`}
            width={20}
          />
        </Box>
      ))}
      <Select defaultValue={locale} onChange={changeLangHandler}>
        {localesData.map(lang => (
          <option key={lang.locale} value={lang.locale}>
            {lang.locale}
          </option>
        ))}
      </Select>
    </Box>
  )
}
