import React from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Space, Flex } from 'antd';
import { UserAddOutlined, SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const UserFilter = ({ onSearch, onAdd, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const [fromDate, toDate] = values.dateRange || [];
    const search = values.search;

    const from = fromDate ? fromDate.$d.getTime() : "";
    const to = toDate ? toDate.$d.getTime() : "";

    const sortValues = { search, from, to };
    onSearch(sortValues);
  };


  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <Form
      form={form}
      name="user-filter-form"
      onFinish={handleFinish}
      layout="vertical"
    >
      <Row gutter={16} align="bottom">

        <Col xl={6} md={8} sm={12} xs={24}>
          <Form.Item name="search" label="Tìm kiếm">

            <Input
              placeholder="Theo username, email..."
              allowClear
              prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </Form.Item>
        </Col>

        <Col xl={6} md={8} sm={12} xs={24}>
          <Form.Item name="dateRange" label="Ngày tạo">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xl={12} md={8} sm={24} xs={24} style={{ flexGrow: 1 }}>
          <Form.Item label=" "> {/* Label rỗng để căn chỉnh thẳng hàng */}
            <Flex justify="space-between" align="center" gap="middle" wrap="wrap">

              <Space wrap>
                <Button onClick={handleReset} disabled={loading}>
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit" // Đây là cách submit form chuẩn
                  loading={loading}
                  ghost // Dùng 'ghost' cho nút search phụ
                >
                  Tìm kiếm
                </Button>
              </Space>

              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={onAdd}
              >
                Tạo người dùng mới
              </Button>

            </Flex>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;