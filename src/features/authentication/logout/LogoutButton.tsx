import { Button } from '@/components/ui/button'
import useAuthContext from '@/context/AuthContext'
import React from 'react'

export const LogoutButton = () => {
    const user = useAuthContext()
    return <Button variant={'outline'} onClick={() => user.clearSession()}>Logout</Button>
}

