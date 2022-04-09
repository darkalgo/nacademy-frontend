import { Button, Card, Col, Modal, Row, Typography } from "antd";
import { SendOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import moment from "moment";
import {useHistory} from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../controls/ErrorHandler";
import Notification from "../controls/Notification";

const { Title } = Typography;

const UpcomingClassCard = ({ info }) => {
  const history = useHistory();


  const cancelClass = (value) => {
    console.log(value)
    Modal.confirm({
      title: "Selected class will be canceled!",
      icon: <ExclamationCircleOutlined />,
      content:
        "When clicked the Yes button, the class will be canceled. Are you sure you want to make change?",
      okText: "Yes, Cancel",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await BaseAPI.post(
            "students/cancel-class",
            { id: value },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
              },
            }
          );
          Notification("Success", "Class has been removed.", "success");
        } catch (err) {
          if (err?.response?.data?.message) {
            ErrorHandler(err?.response?.data?.message, history);
          } else {
            Notification(
              "Something went wrong",
              "Please check your internet connection and try again or communicate with the admin",
              "error"
            );
          }
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  


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
          {moment(moment(info.date).add(info.start_time_min, "minutes")._d).isSameOrAfter(moment()._d) === true ? 
            <Countdown date={moment(info.date).add(info.start_time_min, "minutes")._d}>Your class has started. Please join.</Countdown> : 
            'Your class has started. Please join.'}
          </Title>
        </Col>
        {info.is_open && (
          <Col xs={{ span: 24 }}>
            <Button block type="primary" icon={<SendOutlined />} size="large" to={info.class_link}>
              Join Class
            </Button>
          </Col>
        )}
        {!info.is_open && (
          <Col xs={{ span: 24 }}>
            <Button block danger type="text" icon={<CloseCircleOutlined />} size="large" className="error-btn" onClick={() => cancelClass(info.id)}>
              Cancel Class
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default UpcomingClassCard;
