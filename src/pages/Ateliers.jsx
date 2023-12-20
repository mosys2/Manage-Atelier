import { Space, Table, Spin, Button } from "antd";
import React, { useEffect, useState } from "react";

import api from "../sevices/api.jsx";
import { convertDate } from "../utils/index.jsx";
import { Link } from "react-router-dom";

const Ateliers = () => {
  const [ateliersData, setAteliersData] = useState("");
  const [loading, setLoading] = useState(true);
  const [spinLoading, setSpinLoading] = useState(true);
  let [ticker, setTicker] = React.useState("");

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
      render: (_, record) =>
        record.status ? (
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
              مدیریت شعبه ها (‍ ‍{record.branchCount} )
            </Button>
          </Link>
          <Space size="middle">
            <a>ویرایش</a>
            <a>حذف</a>
          </Space>
        </>
      ),
    },
  ];
  //fetch data
  useEffect(() => {
    //application
    api.API_Ateliers(ticker).then((result) => {
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

  return (
    <Spin spinning={spinLoading} tip="در حال بارگذاری...">
      <Table pagination={false} columns={columns} dataSource={ateliersData} />
    </Spin>
  );
};
export default Ateliers;
