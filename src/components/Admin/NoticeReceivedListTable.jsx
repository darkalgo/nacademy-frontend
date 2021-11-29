import React from "react";
import { Table, Tooltip } from "antd";
import { FcAnswers } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const NoticeReceivedListTable = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "age",
      key: "age",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />;
};

export default NoticeReceivedListTable;
