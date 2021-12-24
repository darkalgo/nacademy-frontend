import React, { useEffect, useContext } from "react";
import { Col, Row } from "antd";
import openSocket from 'socket.io-client';

import AppCard from "../../components/common/AppCard";
import DashboardCard from "../../components/common/DashboardCard";
import LineChart from "../../components/Tutor/charts/LineChart";
import PieChart from "../../components/Tutor/charts/PieChart";
import TodayClassListTable from "../../components/Tutor/TodayClassListTable";
import { AppRootContext } from '../../contexts/AppRootContext';

const TutorDashboard = () => {

  const { socket, setSocket } = useContext(AppRootContext);
  useEffect(() => {
    if (!socket) {
      const socket = openSocket(process.env.REACT_APP_SocketUrl)
      socket.on('connect', msg => {
        console.log("connection ok");
        if (sessionStorage.getItem("role") === 'tutor') {
          socket.emit('register', { user_id: `${sessionStorage.getItem("id")}`, socket_id: `${socket.id}`});
        }
        setSocket(socket);
      })
    }
  }, [])

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Students" count="40" color="#1CACF4" />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Class Taken" count="45" color="#EB8A24" />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Earned" count="3500" color="#048C04" />
        </Col>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Today's Class List">
            <TodayClassListTable />
          </AppCard>
        </Col>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Transaction History">
            <TodayClassListTable />
          </AppCard>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <AppCard heading="Rating Ratio">
            <PieChart />
          </AppCard>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <AppCard heading="Number of Class Taken">
            <LineChart />
          </AppCard>
        </Col>
      </Row>
    </div>
  );
};

export default TutorDashboard;
