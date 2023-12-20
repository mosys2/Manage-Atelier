import { Button, Form, Input, Select, Spin, Switch, notification } from "antd";
import api_service from "../sevices/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";
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
const AddCustomer = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const [ateliersData, setAteliersData] = useState("");
  const [branches, setBranches] = useState(null);
  const [spinLoading, setSpinLoading] = useState(false);
  const [loadingAteliers, setLoadingAteliers] = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(false);

  let [ticker, setTicker] = useState("");
  let navigate = useNavigate();

  //fetch data
  useEffect(() => {
    //application
    setLoadingAteliers(true);

    api_service.API_Ateliers(ticker).then((result) => {
      let items = [];
      result &&
        result?.data.data.map((item) => {
          items.push({
            id: item.id,
            name: item.name,
          });
        });
      result && setLoadingAteliers(false);
      setAteliersData(items);
    });
    setLoadingAteliers(false);
  }, [loadingAteliers]);

  const getBraches = (e) => {
    setLoadingBranches(true);
    api_service.API_Branches(e).then((result) => {
      let itemsb = [];
      result &&
        result?.data.data.map((item) => {
          itemsb.push({
            id: item.id,
            title: item.title,
          });
        });
      result && setBranches(itemsb);
      console.log(itemsb);
      setLoadingBranches(false);
    });
  };

  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };

  const onFinish = (values) => {
    let data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      branchId: values.branchId,
      gender: values.gender,
      isActive: values.isActive,
      address: values.address,
      homeNumber: values.homeNumber,
    };
    setSpinLoading(true);
    api_service.API_PostAdmin(data).then((result) => {
      setSpinLoading(false);
      if (result.data.isSuccess) {
        openNotificationWithIcon("success", "موفق!", result.data.message);
        setTimeout(function () {
          navigate("/customers");
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
          name="firstName"
          label="نام "
          rules={[{ required: true, message: "لطفا نام را وارو نمایید!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="نام خانوادگی"
          rules={[
            { required: true, message: "لطفا نام خانوادگی را وارو نمایید!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="ایمیل"
          rules={[{ required: true, message: "لطفا ایمیل را وارو نمایید!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phoneNumber" label="موبایل">
          <Input />
        </Form.Item>

        <Form.Item name="homeNumber" label="تلفن">
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="رمزعبور"
          rules={[{ required: true, message: "لطفا رمزعبور را وارو نمایید!" }]}
        >
          <Input />
        </Form.Item>
        <Spin spinning={loadingAteliers} tip="در حال بارگذاری...">
          <Form.Item
            name="ateliers"
            label="آتلیه"
            rules={[
              {
                required: true,
                message: "لطفا آتلیه را انتخاب  کنید!",
              },
            ]}
          >
            <Select
              showSearch
              onChange={(e) => getBraches(e)}
              placeholder="آتلیه را انتخاب کنید"
            >
              {ateliersData?.length > 0 &&
                ateliersData?.map((item, key) => {
                  return (
                    <Option key={key} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Spin>
        <Spin spinning={loadingBranches} tip="در حال بارگذاری...">
          <Form.Item
            name="branchId"
            label="شعبه"
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "لطفا شعبه را انتخاب  کنید!",
              },
            ]}
          >
            <Select
              value={branches && branches}
              allowClear
              placeholder="شعبه را انتخاب کنید"
            >
              {branches &&
                branches?.map((item2, key) => {
                  return (
                    <Select.Option key={key} value={item2.id}>
                      {item2.title}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Spin>
        <Form.Item
          name="gender"
          label="جنسیت"
          rules={[
            {
              required: true,
              message: "لطفا جنسیت را انتخاب  کنید!",
            },
          ]}
        >
          <Select placeholder="جنسیت را انتخاب کنید">
            <Option value={1}>آقا</Option>
            <Option value={0}>خانم</Option>
            <Option value={3}>نامشخص</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="وضعیت"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch defaultChecked />
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
export default AddCustomer;
