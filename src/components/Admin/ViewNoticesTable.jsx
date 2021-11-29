import React from "react";
import { Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const ViewNoticesTable = () => {
  const columns = [
    {
      title: "Message Header",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sent From",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sent Date",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sent Time",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Space size="large">
          <Tooltip title="View Details">
            <EyeOutlined className="icon-style" />
          </Tooltip>
          <Tooltip title="Delete Notice">
            <DeleteOutlined className="icon-style" style={{ color: "red" }} />
          </Tooltip>
        </Space>
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

export default ViewNoticesTable;
