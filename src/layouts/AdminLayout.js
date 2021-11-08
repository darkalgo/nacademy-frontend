import React, { useState } from "react";
import { Button, Drawer, Layout } from "antd";
import { LogoutOutlined, LoadingOutlined, MenuOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { BaseAPI } from "../utils/Api";
import MenuTopics from "../container/MenuTopics";
import AppRoutes from "../routes";
import "../styles/Navbar.less";
import "../styles/Sidebar.less";

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [navIsVisible, setNavIsVisible] = useState(false);

  const closeSidenav = () => {
    setNavIsVisible(false);
  };

  const logout = () => {
    setLoading(true);
    BaseAPI.get("/auth/logout", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        localStorage.clear();
        history.push("/login");
      })
      .catch(() => {
        localStorage.clear();
        history.push("/login");
      })
      .finally(() => setLoading(false));
  };

  const openSidenav = () => {
    setNavIsVisible(true);
  };

  return (
    <Layout>
      <Drawer title="E-Commerce" placement="left" onClose={closeSidenav} visible={navIsVisible}>
        <MenuTopics onClick={closeSidenav} />
      </Drawer>

      <Sider breakpoint="lg" collapsedWidth="0" trigger={null} className="sidebar-layout">
        <div className="logo">E-Commerce</div>
        <MenuTopics />
      </Sider>

      <Layout>
        <Header className="site-layout-sub-header-background ">
          <Button className="menu" type="primary" icon={<MenuOutlined />} onClick={openSidenav} />
          <Button className="logout-btn" onClick={logout} danger icon={loading ? <LoadingOutlined /> : <LogoutOutlined />}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: "12px 24px", minHeight: 800 }}>
            <AppRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>E-commerce ©{new Date().getFullYear()} Created by NanoSoft</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
