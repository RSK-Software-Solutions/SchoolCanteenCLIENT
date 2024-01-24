import React, { useEffect } from 'react'
import Login from '@/features/authentication/Login';
import useAuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { token } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [token, navigate])
    return (
        <div className='h-screen flex flex-col justify-center bg-slate-300'>
            <form className='flex flex-col self-center'>
                <Login />
            </form>
        </div>
    )
}

export default LoginPage