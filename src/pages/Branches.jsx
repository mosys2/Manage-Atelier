import { Space, Table, Spin, Button, Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import {
  EllipsisOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import api from "../sevices/api.jsx";
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

  //fetch data
  useEffect(() => {
    //application
    api.API_Branches(ticker).then((result) => {
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

  return (
    <>
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
                <SettingOutlined key="setting" />,
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
                {item.status ? (
                  <span className="colorGreen">فعال</span>
                ) : (
                  <span className="colorRed">غیر فعال</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </>
  );
};
