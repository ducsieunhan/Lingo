import { DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";

const FormUpdate = ({ form, isUpdatingForm, onSubmit, initialValues }) => {

  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        dob: initialValues.dob ? dayjs(initialValues.dob) : undefined
      };
      form.setFieldsValue(formattedValues);
    }
  }, [initialValues, form]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        disabled={!isUpdatingForm}
        onFinish={onSubmit}
        name="profileForm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Form.Item
            label="Nhập tên của bạn"
            name="firstName"
            className="mb-0"
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Nhập họ của bạn"
            name="lastName"
            className="mb-0"
          >
            <Input placeholder="Nhập họ của bạn" />
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            className="mb-0"
          >
            <Input disabled placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            className="mb-0"
            rules={[
              { required: false, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{9,11}$/, message: "Số điện thoại không hợp lệ" }
            ]}
          >
            <Input type="tel" placeholder="+84 123 456 789" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className="mb-0"
          >
            <Input disabled type="email" placeholder="your.email@example.com" />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dob"
            className="mb-0"
            rules={[{ required: false, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker placeholder="Chọn ngày sinh" />
          </Form.Item>

        </div>

        <Form.Item
          label="Tiểu sử"
          name="bio"
          className="mb-0"
          rules={[{ required: false, message: "Vui lòng nhập tiểu sử" }]}
        >
          <TextArea rows={4} placeholder="Kể về bản thân bạn..." />
        </Form.Item>
      </Form>
    </>
  )
}
export default FormUpdate