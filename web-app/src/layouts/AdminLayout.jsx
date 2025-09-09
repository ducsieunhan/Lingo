import { useState } from "react";
import {
    Layout
} from "antd";


const { Content } = Layout;

import { Outlet } from "react-router-dom";

import HeaderAdmin from "../components/admin/HeaderAdmin";
import SideAdmin from "../components/admin/SideAdmin";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <HeaderAdmin />
            <Layout className="min-h-screen mt-[10px]">
                <SideAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout
                    className={`transition-all duration-300 ${collapsed ? "ml-[80px]" : "ml-[200px]"
                        } `}
                >
                    <Content className="p-6 bg-[#f9fafb]">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>

    );
}
