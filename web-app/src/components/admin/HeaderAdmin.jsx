import React from 'react';
import { useState } from "react";
import {
    Layout
} from "antd";


const { Header, Sider, Content } = Layout;

import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const HeaderAdmin = () => {
    return (
        <Header className="!bg-[#ffffff] !p-6 !pt-10 !pb-10 shadow-white drop-shadow-xl shadow flex justify-between items-center px-6 sticky top-0 z-50">
            <Link className="flex gap-2 justify-center items-center">
                <FaGraduationCap className="text-6xl text-white bg-blue-500 p-1 rounded-xl" />
                <div className="text-black text-2xl font-bold text-center py-4">
                    EduTest Admin
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <FaBell className="text-2xl relative" />
                    <span className="absolute top-[-5px] left-4 bg-red-500 text-white text-xs px-1 rounded-full">
                        3
                    </span>

                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col leading-tight">
                        <span className="font-medium ">Nguyễn Văn Admin</span>
                        <span className=" text-gray-600 text-sm self-end mr-1">Quản trị viên</span>
                    </div>

                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <p className="!text-[14px]">Admin</p>

                    </div>
                </div>
            </div>
        </Header>
    );
};

export default HeaderAdmin;