import React from "react";
import { Table, Tooltip } from "antd";
import { FcAnswers } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const StudentListTable = ({ info }) => {
  const history = useHistory();

  const columns = [
    {
      title: "Student Name",
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
      title: "DoB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Institution Name",
      dataIndex: "institute_name",
      key: "institute_name",
    },
    {
      title: "Class Name",
      dataIndex: "class_name",
      key: "class_name",
    },
    {
      title: "Group",
      dataIndex: "group_name",
      key: "group_name",
    },
    {
      title: "Account Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
          <FcAnswers className="icon-style" onClick={() => history.push(`/admin/student-package/${record.id}`)} />
        </Tooltip>
      ),
    },
  ];

  return <Table columns={columns} dataSource={info} scroll={{ x: 1500 }} />;
};

export default StudentListTable;
