import { Button, Card, Col, Row, Typography } from "antd";
import { CalendarFilled } from "@ant-design/icons";

const { Title } = Typography;

const UpcomingClassCard = () => {
  return (
    <Card className="card">
      <Row gutter={[8, 8]}>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Class Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>Biology class 2nd chapter </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Date:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>November 21, 2021 </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Start Time:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>10:00 am </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            End Time:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>11:00 am </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Student Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>Md. Kamal Ahmed </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Subject Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>Biology </Title>
        </Col>
        <Col xs={{ span: 24 }}>
          <Button block type="primary" icon={<CalendarFilled />} className="bg white-text">
            Reschedule Class Time
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UpcomingClassCard;
