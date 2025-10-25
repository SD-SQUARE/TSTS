import React from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { UserOutlined, DeleteOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
    collapsed: boolean;
    name: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, name }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const activePath = location.pathname;

    const menuItems = [
        {
            key: "/profile",
            icon: <UserOutlined style={{ fontSize: 20 }} />,
            label: t("menu.personalInfo"),
        },
        {
            key: "/recyclebin",
            icon: <DeleteOutlined style={{ fontSize: 20 }} />,
            label: t("menu.recycleBin"),
        },
    ];

    const handleLogout = () => console.log("Logged out!");

    return (
        <Sider
            collapsed={collapsed}
            trigger={null}
            width={250}
            style={{ background: "#142337" }}
        >
            <div
                style={{
                    height: "92vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    {!collapsed && (
                        <div style={{ textAlign: "start", margin: "0px 0" }}>
                            <Title level={4} style={{ color: "white", margin: 20 }}>
                                {t("sidebar.welcome")}<br />{name}
                            </Title>
                        </div>
                    )}

                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[activePath]}
                        onClick={({ key }) => navigate(key)}
                        style={{ background: "#142337", border: "none", fontSize: 17 }}
                        items={menuItems}
                        rootClassName="custom-sidebar-menu"
                    />
                </div>

                <div style={{ padding: 16 }}>
                    <Button
                        type="default"
                        block={!collapsed}
                        onClick={handleLogout}
                        icon={collapsed ? <PoweroffOutlined  style={{ fontSize: 18 }} /> : undefined} // 👈 only show when collapsed
                        style={{
                            color: "#EBC35A",
                            borderColor: "#EBC35A",
                            background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#EBC35A";
                            e.currentTarget.style.color = "#142337";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#EBC35A";
                        }}
                    >
                        {!collapsed && t("sidebar.logout")}
                    </Button>

                </div>
            </div>
        </Sider>
    );
};

export default Sidebar;
