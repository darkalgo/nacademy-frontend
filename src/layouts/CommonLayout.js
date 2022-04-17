import React, { useEffect } from "react";
import { Button, Layout } from "antd";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    // counted number of '/' (slashes) in the route
    const slashCount = location.pathname.split("/").filter((x) => x !== "").length;
    let splittedString;
    let replacedString;

    if (slashCount === 1) {
      splittedString = location.pathname.split("/")[1];
    } else {
      splittedString = location.pathname.split("/")[2];
    }
    // splittedString is not undefined
    if (splittedString) {
      replacedString = splittedString.replace("-", " ");
    } else {
      replacedString = splittedString;
    }

    // if splitted string is not undefined then set the main route name in title else set home in title
    document.title = `${toTitleCase(replacedString || "home")} - nAcademy.online`;
  }, [location.pathname]);

  return (
    <AppRootContextProvider>
      <Layout>
        {!sessionStorage.getItem("accessToken") && (
          <Header className="site-layout-sub-header-background">
            <Link to="/login">
              <Button type="text">Login</Button>
            </Link>
            <Link to="/registration">
              <Button type="text">Register</Button>
            </Link>
            {/* <Menu mode="horizontal" selectedKeys={[path.split("/")[1]]}>
                <Menu.Item key="">
                  Home <Link to="/" />
                </Menu.Item>
                <Menu.Item key="login">
                  Login <Link to="/login" />
                </Menu.Item>
                <Menu.Item key="registration">
                  Registration <Link to="/registration" />
                </Menu.Item>
              </Menu> */}
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
        <Footer style={{ textAlign: "center", backgroundColor: "#07294d", color: "#fff" }}>nAcademy ©{new Date().getFullYear()} Created by NanoSoft</Footer>
      </Layout>
    </AppRootContextProvider>
  );
};

export default CommonLayout;
