import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const series = [44, 55, 13];
  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Good", "Average", "Bad"],
    legend: {
      position: "bottom",
    },
  };

  return <Chart options={options} series={series} type="pie" width={380} />;
};

export default PieChart;
