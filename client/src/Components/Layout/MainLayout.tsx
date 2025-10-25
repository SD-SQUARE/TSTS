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

    const siderWidth = collapsed ? 80 : 250;
    const headerHeight = 64;

    return (
        <Layout style={{ minHeight: "100vh", direction: isArabic ? "rtl" : "ltr" }}>
            <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <div
                style={{
                    position: "fixed",
                    top: headerHeight,
                    bottom: 0,
                    [isArabic ? "right" : "left"]: 0,
                    zIndex: 999,
                }}
            >
                <Sidebar collapsed={collapsed} name={name} />
            </div>
            
                <Layout style={{
                    marginTop: headerHeight,
                    marginLeft: isArabic ? 0 : siderWidth,
                    marginRight: isArabic ? siderWidth : 0,
                    transition: "all 0.2s",
                    padding: 20,
                    background: "#f5f6fa",
                    minHeight: "calc(100vh - 64px)",
                }}>
                    <Content
                        style={{
                            borderRadius: 8,
                            padding: 24,
                            height: '100%',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
    );
};

export default MainLayout;
