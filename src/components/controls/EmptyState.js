import React from "react";
import { Empty, Typography } from "antd";

import EmptyStateImage from "../../assets/images/empty-state.svg";

const { Title } = Typography;

const EmptyState = ({ description }) => {
  return <Empty style={{ marginTop: "5em" }} image={EmptyStateImage} description={<Title level={4}>{description}</Title>} />;
};

export default EmptyState;
