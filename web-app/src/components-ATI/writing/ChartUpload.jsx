import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";

const { Dragger } = Upload;

// Component con nội bộ, không cần export
const PreviewItem = ({ file, onRemove, disabled }) => {
  return (
    <div
      key={file.uid}
      onClick={(e) => e.stopPropagation()}
      className="relative group w-full h-96 rounded-lg overflow-hidden shadow-md bg-gray-100 cursor-default"
    >
      <img
        src={file.url}
        alt={file.name}
        className="w-full h-full object-contain"
      />
      {!disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(file);
          }}
          aria-label="Remove"
          className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-all hidden group-hover:block cursor-pointer"
        >
          {/* SVG Icon Xóa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

// Component chính
const ChartUpload = ({
  handleFileSelect,
  handleFileDrop,
  maxSizeMB = 20,
  initialImageUrl,
  disabled = false,
}) => {
  const getInitialFile = () => {
    if (initialImageUrl) {
      return [
        {
          uid: "locked-image",
          name: "Đề bài",
          status: "done",
          url: initialImageUrl,
        },
      ];
    }
    return [];
  };

  const [fileList, setFileList] = useState(getInitialFile());

  useEffect(() => {
    if (initialImageUrl) {
      setFileList([
        {
          uid: "locked-image",
          name: "Đề bài",
          status: "done",
          url: initialImageUrl,
        },
      ]);
    } else if (!disabled) {
      // setFileList([]); // Cân nhắc reset file list nếu không disable
    }
  }, [initialImageUrl, disabled]);

  const beforeUpload = (file) => {
    if (disabled) return Upload.LIST_IGNORE;
    if (!file.type.match("image.*")) {
      message.error("Chỉ cho phép file hình (jpg/png/webp).");
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 >= maxSizeMB) {
      message.error(`Ảnh phải nhỏ hơn ${maxSizeMB} MB.`);
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewFile = {
        uid: `${Date.now()}_${Math.random()}`,
        name: file.name,
        status: "done",
        url: e.target.result,
        originFileObj: file,
      };
      // CHỈ CHO PHÉP 1 FILE (thay thế thay vì thêm)
      setFileList([previewFile]);
      if (typeof handleFileSelect === "function") {
        handleFileSelect({ target: { files: [file] } });
      }
    };
    reader.readAsDataURL(file);
    return Upload.LIST_IGNORE;
  };

  const handleChange = ({ fileList: newList }) => {
    const normalized = newList
      .filter((f) => f && (f.uid || f.url || f.originFileObj))
      .map((f) =>
        f.url
          ? f
          : {
            uid: f.uid || `${Date.now()}_${Math.random()}`,
            name: f.name,
            status: f.status || "done",
            url: f.url || f.thumbUrl || undefined,
            originFileObj: f.originFileObj,
          }
      );
    setFileList(normalized);
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } });
    }
  };

  const handleRemove = (file) => {
    if (disabled) return;
    const newList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newList);
    if (newList.length === 0 && typeof handleFileSelect === "function") {
      handleFileSelect({ target: { files: [] } });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        Tải Lên Ảnh Đề Bài
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        {disabled
          ? "Đề bài đã được cung cấp."
          : "Nếu đề bài của bạn là hình ảnh (biểu đồ, bản đồ...), hãy tải nó lên đây."}
      </p>
      <Dragger
        accept=".jpg,.jpeg,.png,.webp"
        multiple={false} // <- Sửa thành false để logic 1 file hoạt động
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={false}
        onDrop={(e) => {
          if (typeof handleFileDrop === "function") handleFileDrop(e);
        }}
        disabled={disabled}
        className={`transition-all ${disabled ? "cursor-not-allowed" : ""}`}
        style={
          fileList.length > 0 ? { padding: 0, border: "none" } : { padding: 12 }
        }
      >
        {fileList.length === 0 ? (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {disabled
                ? "Không yêu cầu tải ảnh"
                : "Nhấn hoặc kéo thả file vào khu vực này để tải lên"}
            </p>
            <p className="ant-upload-hint">
              {disabled
                ? "Bài thi này không có ảnh đính kèm."
                : "Hỗ trợ 1 ảnh duy nhất (JPG, PNG, WEBP)."}
            </p>
          </>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="preview-gallery flex flex-col gap-4">
              {fileList.map((f) => (
                <PreviewItem
                  key={f.uid}
                  file={f}
                  onRemove={handleRemove}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
        )}
      </Dragger>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Button
          onClick={() => {
            setFileList([]);
            message.info("Đã xoá ảnh.");
            if (typeof handleFileSelect === "function") {
              handleFileSelect({ target: { files: [] } });
            }
          }}
          disabled={fileList.length === 0 || disabled}
        >
          Xóa ảnh
        </Button>
      </div>
    </>
  );
};

export default ChartUpload;