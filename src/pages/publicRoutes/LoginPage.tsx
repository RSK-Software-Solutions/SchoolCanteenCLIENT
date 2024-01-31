import React from 'react'
import Login from '@/features/authentication/Login';


const LoginPage = () => {

    return (
        <div className='h-screen flex flex-col justify-center bg-muted'>
            <form className='flex flex-col self-center'>
                <Login />
            </form>
        </div>
    )
}

export default LoginPage