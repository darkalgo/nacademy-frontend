import { Button, Card, Col, Row, Typography } from "antd";
import { SendOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import moment from "moment";

const { Title } = Typography;

const UpcomingClassCard = ({ info }) => {
  console.log(info)
  return (
    <Card className="card">
      <Row gutter={[8, 8]}>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Class Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{info.agenda} </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Date:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{moment(info.date).format("LL")}</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Start Time:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{info.start_time}</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            End Time:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{info.end_time}</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Teacher Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{info.name} </Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Subject Name:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>{info.subject}</Title>
        </Col>
        <Col xs={{ span: 8 }}>
          <Title level={5} className="primary-color">
            Class Starts In:
          </Title>
        </Col>
        <Col xs={{ span: 16 }}>
          <Title level={5}>
            {/* <Countdown date={moment(info?.date).add(info?.start_time_min, "minutes")._d}>Your class has started. Please join.</Countdown> */}
          </Title>
        </Col>
        {info.is_open && (
          <Col xs={{ span: 24 }}>
            <Button block type="primary" icon={<SendOutlined />} size="large">
              Join Class
            </Button>
          </Col>
        )}
        {!info.is_open && (
          <Col xs={{ span: 24 }}>
            <Button block danger type="text" icon={<CloseCircleOutlined />} size="large" className="error-btn">
              Cancel Class
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default UpcomingClassCard;
