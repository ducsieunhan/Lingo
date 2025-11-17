import React from 'react';
import { Outlet } from "react-router-dom";
import HeaderClient from '../components/client/HeaderClient';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Chatbot from '../components-ATI/ai-tools/Chatbot';
import { ChatbotProvider } from "../contexts/ChatbotContext";
import Footer from '../components-ATI/homepage/Footer';
export default function ClientLayout() {
    return (
        <ChatbotProvider>
            <HeaderClient />
            <Layout>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <Footer />
            <Chatbot />
        </ChatbotProvider>
    );
}
