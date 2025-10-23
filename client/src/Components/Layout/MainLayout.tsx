import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

const { Content } = Layout;

interface MainLayoutProps {
    name: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ name }) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh", direction: isArabic ? "rtl" : "ltr" }}>
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <Sidebar collapsed={collapsed} name={name} />
                <Layout style={{ padding: 20 }}>
                    <Content
                        style={{
                            background: "#fff",
                            borderRadius: 8,
                            padding: 24,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
