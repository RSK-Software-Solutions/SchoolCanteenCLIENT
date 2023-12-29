import React from 'react'
import RegisterInput from "../Components/RegisterComponents/RegisterInput";

const RegisterPage = () => {
    return (
        <div className='h-screen flex justify-center'>
            <form className='flex flex-col self-center'>
                <RegisterInput/>
            </form>
        </div>
    )
}

export default RegisterPage