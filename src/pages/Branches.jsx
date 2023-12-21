import {
  Space,
  Spin,
  Button,
  Avatar,
  Card,
  Modal,
  notification,
  Switch,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import api_service from "../sevices/api.jsx";
import { convertDate } from "../utils/index.jsx";
import { Link, useParams } from "react-router-dom";
import AddBranch from "./AddBranch.jsx";
import Meta from "antd/es/card/Meta.js";
import branchimg from "../assets/branch.svg";

const columns = [
  {
    title: "نام شعبه",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "کد شعبه",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "تاریخ انقضاء",
    dataIndex: "expireDate",
    key: "expireDate",
  },

  {
    title: "وضعیت",
    key: "status",
    dataIndex: "status",
    render: (_, record) =>
      record ? (
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
    title: "تلفن",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "عملیات",
    key: "action",
    render: (record) => (
      <>
        <Link to={""}>
          <Button style={{ marginLeft: 20 }}>عملیات شعبه</Button>
        </Link>
        <Space size="middle">
          <a>ویرایش</a>
          <a>حذف</a>
        </Space>
      </>
    ),
  },
];

export const Branches = () => {
  const params = useParams();
  let [ticker, setTicker] = React.useState(params.id);
  const [ateliersData, setAteliersData] = useState();
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
  //fetch data
  useEffect(() => {
    //application
    api_service.API_Branches(ticker).then((result) => {
      setSpinLoading(false);
      let items = [];
      result &&
        result?.data.data.map((item) => {
          items.push({
            id: item.id,
            title: item.title,
            code: item.code,
            status: item.status,
            phoneNumber: item.phoneNumber,
            isExpier: item.isExpier,
            expireDate: item?.expireDate
              ? convertDate({ date: item?.expireDate, format: "jDate2" })
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
      content: `حذف شعبه ${record.title}`,
      okText: "بلی",
      okType: "danger",
      cancelText: "خیر",
      onOk() {
        DeleteBranch(record.id);
      },
      onCancel() {
        setSpinLoading(false);
      },
    });
  };

  const DeleteBranch = (id) => {
    setSpinLoading(false);
    api_service.API_DeleteBranch(id).then((result) => {
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
    console.log(id);
    setSpinLoading(false);
    api_service.API_PostBranchChangeStatus(id).then((result) => {
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
      <div>
        <Link to={`/addbranch/` + params.id} className="link-button-blue">
          افزودن شعبه جدید
        </Link>
      </div>
      <Spin spinning={spinLoading} tip="در حال بارگذاری...">
        {/* <Table
          style={{ marginTop: 15 }}
          pagination={false}
          columns={columns}
          dataSource={ateliersData}
        /> */}
        <div className="branches">
          {ateliersData?.map((item) => (
            <Card
              key={item.id}
              style={{
                width: 300,
                marginLeft: 12,
                marginBottom: 10,
              }}
              actions={[
                <DeleteOutlined
                  key="setting"
                  onClick={() => showDeleteConfirm(item)}
                />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={branchimg} />}
                title={item.title}
                description={"کد شعبه: " + item.code}
              />
              <div className="mt10">
                تاریخ انقضا:
                {item.isExpier ? (
                  <span className="colorRed">{item.expireDate}</span>
                ) : (
                  <span className="colorGreen">{item.expireDate}</span>
                )}
              </div>
              <div className="mt10">
                وضعیت:
                <Switch
                  style={{ marginRight: 10 }}
                  onChange={() => changeStatus(item.id)}
                  className="ant-switch-me"
                  defaultChecked={item.status === true ? true : false}
                  checkedChildren="فعال"
                  unCheckedChildren="غیرفعال"
                />
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </>
  );
};
