import { useState } from "react";
import { Button, Checkbox, notification, Form, Input, Spin } from "antd";
import api_service from "../sevices/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [spinLoading, setSpinLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  let navigate = useNavigate();

  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const onFinish = (values) => {
    setSpinLoading(true);

    let objectLogin = { branchCode: 100, ...values };
    api_service.API_Authentication(objectLogin).then((result) => {
      setSpinLoading(false);
      if (result.data.isSuccess && result.status == 200) {
        openNotificationWithIcon("success", "ورود موفق!", result.data.message);
        console.log(result.data.data.jwtToken);
        localStorage.setItem("karg_atelier_token", result.data.data.jwtToken);
        setTimeout(function () {
          window.location.replace("/");
        }, 1000);
      } else {
        openNotificationWithIcon("error", "ورود ناموفق!", result.data.message);
      }
      console.log(result);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setSpinLoading(false);
  };

  return (
    <div className="LoginPage">
      {contextHolder}
      <Form
        name="logonform"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="نام کاربری"
          name="username"
          initialValue="mbshah"
          rules={[
            {
              required: true,
              message: "نام کاربری را وارد کنید",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="رمز عبور"
          name="password"
          initialValue="123456"
          rules={[
            {
              required: true,
              message: "رمز عبور را وارد نمیایید!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>مرا به خاطر بسپار</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Spin spinning={spinLoading} tip="منتظر بمانید...">
            <Button type="primary" htmlType="submit">
              ورود به سیستم
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </div>
  );
};
