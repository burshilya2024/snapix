import React, { useEffect } from 'react'

import { useLocalStorage } from '@/6_shared/lib/hooks/useLocalStorage'

const ThemeToggle: React.FC = () => {
  // Используем хук useLocalStorage для сохранения значения темы в localStorage
  const [theme, setTheme] = useLocalStorage<string>('theme', 'dark')

  useEffect(() => {
    // Устанавливаем текущую тему при монтировании компонента
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleToggleTheme = () => {
    // Инвертируем тему и обновляем localStorage
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(newTheme)
  }

  return (
    <div>
      <label
        className={`switch ${theme === 'light' ? 'light' : 'dark'}`}
        htmlFor={'themeToggleCheckbox'}
      >
        <input
          checked={theme === 'light'}
          className={'switch_input'}
          id={'themeToggleCheckbox'}
          onChange={handleToggleTheme}
          type={'checkbox'}
        />
        <span className={'slider'} />
      </label>
    </div>
  )
}

export default ThemeToggle
