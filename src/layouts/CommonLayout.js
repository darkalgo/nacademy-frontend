import React, { useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import { Link, Switch, Route } from "react-router-dom";

import { AppRootContextProvider } from "../contexts/AppRootContext";

import AdminLayout from "./AdminLayout";
import LoggedInRoute from "../routes/ProtectedRoute/LoggedInRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Registration from "../pages/Registration";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const CommonLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppRootContextProvider>
      <Layout>
        {!localStorage.getItem("accessToken") && (
          <Header className="site-layout-sub-header-background">
            <div>
              <Menu mode="horizontal">
                <Menu.Item>
                  Home <Link to="/home" />
                </Menu.Item>
                <Menu.Item>
                  Login <Link to="/login" />
                </Menu.Item>
                <Menu.Item>
                  Registration <Link to="/registration" />
                </Menu.Item>
              </Menu>
            </div>
          </Header>
        )}
        <Content>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <LoggedInRoute component={AdminLayout} />
          </Switch>
        </Content>
      </Layout>
    </AppRootContextProvider>
  );
};

export default CommonLayout;
