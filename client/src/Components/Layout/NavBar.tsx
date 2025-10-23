import React from "react";
import { Layout, Typography, Avatar, Button, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Title } = Typography;

interface NavbarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const handleLanguageChange = () => {
        i18n.changeLanguage(isArabic ? "en" : "ar");
        document.body.dir = isArabic ? "ltr" : "rtl";
    };

    return (
        <Header
            style={{
                background: "#142337",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                flexDirection: isArabic ? "row-reverse" : "row",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {collapsed ? (
                    <MenuUnfoldOutlined
                        onClick={() => setCollapsed(false)}
                        style={{ color: "white", cursor: "pointer" }}
                    />
                ) : (
                    <MenuFoldOutlined
                        onClick={() => setCollapsed(true)}
                        style={{ color: "white", cursor: "pointer" }}
                    />
                )}
                <Title level={3} style={{ color: "white", margin: 0 }}>
                    {t("app.title")}
                </Title>
            </div>

            <Space align="center" size={20}>
                <Button
                    onClick={handleLanguageChange}
                    style={{
                        background: "transparent",
                        color: "white",
                        border: "1px solid white",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {isArabic ? "EN" : "ع"}
                </Button>
                <Avatar icon={<UserOutlined />} style={{ background: "white", color: "#023373" }} />
            </Space>
        </Header>
    );
};

export default Navbar;
