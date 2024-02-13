import React from 'react'
import Select, {
  ActionMeta,
  OptionProps,
  SingleValue,
  SingleValueProps,
  components,
} from 'react-select'

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

  return (
    <components.SingleValue {...props}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <img alt={''} src={img} style={{ height: '20px', marginRight: '10px', width: '20px' }} />
        {children}
      </div>
    </components.SingleValue>
  )
}

const Option: React.FC<OptionProps<IOptionType, false>> = props => {
  const {
    data: { img, label, value },
  } = props

  return (
    <components.Option {...props}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <img alt={''} src={img} style={{ height: '20px', marginRight: '10px', width: '20px' }} />
        {label}
      </div>
    </components.Option>
  )
}

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
      className={styles.select}
      components={{ Option, SingleValue: CustomSingleValue }}
      defaultValue={options?.find(option => option?.value === defaultOptionValue)}
      onChange={onChangeHandler}
      options={options}
    />
  )
}

export default CustomSelect
