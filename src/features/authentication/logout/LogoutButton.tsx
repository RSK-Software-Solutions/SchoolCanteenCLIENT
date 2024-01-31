import { Button } from '@/components/ui/button'
import useAuthContext from '@/context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
    const user = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        user.clearSession();
        navigate("/login")
    }
    return <Button variant={'outline'} onClick={handleLogout}>Logout</Button>
}

