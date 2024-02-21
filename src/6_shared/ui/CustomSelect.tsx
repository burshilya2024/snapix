import React from 'react'
import Select, {
  ActionMeta,
  OptionProps,
  SingleValue,
  SingleValueProps,
  components,
} from 'react-select'

import useWindowSize from '@/6_shared/lib/hooks/useWindowsSize'

import styles from '@/styles/CustomSelect.module.scss'

type IOptionType = {
  img: string
  label: string
  value: string
}

type CustomSelectProps = {
  defaultOptionValue: string | undefined
  handlerFunction: (newValue: string | undefined) => void
  options: IOptionType[]
}

const CustomSingleValue: React.FC<SingleValueProps<IOptionType, false>> = props => {
  const {
    children,
    data: { img, label, value },
  } = props

  const isMobile = useWindowSize()

  return (
    <components.SingleValue {...props}>
      <div className={styles.SingleValue}>
        <img alt={''} className={styles.SingleValue_img} src={img} />
        {!isMobile && <span className={styles.SingleValue_text}>{label}</span>}
      </div>
    </components.SingleValue>
  )
}

const Option: React.FC<OptionProps<IOptionType, false>> = props => {
  const {
    data: { img, label, value },
  } = props

  const isMobile = useWindowSize()

  return (
    <components.Option {...props}>
      <div className={styles.Option}>
        <img alt={''} className={styles.Option_img} src={img} />
        {!isMobile && <span className={styles.Option_text}>{label}</span>}
      </div>
    </components.Option>
  )
}

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     background: 'red',
//     // Другие стили, если необходимо
//   }),
// }

const CustomSelect: React.FC<CustomSelectProps> = ({
  defaultOptionValue,
  handlerFunction,
  options,
}) => {
  const onChangeHandler = (
    newValue: SingleValue<IOptionType>,
    actionMeta: ActionMeta<IOptionType>
  ) => {
    handlerFunction(newValue?.value)
  }

  return (
    <Select
      //Изменения цвета при смене теме, доделать
      // styles={{
      //   control: (provided, state) => ({
      //     ...provided,
      //     background: 'red',
      //     // Другие стили, если необходимо
      //   }),
      // }}
      // styles={{
      //   option: (provided, state) => ({
      //     ...provided,
      //     backgroundColor: '#0D0D0D',
      //     color: 'white'
      //   )} }}
      className={styles.Select}
      components={{ Option, SingleValue: CustomSingleValue }}
      defaultValue={options?.find(option => option?.value === defaultOptionValue)}
      isSearchable={false}
      onChange={onChangeHandler}
      options={options}
    />
  )
}

export default CustomSelect
