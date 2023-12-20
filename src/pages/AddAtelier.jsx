import { Button, Form, Input, Spin, Switch, notification } from "antd";
import api_service from "../sevices/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const AddAtelier = () => {
  const [spinLoading, setSpinLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const onFinish = (values) => {
    setSpinLoading(true);
    api_service.API_PostAtelier(values).then((result) => {
      setSpinLoading(false);
      if (result.data.isSuccess) {
        openNotificationWithIcon("success", "موفق!", result.data.message);
        setTimeout(function () {
          navigate("/ateliers");
        }, 1000);
      } else {
        openNotificationWithIcon("error", "خطا!", result.data.message);
      }
    });
  };

  return (
    <>
      {contextHolder}

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="نام آتلیه"
          rules={[
            { required: true, message: "لطفا نام آتلیه را وارو نمایید!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="وضعیت"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item name="statusMessage" label="پیام وضعیت">
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item name="description" label="توضیحات">
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Spin spinning={spinLoading} tip="منتظر بمانید...">
            <Button type="primary" htmlType="submit">
              ثبت
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddAtelier;
