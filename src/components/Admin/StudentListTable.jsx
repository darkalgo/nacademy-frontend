import React from "react";
import { Table, Tooltip } from "antd";
import { FcAnswers } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const StudentListTable = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Student Name",
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
    {
      title: "DoB",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Institution Name",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Class Name",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Group",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Account Creation Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Currently Subscribed Package Name",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Tooltip title="Package Details">
          <FcAnswers className="icon-style" onClick={() => history.push("/admin/student-package/3")} />
        </Tooltip>
      ),
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
  return <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} />;
};

export default StudentListTable;
