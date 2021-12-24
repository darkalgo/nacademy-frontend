import React from "react";
import { Modal, Space, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, WarningOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { confirm } = Modal;

const ViewNoticesTable = ({ noticeList, deleteNotice }) => {
  const history = useHistory();

  // functions
  const confirmDelete = (value) => {
    confirm({
      title: "This action can't be undone. Are you sure you want to delete?",
      icon: <WarningOutlined />,
      okButtonProps: { type: "primary" },
      okText: "Yes, Delete",
      okType: "danger",

      onOk() {
        deleteNotice(value);
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "Message Header",
      dataIndex: "header",
      key: "header",
    },
    {
      title: "Sent Date",
      dataIndex: "sent_date",
      key: "sent_date",
    },
    {
      title: "Sent Time",
      dataIndex: "sent_time",
      key: "sent_time",
    },
    {
      title: "Notice Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="large">
          <Tooltip title="View Details">
            <EyeOutlined className="icon-style" onClick={() => history.push(`/admin/view-notice/${record.id}`)} />
          </Tooltip>
          <Tooltip title="Delete Notice">
            <DeleteOutlined className="icon-style" style={{ color: "red" }} onClick={() => confirmDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={noticeList} scroll={{ x: 1000 }} />;
};

export default ViewNoticesTable;
