import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  CodeSandboxOutlined,
  FontSizeOutlined,
  PlusOutlined,
  TagOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { toTitleCase } from "../utils/Helper";

const { SubMenu } = Menu;

function TopicMenu({ onClick }) {
  const location = useLocation();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
    const firstSplittedString = location.pathname.split("/")[1];
    const replacedString = firstSplittedString.replace("-", " ");
    document.title = `${toTitleCase(replacedString || "dashboard")} - NanoCommerce`;
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Menu mode="inline" selectedKeys={[path.split("/")[1]]} onClick={() => onClick()}>
        <Menu.Item key="" icon={<AppstoreOutlined />}>
          Dashboard <Link to="/" />
        </Menu.Item>
        <Menu.Item key="brands" icon={<VideoCameraOutlined />}>
          Brand <Link to="/brands" />
        </Menu.Item>
        <Menu.Item key="tags" icon={<TagOutlined />}>
          Tags <Link to="/tags" />
        </Menu.Item>
        <Menu.Item key="sizes" icon={<FontSizeOutlined />}>
          Sizes <Link to="/sizes" />
        </Menu.Item>
        <Menu.Item key="categories" icon={<AppstoreAddOutlined />}>
          Categories <Link to="/categories" />
        </Menu.Item>
        <Menu.Item key="sub-categories" icon={<ApartmentOutlined />}>
          Sub Categories <Link to="/sub-categories" />
        </Menu.Item>

        <SubMenu key="products" icon={<CodeSandboxOutlined />} title="Products">
          <Menu.Item key="create-product" icon={<PlusOutlined />}>
            Create Product <Link to="/create-product" />
          </Menu.Item>
          <Menu.Item key="view-products" icon={<UnorderedListOutlined />}>
            View Product <Link to="/view-products" />
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default TopicMenu;
