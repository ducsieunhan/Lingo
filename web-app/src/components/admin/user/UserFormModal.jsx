
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Button } from 'antd';

const { Option } = Select;

const UserFormModal = ({ visible, onSubmit, onCancel, initialValues, loading }) => {
  const [form] = Form.useForm();

  const isUpdateMode = !!initialValues;

  useEffect(() => {
    if (visible) {
      if (isUpdateMode) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({ enabled: true });
      }
    }
  }, [visible, initialValues, form, isUpdateMode]);
  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onSubmit(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={isUpdateMode ? 'Cập nhật người dùng' : 'Tạo người dùng mới'}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {isUpdateMode ? 'Cập nhật' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="user_form">
        <Form.Item
          name="username"
          label="Tên tài khoản"
          rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
        >
          <Input disabled={isUpdateMode} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
        >
          <Input disabled={isUpdateMode} />
        </Form.Item>

        {!isUpdateMode && <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: !isUpdateMode, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>}

        <Form.Item
          name="roles"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn ít nhất một vai trò!' }]}
        >
          <Select mode="multiple" placeholder="Chọn vai trò">
            <Option value="ADMIN">ADMIN</Option>
            <Option value="USER">USER</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="enabled"
          label="Trạng thái"
          valuePropName="checked"
        >
          <Switch checkedChildren="Kích hoạt" unCheckedChildren="Vô hiệu hóa" />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default UserFormModal;