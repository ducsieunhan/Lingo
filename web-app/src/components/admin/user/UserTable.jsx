// UserTable.js
import React from 'react';
import { Table, Tag, Dropdown, Menu, Button, Space, Switch, Tooltip, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;


const UserTable = ({ users, loading, onUpdate, onDelete, onToggleStatus, setFilters }) => {

  const { meta } = useSelector(state => state.accounts);
  const navigate = useNavigate();

  const onInfo = (record) => {
    console.log(record);
    navigate(`/admin/users/${record.keycloakId}`, { state: { user: record } });
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (text, record, index) => index + 1,
      width: 70,
    },
    {
      title: 'User ID (Keycloak)',
      dataIndex: 'keycloakId',
      key: 'keycloakId',
      ellipsis: true, // Tự động rút gọn nếu quá dài
      render: (id) => (
        // Thêm tính năng copy chuyên nghiệp
        <Text style={{ maxWidth: 150 }} copyable={{ text: id }}>
          {id}
        </Text>
      )
    },
    {
      title: 'Tên tài khoản ',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
      filters: [
        {
          text: 'ADMIN',
          value: 'ADMIN',
        },
        {
          text: 'USER',
          value: 'USER',
        },
      ],
      onFilter: (value, record) => record.roles.some(str => str.includes(value)),
      filterSearch: true,
      render: (roles) => (
        <Space wrap>
          {roles && roles.map(role => {
            let color = 'geekblue';
            if (role === 'ADMIN') color = 'volcano';
            if (role === 'USER') color = 'green';
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enable',
      key: 'enable',
      align: 'center',
      width: 120,
      render: (enabled, record) => (
        <Tooltip title={enabled ? 'Đang kích hoạt (Click để vô hiệu hóa)' : 'Đã vô hiệu hóa (Click để kích hoạt)'}>
          <Switch
            checked={enabled}
            onChange={() => onToggleStatus(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Ngày tạo ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (create) => (
        <Text style={{ maxWidth: 150 }}>
          {create?.split("T")[0] ?? "—"}
        </Text>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      render: (text, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'info',
                icon: <InfoCircleOutlined />,
                label: 'Chi tiết',
                onClick: () => onInfo(record),
              },
              {
                key: 'edit',
                icon: <EditOutlined />,
                label: 'Cập nhật',
                onClick: () => onUpdate(record),
              },
              {
                key: 'delete',
                icon: <DeleteOutlined />,
                danger: true,
                label: 'Xóa',
                onClick: () => onDelete(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    }

  ];

  return (
    <Table
      columns={columns}
      dataSource={users}   // dùng accounts từ state
      loading={loading}
      rowKey="keycloakId"
      scroll={{ x: 'max-content' }}
      pagination={{
        current: (meta?.page ?? 0) + 1,
        pageSize: meta?.pageSize,
        total: meta?.total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      onChange={(pagination) => {
        setFilters({
          pageNo: pagination.current - 1,
          pageSize: pagination.pageSize
        });
      }}
    />

  );
};

export default UserTable;