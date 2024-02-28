import { useAuthSuccess } from '@/4_features/Authorization/GoogleAuth/hooks/useAuthSuccess'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'
import React from 'react'

export function AuthSuccess() {
  useAuthSuccess()
  return (
    <div>
      <MyCustomSpinner />
    </div>
  )
}
