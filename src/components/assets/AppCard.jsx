import React from "react";
import { Card } from "antd";

import "../../styles/ComponentStyles/AppCard.less";

const AppCard = ({ children, heading }) => {
  return (
    <Card className="card">
      <div className="heading"> {heading} </div>
      {children}
    </Card>
  );
};

export default AppCard;
