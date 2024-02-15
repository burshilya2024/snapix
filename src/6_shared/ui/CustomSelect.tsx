import React, { useState } from 'react'
import styles from '@/styles/CustomSelect.module.scss'
import ArrowDown from '@public/assets/icons/arrow-ios-Down-outline.svg'

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
            <img src={selectedOption.img} alt={selectedOption.label} />
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
              key={option.value}
              className={`selectOption ${styles.option} ${
                selectedOption?.value === option.value
                  ? `selectedOption ${styles.optionSelected}`
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <img src={option.img} alt={option.label} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
