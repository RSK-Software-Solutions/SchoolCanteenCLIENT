import React, { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProtectedRoutes from "./Pages/ProtectedRoutes/ProtectedRoutes";
import { AuthContext } from "./Context/AuthContext";

function App() {
    const getSession = useContext(AuthContext)
    const isLogged = getSession.token
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Routes>
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/register'} element={<RegisterPage />} />
            </Routes>
            <Navbar setIsOpen={setIsOpen} />
            <div className='flex w-full'>
                <Sidebar isOpen={isOpen} />
                <div className='flex w-full'>
                    {(isLogged) ? <ProtectedRoutes /> : <Navigate
                        to={'/login'} />} {/*this is protected route if user don't have token than redirect to log in*/}
                </div>
            </div>
        </div>
    );
}

export default App;
