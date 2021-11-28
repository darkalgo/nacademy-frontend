import React from "react";
import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const ApproveTutorCard = () => {
  const history = useHistory();

  return (
    <Card className="card">
      <Row gutter={[8, 8]}>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Name:
          </Title>
        </Col>
        <Col xs={{ span: 14 }}>
          <Title level={5}>Shahed Khandakar</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Phone Number:
          </Title>
        </Col>
        <Col xs={{ span: 14 }}>
          <Title level={5}>0147578556</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Email:
          </Title>
        </Col>
        <Col xs={{ span: 14 }}>
          <Title level={5}>Shahedkhandakar@gmail.com</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Institution Name:
          </Title>
        </Col>
        <Col xs={{ span: 14 }}>
          <Title level={5}>Daffodil International University</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Account Status:
          </Title>
        </Col>
        <Col xs={{ span: 14 }}>
          <Title level={5}>
            <Tag color="orange">Pending</Tag>
          </Title>
        </Col>
        <Col xs={{ span: 24 }} className="mt-1">
          <Button block className="bg white-text" onClick={() => history.push("/admin/approve-tutor/2")}>
            View Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ApproveTutorCard;
