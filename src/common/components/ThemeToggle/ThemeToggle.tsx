// components/ThemeToggle.tsx
import React, { useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState('light')

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  return (
    <div>
      <label
        className={`switch ${theme === 'light' ? 'light' : 'dark'}`}
        htmlFor={'themeToggleCheckbox'}
      >
        <input
          checked={theme === 'light'}
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
