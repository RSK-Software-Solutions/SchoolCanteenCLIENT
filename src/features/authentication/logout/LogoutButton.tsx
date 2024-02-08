import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import useAuthContext from '@/context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
    const user = useAuthContext();
    const { toast } = useToast();
    const navigate = useNavigate();
    const handleLogout = () => {
        toast({ variant: "default", title: "LOGOUT", description: `successfully logged out, goodbye ${user.user.login}` })
        user.clearSession();
        navigate("/login")

    }
    return <Button variant={'outline'} onClick={handleLogout}>Logout</Button>
}

