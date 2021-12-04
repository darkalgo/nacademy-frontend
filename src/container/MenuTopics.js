import React, { useState, useEffect } from "react";
import { Menu } from "antd";

import { Link, useLocation } from "react-router-dom";
import { ADMIN_MENUS, STUDENT_MENUS, TUTOR_MENUS } from "./MenuItems";

const TopicMenu = ({ onClick }) => {
  const location = useLocation();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Menu mode="inline" selectedKeys={[path.split("/")[2]]} onClick={() => onClick()}>
        {STUDENT_MENUS.map((el) => (
          <Menu.Item key={el.key} icon={el.icon}>
            {el.name} <Link to={el.to} />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default TopicMenu;
