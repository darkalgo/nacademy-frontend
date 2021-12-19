import React from "react";
import { Table } from "antd";

const TutorListTable = ({ approveList }) => {
  const columns = [
    {
      title: "Tutor Name",
      dataIndex: "name",
      key: "name",
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
    {
      title: "Institution Name",
      dataIndex: "institute_name",
      key: "institute_name",
    },
    {
      title: "Teaching Class",
      dataIndex: "teaching_class",
      key: "teaching_class",
    },
    {
      title: "Average Rating",
      dataIndex: "ratings",
      key: "ratings",
    },
    {
      title: "Total Class Conducted",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Number of Times Paid",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Paid Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return <Table columns={columns} dataSource={approveList} scroll={{ x: 1500 }} />;
};

export default TutorListTable;
