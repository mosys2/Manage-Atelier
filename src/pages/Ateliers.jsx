import {
  Space,
  Table,
  Spin,
  Button,
  Modal,
  notification,
  Switch,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

import api_service from "../sevices/api.jsx";
import { convertDate } from "../utils/index.jsx";
import { Link } from "react-router-dom";

const Ateliers = () => {
  const [ateliersData, setAteliersData] = useState("");
  const [loading, setLoading] = useState(true);
  const [spinLoading, setSpinLoading] = useState(true);
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
      title: "نام آتلیه",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "insertTime",
      key: "insertTime",
    },

    {
      title: "وضعیت",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <Switch
            onChange={() => changeStatus(record.id)}
            className="ant-switch-me"
            defaultChecked={record.status == true ? true : false}
            checkedChildren="فعال"
            unCheckedChildren="غیرفعال"
          />
        );
      },
    },
    {
      title: "تعداد شعبه ها",
      dataIndex: "branchCount",
      key: "branchCount",
    },
    {
      title: "عملیات",
      key: "action",
      render: (record) => (
        <>
          <Link to={"/branches/" + record.id}>
            <Button style={{ marginLeft: 20 }}>
              مدیریت شعبه ها (‍ ‍{record.branchCount})
            </Button>
          </Link>
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
    //application
    api_service.API_Ateliers("").then((result) => {
      setSpinLoading(false);
      let items = [];
      result &&
        result?.data.data.map((item) => {
          items.push({
            id: item.id,
            name: item.name,
            status: item.status,
            branchCount: item.branchCount,
            insertTime: item?.insertTime
              ? convertDate({ date: item?.insertTime, format: "jDate2" })
              : "-",
          });
        });
      result && console.log(items);
      setAteliersData(items);
    });
    setLoading(false);
  }, [loading]);

  const showDeleteConfirm = (record) => {
    console.log(record);
    setSpinLoading(true);
    confirm({
      title: "آیا مطمئن هستید؟",
      icon: <ExclamationCircleFilled />,
      content: `حذف آتلیه ${record.name}`,
      okText: "بلی",
      okType: "danger",
      cancelText: "خیر",
      onOk() {
        DeleteAtelierBase(record.id);
      },
      onCancel() {
        setSpinLoading(false);
      },
    });
  };
  const DeleteAtelierBase = (id) => {
    setSpinLoading(false);
    api_service.API_DeleteAtelierBase(id).then((result) => {
      if (result.data.isSuccess) {
        openNotificationWithIcon("success", "موفق!", result.data.message);
        setSpinLoading(true);
        setLoading(true);
      } else {
        openNotificationWithIcon("error", "خطا!", result.data.message);
      }
    });
  };
  const changeStatus = (id) => {
    setSpinLoading(false);
    api_service.API_PostAtelierChangeStatus(id).then((result) => {
      if (result.data.isSuccess) {
        message.success(result.data.message);
      } else {
        message.success(result.data.message);
      }
    });
  };
  return (
    <>
      {contextHolder}
      <Spin spinning={spinLoading} tip="در حال بارگذاری...">
        <Table pagination={false} columns={columns} dataSource={ateliersData} />
      </Spin>
    </>
  );
};
export default Ateliers;
