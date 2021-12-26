import React from "react";
import { Table } from "antd";

const OnlineTutorsTable = ({ tutorInfo }) => {
  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Institution Name",
      dataIndex: "institute_name",
      key: "institute_name",
    },
    {
      title: "Teaching Classes",
      dataIndex: "teaching_class",
      key: "teaching_class",
    },
    {
      title: "Subject",
      dataIndex: "good_at_subjects",
      key: "good_at_subjects",
    },
    {
      title: "Rating",
      dataIndex: "ratings",
      key: "ratings",
    },
  ];

  return <Table columns={columns} dataSource={tutorInfo} scroll={{ x: 1500 }} />;
};

export default OnlineTutorsTable;
