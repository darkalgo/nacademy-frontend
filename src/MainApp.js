import React from "react";
import { Layout } from "antd";
import SideBar from "./container/SideBar";
import { Switch, Route, Redirect } from 'react-router-dom';
import Bal from "./pages/Bal";

const { Header, Content, Footer, } = Layout;

function MainApp() {
  return (
    <Layout>
      <SideBar/>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
            <Switch>
                <Route exact path="/reset-password" component={Bal} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default MainApp;
