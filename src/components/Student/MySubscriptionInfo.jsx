import { Descriptions } from "antd";
import React from "react";

const MySubscriptionInfo = () => {
  return (
    <div>
      <Descriptions title="Subscription Information" bordered>
        <Descriptions.Item label="Subscription Type">Monthly Subscription</Descriptions.Item>
        <Descriptions.Item label="Started Time">21st November, 2021 2:00pm</Descriptions.Item>
        <Descriptions.Item label="End Time">21st December, 2020 2:00pm</Descriptions.Item>
        <Descriptions.Item label="Subscription Validity Ends In">20 Days 40 Minutes</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Individual Package" bordered className="mt-2">
        <Descriptions.Item label="Number of Alloted Classes">20</Descriptions.Item>
        <Descriptions.Item label="Number of Remaining Classes">15</Descriptions.Item>
        <Descriptions.Item label="Number of Cancelled Classes">0</Descriptions.Item>
        <Descriptions.Item label="Number of Rescheduled Classes">0</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Monthly Package" bordered className="mt-2">
        <Descriptions.Item label="Number of Rescheduled Classes">0</Descriptions.Item>
        <Descriptions.Item label="Tutor Name">Kamal Hasan</Descriptions.Item>
        <Descriptions.Item label="Phone Number">015875454565</Descriptions.Item>
        <Descriptions.Item label="Email">kamal@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Institution Name">Daffodil International University</Descriptions.Item>
        <Descriptions.Item label="Department Name">Software Engineering</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default MySubscriptionInfo;
