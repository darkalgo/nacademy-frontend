import React from 'react'
import { Button, Col, Row, Typography } from 'antd'

const {Title} = Typography;

function Bal() {
    return (
        <Row gutter={[16, 16]}>
            <Col>
            <Title level={3}>Welcome to customized theme</Title>
            <Button type="primary">Hello there</Button>
            </Col>
        </Row>
    )
}

export default Bal
