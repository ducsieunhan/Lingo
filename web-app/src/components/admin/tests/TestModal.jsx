import { Button, Modal, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUpdatingResourceMedia } from '../../../slice/files';
import { modifyTest } from '../../../slice/tests';
import { toast } from 'react-toastify';
const { Option } = Select;

const TestModal = ({ type, open, setOpen, record }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { fileUpdating } = useSelector((state) => state.file);

    useEffect(() => {
        if (record && open) {
            form.setFieldsValue({
                title: record.title,
                type: record.type,
                timeLimit: record.timeLimit,
                numOfQuestions: record.numOfQuestions,
                maxScore: record.maxScore,
                mediaUrl: record?.mediaUrl,
            });
        }
    }, [record, open, form]);

    useEffect(() => {
        if (fileUpdating?.mediaUrl) {
            form.setFieldValue('mediaUrl', fileUpdating?.mediaUrl);
        }
    }, [fileUpdating, form]);

    const handleSave = (values) => {
        const updatingTest = {
            title: values.title,
            maxScore: values.maxScore,
            timeLimit: values.timeLimit,
            type: values.type,
            mediaUrl: fileUpdating?.mediaUrl,
            numOfQuestions: values.numOfQuestions
        };

        dispatch(modifyTest({ id: record.id, test: updatingTest }))
            .unwrap()
            .then(() => {
                form.setFieldsValue(updatingTest);
                toast.success('Lưu bài thi thành công!', { autoClose: 2000 });
                setOpen(false);
            })
            .catch(() => {
                toast.error('Lưu bài thi thất bại!', { autoClose: 2000 });
            });
    };


    const handleUpdateAudio = (options, record) => {
        const { file, onSuccess, onError } = options;
        dispatch(
            saveUpdatingResourceMedia({
                resourceId: Number(record.resourceContentId),
                testTitle: record.title,
                fileCategory: 'LISTENING_AUDIO',
                currentResourceContent: record?.mediaUrl,
                file: file,
                updatedFileName: record.mediaUrl.split('/').pop(),
            })
        )
            .unwrap()
            .then(() => onSuccess?.('ok'))
            .catch((err) => onError?.(err));
    };

    return (
        <Modal
            title={type === 'edit' ? 'Cập nhật bài thi' : 'Thêm bài thi'}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSave}>
                <Form.Item
                    label="Tên bài thi"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tên bài thi' }]}
                >
                    <Input placeholder="Nhập tên bài thi" />
                </Form.Item>

                <div className="grid grid-cols-4">
                    <Form.Item
                        label="Loại bài thi"
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng chọn loại bài thi' }]}
                        className="col-span-2 !mr-4"
                    >
                        <Select placeholder="Chọn loại bài thi">
                            <Option value="TOEIC">TOEIC</Option>
                            <Option value="IELTS">IELTS</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Thời gian làm bài (phút)"
                        name="timeLimit"
                        rules={[{ required: true }]}
                        className="col-span-2 !ml-4"
                    >
                        <InputNumber min={1} className="!w-full" placeholder="Nhập số phút" />
                    </Form.Item>

                    <Form.Item
                        label="Số câu hỏi"
                        name="numOfQuestions"
                        rules={[{ required: true }]}
                        className="col-span-2 !mr-4"
                    >
                        <InputNumber min={1} className="!w-full" placeholder="Nhập số câu" />
                    </Form.Item>

                    <Form.Item
                        label="Điểm tối đa"
                        name="maxScore"
                        rules={[{ required: true }]}
                        className="col-span-2 !ml-4"
                    >
                        <InputNumber min={1} className="!w-full" placeholder="Nhập điểm tối đa" />
                    </Form.Item>
                </div>

                <Form.Item label="File Audio" name="mediaUrl" initialValue={record?.mediaUrl}>
                    <Upload customRequest={(options) => handleUpdateAudio(options, record)}>
                        <Button icon={<UploadOutlined />}>Chọn file</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TestModal;
