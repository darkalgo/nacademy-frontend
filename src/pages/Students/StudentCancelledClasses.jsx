// import React, { useState } from "react";
// import { Button, Card, Col, Form, Input, Rate, Row, Typography } from "antd";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import AppCard from "../../components/common/AppCard";

// const { Link, Title } = Typography;
// const { TextArea } = Input;

// const StudentOngoingClasses = () => {
//   const { form } = Form.useForm();

//   const [reviewMode, setReviewMode] = useState("");
//   const [textColor, setTextColor] = useState("");

//   const onRatingChange = (value) => {
//     console.log(value);
//     if (value <= 2 && value >= 1) {
//       setReviewMode("Bad");
//       setTextColor("#f44336");
//     } else if (value === 3) {
//       setReviewMode("Average");
//       setTextColor("#ff9800");
//     } else if (value === 4) {
//       setReviewMode("Good");
//       setTextColor("#26a69a");
//     } else if (value === 5) {
//       setReviewMode("Excellent");
//       setTextColor("#00c853");
//     }
//   };

//   const onFinish = (values) => {
//     console.log(values);
//   };

//   return (
//     <>
//       <Row justify="center">
//         <Title level={2}>Ongoing Class</Title>
//       </Row>

//       <Card className="card mb-2">
//         <Row gutter={[8, 8]} justify="center">
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Class Name:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>Biology class 2nd chapter </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Date:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>November 21, 2021 </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Start Time:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>10:00 am </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               End Time:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>11:00 am </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Teacher Name:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>Md. Kamal Ahmed </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Subject Name:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Title level={5}>Biology </Title>
//           </Col>
//           <Col xs={{ span: 8 }}>
//             <Title level={5} className="primary-color">
//               Class Link:
//             </Title>
//           </Col>
//           <Col xs={{ span: 16 }}>
//             <Link
//               copyable
//               href="https://images.indianexpress.com/2018/12/Sunny-759.jpg"
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ fontSize: "1.1em", color: "#1890ff", textDecoration: "underline" }}>
//               https://images.indianexpress.com/2018/12/Sunny-759.jpg
//             </Link>
//           </Col>
//           <Col xs={{ span: 6 }} className="mt-2">
//             <Button block type="primary" icon={<CheckCircleOutlined />} className="bg white-text" size="large">
//               Join Class
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       <AppCard heading="Give Rating">
//         <Form form={form} onFinish={onFinish}>
//           <Row gutter={[16, 16]}>
//             <Col xs={{ span: 24 }}>
//               <Form.Item name="rating">
//                 <Rate onChange={onRatingChange} />
//               </Form.Item>

//               <Title level={5} style={{ color: `${textColor}` }}>
//                 {reviewMode}
//               </Title>
//             </Col>
//             <Col xs={{ span: 24 }}>
//               <Form.Item name="comment" label="Comment" labelCol={{ span: 24 }}>
//                 <TextArea />
//               </Form.Item>
//             </Col>
//             <Col xs={{ span: 24 }}>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit" className="bg white-text">
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </AppCard>
//     </>
//   );
// };

// export default StudentOngoingClasses;

import React, { useEffect, useState } from "react";
import { Input, Table, Row, Typography, Col, Card, Spin, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";
import EmptyState from "../../components/controls/EmptyState";

const { Title } = Typography;
const { Search } = Input;

const StudentCancelledClasses = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [searchedClassList, setSearchedClassList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get("/students/get-cancel-classes", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          const info = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          console.log(info);
          setClassList(info);
          setSearchedClassList(info);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            ErrorHandler(err?.response?.data?.message, history);
          } else {
            Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
          }
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  const searcher = new FuzzySearch(classList, ["agenda", "subject", "tutor_name"], { sort: true });

  const handleOnSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setSearchedClassList([...result]);
    } else {
      setSearchedClassList(classList);
    }
  };

  const handleSearchChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setSearchedClassList([...result]);
    } else {
      setSearchedClassList(classList);
    }
  };

  const columns = [
    {
      title: "Class Name",
      dataIndex: "agenda",
      key: "agenda",
    },
    {
      title: "Subject Name",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Package Type",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Teacher Name",
      dataIndex: "tutor_name",
      key: "tutor_name",
    },
    {
      title: "Rating",
      dataIndex: "tutor_ratings",
      key: "tutor_ratings",
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}> Cancelled Classes</Title>
      </div>

      {classList.length > 0 ? (
        <>
          <Row justify="end" className="mb-1">
            <Col xs={{ span: 24 }} md={{ span: 8 }} >
              <Search placeholder="Search by class name, subjects and teacher" allowClear enterButton onSearch={handleOnSearch} onChange={handleSearchChange} />
            </Col>
          </Row>

          <Card className="card">
            <Table columns={columns} dataSource={searchedClassList} scroll={{ x: 1000 }} />
          </Card>
        </>
      ) : (
        <Row justify="center">
          <EmptyState description="You have not cancelled any class yet" />
        </Row>
      )}
    </Spin>
  );
};

export default StudentCancelledClasses;
