import React from "react";
import { Table } from "antd";

const AllAvailableTutorTable = ({ info }) => {
  const columns = [
    {
      title: "Tutor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Institution Name",
      dataIndex: "institute_name",
      key: "institute_name",
    },
    {
      title: "Average Rating",
      dataIndex: "ratings",
      key: "ratings",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
    },
  ];

  return <Table columns={columns} dataSource={info} scroll={{ x: 1000 }} />;
};

export default AllAvailableTutorTable;
