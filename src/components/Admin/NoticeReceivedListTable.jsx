import React from "react";
import { Table } from "antd";

const NoticeReceivedListTable = ({ notifiedUser }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return <Table columns={columns} dataSource={notifiedUser} scroll={{ x: 1000 }} />;
};

export default NoticeReceivedListTable;
