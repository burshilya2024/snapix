import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: (() => T) | T) {
  const isServer = typeof window === 'undefined'
  const [value, setValue] = useState<T>(() => {
    if (!isServer) {
      const jsonValue = localStorage.getItem(key) || ''

      if (jsonValue == null) {
        if (typeof initialValue === 'function') {
          return (initialValue as () => T)()
        } else {
          return initialValue
        }
      } else {
        try {
          return JSON.parse(jsonValue)
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error)

          return initialValue
        }
      }
    }

    return initialValue // Return initial value on the server
  })

  useEffect(() => {
    if (!isServer) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error storing JSON for key "${key}":`, error)
      }
    }
  }, [value, key, isServer])

  return [value, setValue] as const
}
