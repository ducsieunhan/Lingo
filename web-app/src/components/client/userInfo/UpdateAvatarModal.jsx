import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, Modal, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSingleFile } from "../../../slice/files";
import { updateAvatarAccount } from "../../../slice/accounts";
import { toast } from "react-toastify";

const UpdateAvatarModal = ({ isModalVisible, handleOk, handleCancel, isUpdating, url = "https://lipsum.app/id/24/1600x900", userId }) => {
  const [fileList, setFileList] = useState([]);
  // const [uploading, setUploading] = useState(false);

  const { loading } = useSelector((state) => state.file);
  const dispatch = useDispatch();


  const props = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: file => {
      setFileList([file]); // luôn chỉ giữ 1 file
      return false; // chặn auto-upload
    },
    fileList,
  };


  const handleUpload = () => {
    if (!fileList.length) return;

    console.log(fileList[0]);
    dispatch(saveSingleFile({
      file: fileList[0],   // dùng originFileObj
      testTitle: "avatar",
      fileCategory: "AVATAR"
    }))
      .unwrap()
      .then(async (response) => {

        const userData = { id: userId, avatar: response.mediaUrl }
        await dispatch(updateAvatarAccount(userData));
        setFileList([]);
      })
      .catch(err => {
        message.error("Upload thất bại");
        console.error(err);
      });
  };



  return (
    <Modal
      title="Cập nhật ảnh đại diện"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={loading}
        >
          {loading ? 'Đang cập nhật' : 'Cập nhật'}
        </Button>,
      ]}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="group relative inline-block h-32 w-32 rounded-full bg-white p-1 shadow-lg">
          <Image
            src={url}
            preview={true}
            wrapperClassName="!h-full !w-full"
            className="!h-full !w-full !rounded-full object-cover"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <div className="mt-4 ">
          <Upload {...props} className="flex flex-col !justify-center !items-center"
            accept={".png, .webp, .jpg, .jpeg"}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateAvatarModal;
