"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);
    // Simulate API call or any async operation for authentication
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success notification
      notification.success({
        message: "Login Success",
        description: "You have successfully logged in!",
      });
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[450px] h-[330px] p-6 bg-gray-100">
        <h3 className="text-2xl font-bold text-center pb-5">Login Now</h3>
        <Form
          form={form}
          name="normal_login"
          className="login-form w-full"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
              {
                pattern: /(?=.*[A-Z])/,
                message: "Password must contain at least one uppercase letter",
              },
              {
                pattern: /(?=.*[!@#$%^&*])/,
                message: "Password must contain at least one special character",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              className="bg-primary"
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-primary w-full h-10 mt-8"
              loading={isSubmitting}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
