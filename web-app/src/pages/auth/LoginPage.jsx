import { AppleFilled, FacebookFilled, FacebookOutlined, GoogleOutlined, LockFilled, LockOutlined, LockTwoTone, MailFilled, MailOutlined, MailTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd"
import '../../styles/animation.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slice/authentication";
import { toast } from "react-toastify";

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  // const { login, loading } = useContext(AuthContext);

  const onFinish = async values => {
    console.log('Success:', values);
    const { username, password } = values;
    try {
      await dispatch(login({ username, password })).unwrap();
      navigate("/");
      toast.info("Đăng nhập thành công");
    } catch (err) {
      return false;
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Spin size="large" spinning={loading}>
        <Form name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          hideRequiredMark
          layout="vertical">


          <Form.Item
            label="Email hoặc Tên đăng nhập"
            name="username" className="!font-semibold !text-lg"
            rules={[
              { required: true, message: "Vui lòng nhập email hoặc tên đăng nhập" },
            ]}
          >
            <Input
              prefix={<MailTwoTone twoToneColor="#2563eb" className="!mr-1" />}
              placeholder="Nhập email của bạn" size="large"
              className="!pl-4 !py-3 lift-on-focus"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password" className="!font-semibold !text-lg"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}

          >
            <Input.Password
              prefix={<LockTwoTone twoToneColor="#2563eb" />}
              placeholder="Nhập mật khẩu" size="large"
              className="!pl-4 !py-3 lift-on-focus"
            />
          </Form.Item>

          <div class="flex items-center justify-between ">
            <Form.Item name="remember" valuePropName="checked" label={null} noStyle>
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800 transition-colors" id="forgot-password">Quên mật khẩu?</a>
          </div>

          <Form.Item label={null} className="!mt-6">
            <Button type="primary" htmlType="submit" block className="lift-on-hover !text-lg !h-12 !rounded-2xl !bg-blue-600 hover:!bg-blue-700">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}
export default LoginPage