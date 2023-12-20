import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  notification,
} from "antd";
import api_service from "../sevices/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import { format } from "date-fns";

import dayjs from "dayjs"; // import locale
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import convertDate from "../utils/convertDate.jsx";
import { formater } from "../utils/formater.jsx";

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

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const timezone = -(new Date().getTimezoneOffset() / 60);

const AddBranch = () => {
  const params = useParams();
  let [atelierBaseId, setAtelierBaseId] = useState(params.id);
  const [spinLoading, setSpinLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  let navigate = useNavigate();

  // var dt = new Date("Mon Dec 18 2023 15:52:27 GMT+0330 (Iran Standard Time)");
  // const formattedDate = format(dt, "yyyy-MM-dd HH:mm:ss.SSS");

  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const onFinish = (values) => {
    setSpinLoading(true);

    console.log(values);
    var date = new Date(values?.expireDate?.$d);
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");

    let branchData = {
      ...values,
      expireDate: formattedDate,
      atelierBaseId,
      StatusDescription: "",
    };
    console.log(branchData);
    api_service.API_PostBranch(branchData).then((result) => {
      console.log(result);
      setSpinLoading(false);
      if (result.data.isSuccess) {
        openNotificationWithIcon("success", "موفق!", result.data.message);
        setTimeout(function () {
          navigate(`/branches/${atelierBaseId}`);
        }, 1000);
      } else {
        openNotificationWithIcon("error", "خطا!", result.data.message);
      }
    });
  };
  //date
  useJalaliLocaleListener();
  dayjs.locale("fa_IR");
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
          name="title"
          label="عنوان شعبه "
          rules={[
            { required: true, message: "لطفا عنوان شعبه را وارو نمایید!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="code"
          label="کد شعبه"
          rules={[{ required: true, message: "لطفا کد شعبه را وارو نمایید!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item name="phoneNumber" label="تلفن">
          <Input />
        </Form.Item>

        <Form.Item name="expireDate" label="تاریخ انقضاء" valuePropName="value">
          <DatePickerJalali
            style={{ width: "100%" }}
            className="ant-input-me"
          />
        </Form.Item>

        <Form.Item
          label="وضعیت"
          name="status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item name="description" label="توضیحات">
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item name="address" label="آدرس">
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
export default AddBranch;
