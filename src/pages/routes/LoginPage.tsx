import React from 'react'
import Login from "../../components/authComponents/Login";

const LoginPage = () => {
    return (
        <div className='h-screen flex justify-center '>
            <form className='flex flex-col self-center'>
                <Login/>
            </form>
        </div>
    )
}

export default LoginPage