import React from "react";
import { Alert, Row, Typography } from "antd";

const { Title } = Typography;

const TutorNotices = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Notices</Title>
      </div>
      <Alert
        message={
          <div>
            <Row justify="space-between">
              <Title level={4}>This is your first warning</Title>
              <span>21 November, 2021</span>
            </Row>
          </div>
        }
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
    </div>
  );
};

export default TutorNotices;
