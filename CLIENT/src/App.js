import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProtectedRoutes from "./Pages/ProtectedRoutes/ProtectedRoutes";
import {AuthContext} from "./Context/AuthContext";

function App() {
    const getSession= useContext(AuthContext)
    const isLogged = getSession.token


    return (
        <div>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
            </Routes>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>
                <div className='flex w-full'>
                {(isLogged) ? <ProtectedRoutes/> : <Navigate
                    to={'/login'}/>} {/*this is protected route if user don't have token than redirect to log in*/}
                </div>
            </div>
        </div>
    );
}

export default App;
