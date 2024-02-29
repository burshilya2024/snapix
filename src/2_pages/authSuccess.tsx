import React from 'react'

import { useAuthSuccess } from '@/4_features/Authorization/GoogleAuth/hooks/useAuthSuccess'
import { MyCustomSpinner } from '@/6_shared/ui/CustomSpinner'

export function AuthSuccess() {
  useAuthSuccess()

  return (
    <div>
      <MyCustomSpinner />
    </div>
  )
}
