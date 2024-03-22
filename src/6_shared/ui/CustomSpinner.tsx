import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// Создаем анимацию вращения для спиннера
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

// Стили для кастомного спиннера
const spinnerStyle = {
  alignItems: 'center',
  animation: `${rotate} 1s linear infinite`,
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '50%',
  borderTop: '2px solid #000',
  display: 'flex',
  height: '40px',
  justifyContent: 'center',
  width: '40px',
}

// Ваш компонент
export const MyCustomSpinner = () => (
  <Box as={'span'} sx={{ ...spinnerStyle, margin: 'auto' }}></Box>
)
