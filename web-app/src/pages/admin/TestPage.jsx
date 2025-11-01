import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { removeTest, retrieveAllTests } from '../../slice/tests';
import TestModal from '../../components/admin/tests/TestModal';

const TestPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const searchInput = useRef(null);
    const dispatch = useDispatch();
    const { tests } = useSelector(state => state.tests)
    useEffect(() => {
        const getAllTests = async (params) => {
            dispatch(retrieveAllTests(params))
        }
        getAllTests("page=0&size=10");
    }, []);
    // console.log("all tests:", tests)
    const handleDeleteTest = (id) => {
        dispatch(removeTest(id));
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => close()}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Id",
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps("id")
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            ...getColumnSearchProps('title'),
            render: (text) => text?.replace(/_/g, ' '),
        },
        {
            title: 'Time limit',
            dataIndex: 'timeLimit',
            key: 'timeLimit',
            ...getColumnSearchProps('timeLimit'),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Number of question',
            dataIndex: 'numOfQuestions',
            key: 'numOfQuestions',
            ...getColumnSearchProps('numOfQuestions'),
        },
        {
            title: 'Attempt',
            dataIndex: 'attempts',
            key: 'attempts',
            ...getColumnSearchProps('attempts'),
        },
        {
            title: "Action",
            key: "operation",
            fixed: 'right',
            width: "25%",
            render: (_, record) => (
                <div className='flex gap-2 items-center justify-center'>
                    <Button danger type="primary" onClick={() => handleDeleteTest(record.id)}>
                        Delete
                    </Button>
                    <Button type="default"
                        className="!bg-blue-500 !text-white hover:!bg-blue-600"
                        onClick={() => {
                            setOpen(true);
                            setType("update");
                            setSelectedRecord(record);
                            console.log("current row", record)
                        }}>
                        Update
                    </Button>
                    <Button type="default"
                        className='!bg-green-500 !text-white hover:!bg-green-600 transition'
                        onClick={() => {
                            setOpen(true);
                            setType("detail")
                            setSelectedRecord(record);
                        }}>
                        Detail
                    </Button>
                </div>
            )
        }

    ];

    return (
        <>
            <Table columns={columns} dataSource={tests} bordered />
            <TestModal type={type} open={open} setOpen={setOpen} record={selectedRecord} />
        </>
    )
};

export default TestPage;
