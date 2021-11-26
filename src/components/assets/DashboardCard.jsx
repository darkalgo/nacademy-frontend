import React from "react";
import { Card, Typography } from "antd";
import numeral from "numeral";

import "../../styles/ComponentStyles/AppCard.less";

const { Title } = Typography;

const DashboardCard = ({ title, count, color }) => {
  return (
    <Card className="card">
      <div className="dashboard-card">
        <Title level={5}>{title}</Title>
        <span className="dashboard-number" style={{ color: `${color}` }}>
          {numeral(count).format("0,0")}
        </span>
      </div>
    </Card>
  );
};

export default DashboardCard;
