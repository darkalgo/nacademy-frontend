import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from "antd";
import { WalletFilled } from "@ant-design/icons";

import { numberValidation } from "../../utils/Validations";
import { paymentOptionList } from "../../utils/Constants";

const { Title } = Typography;
const { Option } = Select;

const AdminPayTutor = () => {
  const [form] = Form.useForm();

  const [paymentOption, setPaymentOption] = useState("Cash");
  const [showTransactionFields, setShowTransactionFields] = useState(false);

  const onPaymentOptionChange = (info) => {
    setPaymentOption(info.target.value);
    info.target.value === "Cash" ? setShowTransactionFields(false) : setShowTransactionFields(true);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>Pay to Tutor</Title>
      </div>

      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="tutor" label="Tutor Name" labelCol={{ span: 24 }}>
              <Select showSearch optionFilterProp="children" allowClear showArrow placeholder="Select tutor to pay">
                <Option>All</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="pending_amount" label="Pending Amount" labelCol={{ span: 24 }}>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item
              name="paid_amount"
              label="Paid Amount"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Paid amount is required" },
                { pattern: numberValidation, message: "Amount must be number and greater than zero" },
              ]}>
              <Input prefix="৳" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="payment_date" label="Payment Date" labelCol={{ span: 24 }} rules={[{ required: true, message: "Payment date is required" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item label="Payment Method" labelCol={{ span: 24 }}>
              <Radio.Group options={paymentOptionList} onChange={(e) => onPaymentOptionChange(e)} value={paymentOption} optionType="button" buttonStyle="solid" />
            </Form.Item>
          </Col>
        </Row>
        {showTransactionFields && (
          <>
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="account_number" label="Phone/Bank Account Number" labelCol={{ span: 24 }} rules={[{ required: true, message: "Account number is required" }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="transaction_id" label="Transaction ID" labelCol={{ span: 24 }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Button block className="bg white-text" htmlType="submit" icon={<WalletFilled />}>
              Pay
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminPayTutor;
