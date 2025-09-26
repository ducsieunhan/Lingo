import React from 'react';
import { Outlet } from "react-router-dom";
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';

export default function AuthLayout() {
    return (
        <div className=" min-h-screen flex items-center justify-center px-4 py-8 bg-[#3b82f6]">
            <div className="shake bg-[#FFFFFF]  rounded-2xl shadow-2xl p-8 w-full max-w-lg relative z-10">
                <AuthHeader />
                <Outlet />
                <AuthFooter />
            </div>
        </div>
    );
}
