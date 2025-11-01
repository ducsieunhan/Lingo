import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Avatar, DatePicker, Modal, Upload, message } from 'antd';
import { CameraFilled, UploadOutlined, UserOutlined } from '@ant-design/icons';
import UpdateAvatarModal from '../../components/client/userInfo/UpdateAvatarModal';
import FormUpdate from '../../components/client/userInfo/FormUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveAccount, updateCurrentAccount } from '../../slice/accounts';

const { TextArea } = Input;

const Profile = () => {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingForm, setIsUpdatingForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useSelector((state) => state.authentication);
  const { loading } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const userId = user?.sub;


  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const res = await dispatch(retrieveAccount(userId)).unwrap();

        setCurrentUser(res);
      };
    }
    fetchUser();
  }, [userId, dispatch])


  const handleToggleStatus = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleFormSubmit = async (values) => {
    console.log("Form data received:", values);
    if (!isUpdatingForm) return;

    if (user) {
      try {
        const validatedValues = await form.validateFields();
        const payload = { id: userId, ...validatedValues };

        await dispatch(updateCurrentAccount(payload)).unwrap();
        setIsUpdatingForm(false);
      } catch (err) {
        console.log("Validate hoặc update thất bại:", err);
      }
    } else {
      console.log("Đang tạo user mới:", values);
    }
  };


  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Card
        className="overflow-hidden rounded-xl shadow-sm"
        bodyStyle={{ padding: 0 }}
      >
        <div className="h-32 w-full bg-gradient-to-r from-blue-400 to-purple-400"></div>

        <div className="relative px-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="-mt-10 h-20 w-20 rounded-full bg-white p-1 shadow-lg relative inline-block group ">
                <Avatar
                  src={user?.avatar}
                  className="!h-full !w-full !rounded-full "
                  style={{
                    background: "linear-gradient(to bottom right, #60A5FA, #8B5CF6",
                  }}
                  icon={!user?.avatar && <UserOutlined />}
                ></Avatar>
                <div
                  className="absolute inset-1 z-10 rounded-full bg-black/30 opacity-0 transition group-hover:opacity-100"
                ></div>
                <CameraFilled onClick={handleToggleStatus}
                  className="!absolute !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2 opacity-0 z-[11]
                  group-hover:opacity-100 transition !text-gray-100 text-2xl cursor-pointer "
                />
              </div>

              <div className="pt-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentUser?.username}
                </h2>
                <p className="mt-1 text-gray-500">{currentUser?.email}</p>
              </div>
            </div>

            <div className='flex !space-x-1'>
              {
                isUpdatingForm &&
                <>
                  <Button
                    htmlType="submit"
                    form="profileForm"
                    type="primary"
                    className="!mt-4 !rounded-lg !bg-blue-500 !font-medium transition-all duration-500 ease-in-out hover:!bg-blue-600 hover:scale-105"
                  >
                    Cập nhật
                  </Button>

                  <Button
                    onClick={() => setIsUpdatingForm(false)}
                    type="primary"
                    className="!mt-4 !rounded-lg !bg-blue-500 !font-medium transition-all duration-500 ease-in-out hover:!bg-blue-600 hover:scale-105"
                  >
                    Hủy bỏ
                  </Button>
                </>
              }

              {!isUpdatingForm &&
                <Button
                  onClick={() => setIsUpdatingForm(true)}
                  type="primary"
                  className="!mt-4 !rounded-lg !bg-blue-500 !font-medium transition-all duration-500 ease-in-out hover:!bg-blue-600 hover:scale-105"
                >
                  Chỉnh sửa
                </Button>}

            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <FormUpdate
            form={form}
            isUpdatingForm={isUpdatingForm}
            onSubmit={handleFormSubmit}
            initialValues={currentUser}
          />
        </div>

        <UpdateAvatarModal
          isModalVisible={isModalVisible}
          isUpdating={isUpdating}
          handleOk={handleOk}
          handleCancel={handleCancel}
          userId={userId}
          url={user?.avatar}
        />

        {contextHolder}
      </Card>
    </main>
  );
};

export default Profile;