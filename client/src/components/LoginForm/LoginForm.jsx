import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { loginSchema } from "./validation/loginSchema.ts";
import { useAuth } from "./hooks/useAuth.ts";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

const LoginForm = () => {
  const { handleLogin, isLoading, error } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = Object.entries(result.error.flatten().fieldErrors);
      fieldErrors.forEach(([field, messages]) => {
        form.setFields([{ name: field, errors: messages }]);
      });
      return;
    }
    handleLogin(values);
  };

  const onValuesChange = (_, allValues) => {
    const result = loginSchema.safeParse(allValues);

    if (result.success) {
      form.setFields([
        { name: "email", errors: [] },
        { name: "password", errors: [] },
      ]);
    } else {
      const fieldErrors = Object.entries(result.error.flatten().fieldErrors);
      fieldErrors.forEach(([field, messages]) => {
        form.setFields([{ name: field, errors: messages }]);
      });
    }
  };

  return (
    <div
      className={`login-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left */}
      <div className="login-left">
        {/* logo here */}
      </div>

      {/* Right */}
      <div className="login-right">
        <Title className="login-title">
          Login
        </Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange} 
          requiredMark={false}
          validateTrigger="onChange" 
        >
          <Form.Item
            name="email"
            label={
              <span className="form-label">
                <MailOutlined className="label-icon" style={{ marginRight: 6 }} />
                Email
              </span>
            }
          >
            <Input placeholder="example@mail.com" className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span className="form-label">
                |** Password
              </span>
            }
          >
            <Input.Password placeholder="********" className="login-input" />
          </Form.Item>

          <div className="forgot-password">
            <a href="#">Forget password?</a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
