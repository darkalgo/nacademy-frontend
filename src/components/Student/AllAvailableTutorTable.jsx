import { Table, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const AllAvailableTutorTable = ({ info }) => {
  const history = useHistory();

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
      render: (text, record) => (
        <Tooltip title="View Details">
          <EyeOutlined className="icon-style" onClick={() => history.push(`/student/all-tutors/${record.id}`)} />
        </Tooltip>
      ),
    },
  ];

  return <Table columns={columns} dataSource={info} scroll={{ x: 1000 }} />;
};

export default AllAvailableTutorTable;
