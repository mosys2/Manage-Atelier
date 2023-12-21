import {
  Space,
  Table,
  Spin,
  Button,
  Form,
  Select,
  Modal,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import api_service from "../sevices/api.jsx";
import { convertDate } from "../utils/index.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
const Customers = () => {
  const [usersData, setUsersData] = useState("");
  const [roles, setRoles] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [spinUserLoading, setSpinUserLoading] = useState(true);
  const [spinRoleLoading, setSpinRoleLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const { confirm } = Modal;
  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };
  const columns = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "تلفن همراه",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "کد شعبه",
      dataIndex: "branchCode",
      key: "branchCode",
    },
    {
      title: "عنوان شعبه",
      dataIndex: "branchTitle",
      key: "branchTitle",
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "insertTime",
      key: "insertTime",
    },

    {
      title: "وضعیت",
      key: "isActive",
      dataIndex: "isActive",
      render: (_, record) =>
        record.isActive ? (
          <>
            <span style={{ marginRight: 5, color: "green" }}>فعال</span>
          </>
        ) : (
          <>
            <span style={{ marginRight: 5, color: "red" }}>غیرفعال</span>
          </>
        ),
    },

    {
      title: "عملیات",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button>ویرایش</Button>
            <Button danger onClick={() => showDeleteConfirm(record)}>
              حذف
            </Button>
          </Space>
        </>
      ),
    },
  ];

  //fetch data
  useEffect(() => {
    setSpinRoleLoading(false);
    //application
    api_service.API_GetRole("").then((result) => {
      console.log(result);
      let items = [];
      items.push({
        id: "",
        persianTitle: "همه ی موارد",
      });
      result &&
        result?.data.map((item) => {
          items.push({
            id: item.id,
            persianTitle: item.persianTitle,
          });
        });
      result && console.log(items);
      setRoles(items);
      setSpinRoleLoading(false);
    });
  }, [spinRoleLoading]);

  //fetch data
  useEffect(() => {
    //application
    api_service.API_GetUsers(role).then((result) => {
      setSpinUserLoading(false);
      let items = [];
      result &&
        result?.data.data.users.map((item) => {
          items.push({
            userId: item.userId,
            fullName: item.fullName,
            phoneNumber: item.phoneNumber,
            isActive: item.isActive,
            branchCode: item.branchCode,
            branchTitle: item.branchTitle,
            insertTime: item?.insertTime
              ? convertDate({ date: item?.insertTime, format: "jDate2" })
              : "-",
          });
        });
      result && console.log(items);
      setUsersData(items);
    });
    setLoading(false);
  }, [role, loading]);

  const showDeleteConfirm = (record) => {
    console.log(record);
    setSpinUserLoading(true);
    confirm({
      title: "آیا مطمئن هستید؟",
      icon: <ExclamationCircleFilled />,
      content: `حذف کاربر ${record.fullName}`,
      okText: "بلی",
      okType: "danger",
      cancelText: "خیر",
      onOk() {
        DeleteUser(record.userId);
      },
      onCancel() {
        setSpinUserLoading(false);
      },
    });
  };

  const DeleteUser = (id) => {
    setSpinUserLoading(false);
    api_service.API_DeleteUser(id).then((result) => {
      if (result.data.isSuccess) {
        openNotificationWithIcon("success", "موفق!", result.data.message);
        setSpinUserLoading(true);
        setLoading(true);
      } else {
        openNotificationWithIcon("error", "خطا!", result.data.message);
      }
    });
  };

  const changeRole = (e) => {
    setSpinUserLoading(true);
    setRole(e);
  };
  return (
    <>
      {contextHolder}
      <Spin spinning={spinRoleLoading} tip="در حال بارگذاری...">
        <Form.Item
          name="branchId"
          label="سطح دسترسی"
          valuePropName="value"
          style={{ width: 400 }}
        >
          <Select
            onChange={(e) => changeRole(e)}
            value={roles && roles}
            allowClear
            placeholder="مرتب کردن بر اساس سطح دسترسی "
          >
            {roles &&
              roles?.map((item2, key) => {
                return (
                  <Select.Option key={key} value={item2.id}>
                    {item2.persianTitle}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
      </Spin>
      <Spin spinning={spinUserLoading} tip="در حال بارگذاری...">
        <Table pagination={false} columns={columns} dataSource={usersData} />
      </Spin>
    </>
  );
};
export default Customers;
