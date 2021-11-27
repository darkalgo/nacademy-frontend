import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, Switch, Route, useLocation } from "react-router-dom";

import { AppRootContextProvider } from "../contexts/AppRootContext";

import AdminLayout from "./AdminLayout";
import LoggedInRoute from "../routes/ProtectedRoute/LoggedInRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import { toTitleCase } from "../utils/Helper";

const { Content, Footer, Header } = Layout;

const CommonLayout = () => {
  const location = useLocation();

  const [path, setPath] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    setPath(location.pathname);
    const firstSplittedString = location.pathname.split("/")[1];
    const replacedString = firstSplittedString.replace("-", " ");
    document.title = `${toTitleCase(replacedString || "home")} - nAcademy`;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AppRootContextProvider>
      <Layout>
        {!sessionStorage.getItem("accessToken") && (
          <Header className="site-layout-sub-header-background">
            <div>
              <Menu mode="horizontal" selectedKeys={[path.split("/")[1]]}>
                <Menu.Item key="">
                  Home <Link to="/" />
                </Menu.Item>
                <Menu.Item key="login">
                  Login <Link to="/login" />
                </Menu.Item>
                <Menu.Item key="registration">
                  Registration <Link to="/registration" />
                </Menu.Item>
              </Menu>
            </div>
          </Header>
        )}
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <LoggedInRoute component={AdminLayout} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>nAcademy ©{new Date().getFullYear()} Created by NanoSoft</Footer>
      </Layout>
    </AppRootContextProvider>
  );
};

export default CommonLayout;
