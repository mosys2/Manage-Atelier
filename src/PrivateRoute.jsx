import React, { useState } from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import {
  SolutionOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import { LogOut } from "./pages/LogOut";
import { Progress } from "react-progress";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("مشتریان", "sub1", <UserOutlined />, [
    getItem(<Link to="/addcustomer">افزودن</Link>, "1"),
    getItem(<Link to="/customers">لیست مشتریان</Link>, "2"),
  ]),
  getItem("آتلیه", "sub2", <SolutionOutlined />, [
    getItem(<Link to="/addatelier">افزودن</Link>, "4"),
    getItem(<Link to="/ateliers">آتلیه ها</Link>, "3"),
  ]),
  getItem(
    <Link to="/logout" style={{ color: "red" }}>
      خروج
    </Link>,
    "sub3",
    <ArrowLeftOutlined style={{ color: "red" }} />
  ),
];

const PrivateRoute = () => {
  let token = localStorage.getItem("karg_atelier_token");
  let auth = { token: true };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return auth.token ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          توسعه توسط کارگ1402
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
