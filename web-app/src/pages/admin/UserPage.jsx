// UserPage.js
import { Card, Button, Space, Modal, Typography } from 'antd';
import { UserAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/admin/user/UserTable";
import UserFilter from '../../components/admin/user/Filter';
import UserFormModal from '../../components/admin/user/UserFormModal';
import { createNewAccount, deleteAccount, postEnableAccount, retrieveAccounts, updateCurrentAccount } from '../../slice/accounts';
import { Outlet } from 'react-router-dom';
// import { retrieveUsers, deleteUser, updateUserStatus } from "../../../slice/users"; // <-- Bạn cần action mới

const { Title } = Typography;

const UserPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const dispatch = useDispatch();
    const { accounts, pageNo, pageSize, loading, meta } = useSelector(state => state.accounts);
    const [filters, setFilters] = useState({ pageNo, pageSize });


    useEffect(() => {
        dispatch(retrieveAccounts(filters));
    }, [filters, dispatch]);

    // useEffect(() => {
    //     console.log(accounts);
    // }, [accounts]);

    const handleSearch = (values) => {

        values = { pageNo, pageSize, ...values }

        console.log("Dữ liệu filter nhận được:", values);
        setFilters(values);
    };

    const showDeleteConfirm = (userRecord) => {
        modal.confirm({
            title: `Bạn có chắc muốn xóa người dùng "${userRecord.username}"?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xác nhận Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log('Xóa user:', userRecord.keycloakId);
                dispatch(deleteAccount(userRecord.keycloakId));
            },
        });
    };

    const handleToggleStatus = (userRecord) => {
        const newStatus = !userRecord.enable;
        const actionText = newStatus ? 'kích hoạt' : 'vô hiệu hóa';

        modal.confirm({
            title: `Xác nhận ${actionText} người dùng?`,
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc muốn ${actionText} người dùng "${userRecord.username}"?`,
            okText: `Xác nhận`,
            cancelText: 'Hủy',
            async onOk() {
                // console.log('Dispatch action:', userRecord.keycloakId, newStatus);
                dispatch(postEnableAccount({ id: userRecord.keycloakId, enable: newStatus }));
            },
            onCancel() {
                console.log('Hủy toggle');
            },
        });
    };


    // modal 
    const handleCreateUser = () => {
        setCurrentUser(null); // Đặt current user là null
        setIsModalVisible(true); // Mở modal
    };

    // Mở modal ở chế độ "Cập nhật"
    const handleUpdateUser = (userRecord) => {
        setCurrentUser(userRecord); // Đặt user đang được chọn
        setIsModalVisible(true); // Mở modal
    };

    // Đóng modal
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentUser(null); // Reset user đang chọn
    };

    const handleModalSubmit = (values) => {
        console.log("Form data received:", values);
        setIsSubmitting(true);

        if (currentUser) {
            const { roles } = values;
            const { keycloakId } = currentUser;
            console.log("Đang cập nhật user:", { keycloakId, roles });
            dispatch(updateCurrentAccount({ id: keycloakId, roles }));
        } else {
            console.log("Đang tạo user mới:", values);
            dispatch(createNewAccount(values));
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setIsModalVisible(false);
            setCurrentUser(null);
        }, 1000);
    };


    return (
        <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="large">

                <UserFilter
                    onSearch={handleSearch}
                    onAdd={handleCreateUser}
                    loading={loading}
                />

                <UserTable
                    users={accounts}
                    loading={loading}
                    onUpdate={handleUpdateUser}
                    onDelete={showDeleteConfirm}
                    onToggleStatus={handleToggleStatus}
                    setFilters={setFilters}
                />

                <UserFormModal
                    visible={isModalVisible}
                    onSubmit={handleModalSubmit}
                    onCancel={handleModalCancel}
                    initialValues={currentUser}
                    loading={isSubmitting}
                />

            </Space>
            {contextHolder}
        </Card>
    );
};

export default UserPage;