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
    BaseAPI.get("/auth/logout", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        localStorage.clear();
        history.push("/login");
        window.location.reload(false);
      });
  };

  const openSidenav = () => {
    setNavIsVisible(true);
  };

  return (
    <Layout>
      <Drawer title="nAcademy" placement="left" onClose={closeSidenav} visible={navIsVisible}>
        <MenuTopics onClick={closeSidenav} />
      </Drawer>

      <Sider breakpoint="lg" collapsedWidth="0" trigger={null} className="sidebar-layout">
        <div className="logo">nAcademy</div>
        <MenuTopics onClick={() => {}} />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: "#fff" }}>
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
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
