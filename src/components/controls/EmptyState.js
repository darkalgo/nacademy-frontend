import React from "react";
import { Empty } from "antd";

import EmptyStateImage from "../../assets/images/empty-state.svg";

function EmptyState({ description }) {
  return <Empty style={{ marginTop: "5em" }} image={EmptyStateImage} description={description} />;
}

export default EmptyState;
