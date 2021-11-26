import React, { useState } from "react";
import { Avatar, Button, Drawer, Dropdown, Layout, Menu } from "antd";
import { LogoutOutlined, LoadingOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

import { BaseAPI } from "../utils/Api";
import MenuTopics from "../container/MenuTopics";
import AppRoutes from "../routes";
import "../styles/Navbar.less";
import "../styles/Sidebar.less";

const { Header, Content, Sider } = Layout;

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
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        sessionStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        sessionStorage.clear();
        history.push("/login");
        window.location.reload(false);
      });
  };

  const openSidenav = () => {
    setNavIsVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        User Profile <Link to="/tutor/profile" />
      </Menu.Item>
      <Menu.Item key="2" onClick={logout} icon={loading ? <LoadingOutlined /> : <LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
          <Dropdown className="logout-btn" overlay={menu} placement="topRight" arrow>
            <Avatar style={{ backgroundColor: "#039be5" }} icon={<UserOutlined />} />
          </Dropdown>
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
