import React from 'react'
import Select, {
  ActionMeta,
  components,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from 'react-select'

type IOptionType = {
  value: string
  label: string
  img: string
}

type CustomSelectProps = {
  options: IOptionType[]
  defaultOptionValue: string | undefined
  handlerFunction: (newValue: string | undefined) => void
}

const SingleValue: React.FC<SingleValueProps<IOptionType, false>> = props => {
  const {
    data: { value, label, img },
    children,
  } = props
  return (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={img} style={{ width: '20px', height: '20px', marginRight: '10px' }} alt="" />
        {children}
      </div>
    </components.SingleValue>
  )
}

const Option: React.FC<OptionProps<IOptionType, false>> = props => {
  const {
    data: { value, label, img },
  } = props
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={img} style={{ width: '20px', height: '20px', marginRight: '10px' }} alt="" />
        {label}
      </div>
    </components.Option>
  )
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOptionValue,
  handlerFunction,
}) => {
  const onChangeHandler = (
    newValue: SingleValue<IOptionType>,
    actionMeta: ActionMeta<IOptionType>
  ) => {
    handlerFunction(newValue?.value)
  }

  return (
    <Select
      defaultValue={options?.find(option => option?.value === defaultOptionValue)}
      options={options}
      components={{ SingleValue, Option }}
      onChange={onChangeHandler}
    />
  )
}

export default CustomSelect
