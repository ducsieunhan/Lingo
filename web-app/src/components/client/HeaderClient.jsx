import React from 'react';
import { useState } from "react";
import {
    Button,
    Dropdown,
    Layout,
    Space
} from "antd";


const { Header, Sider, Content } = Layout;

import { FaBook, FaGraduationCap, FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import { FaChevronDown } from "react-icons/fa6";

const HeaderClient = () => {
    const menu = (
        <div className="p-4 bg-white rounded-xl shadow-md w-[350px]">

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <FaHeadphones className="text-blue-600" />
                    <span className="font-semibold">IELTS</span>
                </div>
                <Link className="flex justify-between items-center mb-2">
                    <span>IELTS Practice Test 1</span>
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Đã làm: 5</span>
                </Link>
                <Link className="flex justify-between items-center">
                    <span>IELTS Practice Test 2</span>
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Đã làm: 3</span>
                </Link>
            </div>


            <div>
                <div className="flex items-center gap-2 mb-2">
                    <FaBook className="text-purple-600" />
                    <span className="font-semibold">TOEIC</span>
                </div>
                <Link className="flex justify-between items-center mb-2">
                    <span>New Economy Test 10</span>
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">Đã làm: 8</span>
                </Link>
                <Link className="flex justify-between items-center">
                    <span>TOEIC Practice Test 5</span>
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Đã làm: 12</span>
                </Link>
            </div>
        </div>
    );


    return (
        <Header className="!bg-[#ffffff] !px-16 !py-10 shadow-white drop-shadow-xl shadow flex justify-between items-center px-6 sticky top-0 z-50">
            <Link className="flex gap-2 justify-center items-center">
                <FaGraduationCap className="text-5xl text-white bg-gradient-to-r from-[#0349bb] to-[#6306dd] p-1 rounded-xl" />
                <div className="text-black text-2xl font-bold text-center py-4">
                    TestPro
                </div>
            </Link>
            <Search placeholder="Tìm kiếm bài test..." size="large" className='!w-md !flex !items-center' allowClear></Search>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-8">
                    <Link to="/">
                        <p className="text-gray-700 hover:text-blue-600 text-base font-medium"> Trang chủ</p>

                    </Link>
                    <Space direction="vertical">
                        <Space wrap>
                            <Dropdown overlay={menu} placement="bottomRight" arrow className="w-48 !h-[45px]">
                                <Button className="!text-base !text-white font-medium !bg-[#2563eb]">
                                    Danh sách đề thi <FaChevronDown />
                                </Button>
                            </Dropdown>

                        </Space>
                    </Space>
                    <Link to="/">
                        <p className="text-gray-700 hover:text-blue-600 text-base font-medium">Thống kê</p>

                    </Link>
                    <div className='relative '>
                        <FaBell className="text-2xl relative" />
                        <span className="absolute top-[-5px] left-4 bg-red-500 text-white text-xs px-1 rounded-full">
                            3
                        </span>
                    </div>

                </div>
                <div className="flex items-center gap-2 ml-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer">
                        <p className="!text-[14px]">NA</p>

                    </div>
                    <span className="font-medium ">Nguyễn Văn A</span>



                </div>
            </div>
        </Header>
    );
};

export default HeaderClient;