import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { Button } from 'antd';

export default function ClientLayout() {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        console.log("Logout clicked");
    }


    return (
        <div>
            <h1>{localStorage.getItem('user_name') ? localStorage.getItem('user_name') : 'not register'}</h1>
            <Outlet />

            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
