import React from 'react'

import { SignUpCompontnts } from '@/4_features'
import { GoogleButton } from '@/4_features/GoogleAuthButton/GoogleAuthButton'
import Card from '@/6_shared/ui/Card'

export const SignUp: React.FC<any> = () => {
  return (
    <Card>
      <SignUpCompontnts />
    </Card>
  )
}
