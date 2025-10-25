/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Upload,
    Avatar,
    Space,
    message,
    Flex,
    Popover,
} from "antd";
import {
    EditOutlined,
    LockOutlined,
    MailOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import RequiredTag from "../Components/RequiredTag";
import api from "../api/AxiosInstance";

const Profile = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [passForm] = Form.useForm(); 
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [userFields, setUserFields] = useState<{ [key: string]: string }>({});
    const [editingInfo, setEditingInfo] = useState(false);
    const [editingPassInfo, setEditingPassInfo] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await api.get("/profile"); 
                const data = res.data;

                setUserFields(data);
                form.setFieldsValue(data);
                setProfileImage(data.profileImage || null);
            } catch (err) {
                message.error("Failed to load user profile");
            }
        };

        fetchUserProfile();
    }, [form]);

    const handleEditInfo = () => setEditingInfo(true);
    const handlePassEditInfo = () => setEditingPassInfo(true);

    const handleCancelEdit = () => {
        form.resetFields();
        setEditingInfo(false);
    };

    const handleSaveInfo = async () => {
        try {
            const values = await form.validateFields();
            await api.put("/profile/info", values);
            message.success("Profile updated successfully!");
            setEditingInfo(false);
        } catch {
            message.error("Failed to save changes");
        }
    };

    const handleCancelPassEdit = () => {
        passForm.resetFields();
        setEditingPassInfo(false);
    };

    const handleSavePass = async () => {
        try {
            const values = await passForm.validateFields();
            await api.put("/profile/changepassword", {
                password: values.password,
            });
            message.success("Password changed successfully!");
            setEditingPassInfo(false);
        } catch {
            message.error("Failed to change password");
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleImageChange = (info: any) => {
        if (info.file.status === "done" || info.file.originFileObj) {
            const file = info.file.originFileObj;
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <Avatar
                            size={200}
                            src={profileImage}
                            icon={<UserOutlined />}
                            style={{
                                background: "#E6E6E6",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            }}
                        />
                        {editingInfo && (
                            <Upload
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    shape="circle"
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: "calc(50% - 65px)",
                                        transform: "translate(50%, 20%)",
                                        background: "#EBC35A",
                                        color: "#023373",
                                        border: "none",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                    }}
                                />
                            </Upload>
                        )}
                    </div>
                </div>

                <Card
                    title={
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 22,
                            }}
                        >
                            <UserOutlined style={{ fontSize: 26 }} />
                            {t("profile.accountInfo") || "User Info"}
                        </span>
                    }
                    extra={
                        !editingInfo && (
                            <Button
                                icon={<EditOutlined />}
                                onClick={handleEditInfo}
                                style={{
                                    color: "black",
                                    borderColor: "#EBC35A",
                                    background: "#EBC35A",
                                }}
                            />
                        )
                    }
                    style={{ borderRadius: 12 }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        disabled={!editingInfo}
                        requiredMark={false}
                    >
                        {Object.entries(userFields).map(([key, value]) => {
                            if (key === "email") {
                                return (
                                    <Form.Item
                                        key={key}
                                        label={
                                            <Flex align="center" gap="small">
                                                <span style={{ textTransform: "capitalize" }}>
                                                    {key}
                                                </span>
                                                <RequiredTag />
                                            </Flex>
                                        }
                                        name={key}
                                    >
                                        <Popover
                                            placement="right"
                                            trigger="hover"
                                            title="Email Verification Status"
                                            content={
                                                userFields.emailVerified ? (
                                                    <span style={{ color: "green" }}>
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "red" }}>
                                                        Not Verified
                                                    </span>
                                                )
                                            }
                                        >
                                            <Input
                                                defaultValue={value}
                                                prefix={<MailOutlined />}
                                                disabled={!editingInfo}
                                                style={{
                                                    backgroundColor: !editingInfo ? "#fafafa" : "white",
                                                }}
                                            />
                                        </Popover>
                                    </Form.Item>
                                );
                            }

                            return (
                                key !== "profileImage" &&
                                key !== "emailVerified" && (
                                    <Form.Item
                                        key={key}
                                        label={
                                            <Flex align="center" gap="small">
                                                <span style={{ textTransform: "capitalize" }}>
                                                    {key}
                                                </span>
                                                <RequiredTag />
                                            </Flex>
                                        }
                                        name={key}
                                    >
                                        <Input defaultValue={value} />
                                    </Form.Item>
                                )
                            );
                        })}


                        {editingInfo && (
                            <Space
                                direction="vertical"
                                style={{ width: "100%", display: "flex" }}
                            >
                                <Button
                                    type="primary"
                                    onClick={handleSaveInfo}
                                    style={{ flex: 1, marginRight: 8, background: "#218f4f" }}
                                    block
                                >
                                    {t("profile.save")}
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    className="hover-fill"
                                    danger
                                    style={{ flex: 1 }}
                                    block
                                >
                                    {t("profile.cancel")}
                                </Button>
                            </Space>
                        )}
                    </Form>
                </Card>

                <Card
                    title={
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 22,
                            }}
                        >
                            <LockOutlined style={{ fontSize: 26 }} />
                            {t("profile.changePassword") || "Change Password"}
                        </span>
                    }
                    style={{ borderRadius: 12 }}
                    extra={
                        !editingPassInfo && (
                            <Button
                                icon={<EditOutlined />}
                                onClick={handlePassEditInfo}
                                style={{
                                    color: "black",
                                    borderColor: "#EBC35A",
                                    background: "#EBC35A",
                                }}
                            />
                        )
                    }
                >
                    <Form
                        form={passForm}
                        layout="vertical"
                        disabled={!editingPassInfo}
                        requiredMark={false}
                    >
                        <Form.Item
                            name="password"
                            label={
                                <Flex align="start" gap="small">
                                    <span>{t("forgotPassword.password")}</span>
                                    <RequiredTag />
                                </Flex>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: t(
                                        "forgotPassword.requiredPasswordError"
                                    ),
                                },
                                {
                                    min: 8,
                                    message:
                                        t("forgotPassword.passwordTooShort") ||
                                        "Password must be at least 8 characters.",
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        const regex =
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
                                        if (!regex.test(value)) {
                                            return Promise.reject(
                                                new Error(
                                                    t(
                                                        "forgotPassword.weakPassword"
                                                    ) ||
                                                    "Password must contain uppercase, lowercase, number, and special character."
                                                )
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={
                                <Flex align="start" gap="small">
                                    <span>
                                        {t("forgotPassword.confirmPassword")}
                                    </span>
                                    <RequiredTag />
                                </Flex>
                            }
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: t(
                                        "forgotPassword.requiredConfirmPasswordError"
                                    ),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        return !value ||
                                            getFieldValue("password") === value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                new Error(
                                                    t(
                                                        "forgotPassword.passwordMismatch"
                                                    )
                                                )
                                            );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        {editingPassInfo && (
                            <Space
                                direction="vertical"
                                style={{ width: "100%", display: "flex" }}
                            >
                                <Button
                                    type="primary"
                                    onClick={handleSavePass}
                                    style={{ flex: 1, marginRight: 8, backgroundColor: "#218f4f" }}
                                    block
                                >
                                    {t("profile.save")}
                                </Button>
                                <Button
                                    onClick={handleCancelPassEdit}
                                    className="hover-fill"
                                    danger
                                    style={{ flex: 1, }}
                                    block
                                >
                                    {t("profile.cancel")}
                                </Button>
                            </Space>
                        )}
                    </Form>
                </Card>
            </Space>
        </div>
    );
};

export default Profile;
