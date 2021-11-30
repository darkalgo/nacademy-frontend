import React from "react";
import { Button, Calendar, Card, Col, Row, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;

const StudentBookTutors = () => {
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  const onCalenderChange = (value) => {
    console.log(moment(value).format("LL"));
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>Book A Tutor</Title>
      </div>

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Title level={5}>Please select a date to see available teachers </Title>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Calendar fullscreen={false} disabledDate={disabledDate} onPanelChange={onPanelChange} onChange={onCalenderChange} />
        </Col>
      </Row>

      <div className="center mb-2 mt-2">
        <Title level={2}>Available Teachers</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card className="card">
            <Row gutter={[8, 8]}>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Kamal Hossain</Title>
              </Col>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Varsity Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Daffodil International University</Title>
              </Col>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Department Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Software Engineering</Title>
              </Col>
              <Col xs={{ span: 12, offset: 8 }}>
                <Button className="bg white-text mt-1" icon={<ClockCircleOutlined />}>
                  View Available Slots
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentBookTutors;
