import React from 'react'

import { LoginComponents } from '@/4_features'
import { GoogleButton } from '@/4_features/GoogleAuthButton/GoogleAuthButton'
import Card from '@/6_shared/ui/Card'

export const LogIn: React.FC<any> = () => {
  return (
    <div>
      <Card>
        <GoogleButton />
        <LoginComponents />
      </Card>
    </div>
  )
}
