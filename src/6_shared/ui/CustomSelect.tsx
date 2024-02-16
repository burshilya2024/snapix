import React, { useState } from 'react'

import ArrowDown from '@public/assets/icons/arrow-ios-Down-outline.svg'

import styles from '@/styles/CustomSelect.module.scss'

type IOptionType = {
  img: string
  label: string
  value: string
}

type CustomSelectProps = {
  defaultOptionValue?: string
  handlerFunction: (newValue: string) => void
  options: IOptionType[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  defaultOptionValue,
  handlerFunction,
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState<IOptionType | undefined>(
    options.find(option => option.value === defaultOptionValue)
  )
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (option: IOptionType) => {
    setSelectedOption(option)
    handlerFunction(option.value)
    setIsOpen(false)
  }

  return (
    <div className={styles.customSelect}>
      <div className={styles.control} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <>
            <img alt={selectedOption.label} src={selectedOption.img} />
            <span>{selectedOption.label}</span>
          </>
        ) : (
          ''
        )}
        <span className={styles.arrow}>
          <ArrowDown className={'arrow'} />
        </span>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map(option => (
            <div
              className={`selectOption ${styles.option} ${
                selectedOption?.value === option.value
                  ? `selectedOption ${styles.optionSelected}`
                  : ''
              }`}
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              <img alt={option.label} src={option.img} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
