import React, { useState, useEffect } from "react";
import ChartUpload from "./ChartUpload"; // <- Import component

// (1. Thêm hàm chuẩn hóa)
// Hàm này chuyển đổi "Task 1" -> 1, "Task 2" -> 2
const normalizeTaskType = (taskString) => {
  if (taskString === "Task 1") return 1;
  if (taskString === "Task 2") return 2;
  // Mặc định là 1 nếu không khớp (hoặc là số 1)
  return typeof taskString === 'number' ? taskString : 1;
};

const InputColumn = ({ onGrade, isLoading, lockedData }) => {
  const isLocked = !!lockedData;

  // (2. Dùng hàm chuẩn hóa khi khởi tạo state)
  const [selectedTask, setSelectedTask] = useState(
    isLocked ? normalizeTaskType(lockedData?.taskType) : 1
  );
  const [promptText, setPromptText] = useState(lockedData?.promptText || "");
  const [essayText, setEssayText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({ prompt: null, essay: null });

  // (3. Dùng hàm chuẩn hóa trong useEffect)
  useEffect(() => {
    if (lockedData) {
      // Chuyển "Task 1" thành 1
      setSelectedTask(normalizeTaskType(lockedData.taskType));
      // 'promptText' và 'promptImage' (trong lockedData) đã được map đúng
      setPromptText(lockedData.promptText || "");
      setUploadedFile(null);
      setErrors({ prompt: null, essay: null });
    }
  }, [lockedData]);

  const handleTaskChange = (task) => {
    if (isLocked) return;
    setSelectedTask(task);
    setErrors((prev) => ({ ...prev, prompt: null }));
  };

  const handleFileChange = (event) => {
    if (isLocked) return;
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setErrors((prev) => ({ ...prev, prompt: null }));
    } else {
      setUploadedFile(null);
    }
  };

  const handleSubmit = () => {
    let hasError = false;
    let newErrors = { prompt: null, essay: null };

    if (!isLocked) {
      // Logic kiểm tra lỗi (hiện đã đúng vì selectedTask là số 1 hoặc 2)
      if (selectedTask === 1 && promptText.trim() === "" && !uploadedFile) {
        newErrors.prompt = "Vui lòng nhập đề bài hoặc tải ảnh lên.";
        hasError = true;
      } else if (selectedTask === 2 && promptText.trim() === "") {
        newErrors.prompt = "Vui lòng nhập đề bài.";
        hasError = true;
      }
    }

    if (essayText.trim() === "") {
      newErrors.essay = "Vui lòng nhập bài làm của bạn.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) {
      return;
    }

    onGrade({
      task: selectedTask,
      prompt: promptText,
      essay: essayText,
      // Logic lấy ảnh đã đúng
      image: isLocked ? lockedData.promptImage : uploadedFile,
    });
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleClear = (setter) => {
    if (setter === setPromptText && isLocked) return;
    setter("");
  };

  const essayWordCount = countWords(essayText);

  return (
    <div className="flex flex-col gap-6 mt-12">
      {/* KHỐI 1: CHỌN LOẠI BÀI VIẾT */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          Chọn Loại Bài Viết
        </h2>
        <div
          className={`flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 ${isLocked ? "opacity-75 cursor-not-allowed" : ""
            }`}
        >
          {/* Radio Task 1 */}
          <label
            htmlFor="radio-task1"
            className={`flex items-center ${isLocked ? "cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            <input
              type="radio"
              id="radio-task1"
              name="task-type"
              value="1"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              // (4. Logic 'checked' giờ sẽ hoạt động đúng)
              checked={selectedTask === 1}
              onChange={() => handleTaskChange(1)}
              disabled={isLocked}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 1 - Chart/Graph
            </span>
          </label>
          {/* Radio Task 2 */}
          <label
            htmlFor="radio-task2"
            className={`flex items-center ${isLocked ? "cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            <input
              type="radio"
              id="radio-task2"
              name="task-type"
              value="2"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              // (4. Logic 'checked' giờ sẽ hoạt động đúng)
              checked={selectedTask === 2}
              onChange={() => handleTaskChange(2)}
              disabled={isLocked}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 2 - Essay
            </span>
          </label>
        </div>
      </div>

      {/* KHỐI 1.5: UPLOAD ẢNH (Conditional) */}
      {/* (5. Logic 'selectedTask === 1' giờ sẽ hoạt động đúng) */}
      {selectedTask === 1 && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-300">
          <ChartUpload
            handleFileSelect={handleFileChange}
            // (6. 'initialImageUrl' đã được map đúng từ 'resourceContent')
            initialImageUrl={lockedData?.promptImage}
            disabled={isLocked}
          />
        </div>
      )}

      {/* KHỐI 2: NHẬP ĐỀ BÀI */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Nhập Đề Bài</h2>
          <div className="flex space-x-2">
            {!isLocked && (
              <button
                onClick={() => handleClear(setPromptText)}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                title="Xóa"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {isLocked
            ? "Đề bài đã được cung cấp."
            : "Nếu đề bài là dạng chữ, dán (paste) vào đây."}
        </p>
        <textarea
          id="prompt-input"
          rows="5"
          className={`w-full p-4 rounded-lg border transition ${errors.prompt
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}`}
          placeholder="Ví dụ: 'The chart below shows the percentage of the population...'"
          // (7. 'promptText' đã được map đúng từ 'title')
          value={promptText}
          onChange={(e) => {
            if (isLocked) return;
            setPromptText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, prompt: null }));
            }
          }}
          readOnly={isLocked}
        />
        {errors.prompt && (
          <div className="text-red-600 text-sm mt-1">{errors.prompt}</div>
        )}
      </div>

      {/* KHỐI 3: NHẬP BÀI LÀM */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Nhập Bài Làm Của Bạn
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleClear(setEssayText)}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              title="Xóa"
            >
              Xóa
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Dán (paste) toàn bộ bài làm của bạn vào đây.
        </p>
        <textarea
          id="essay-input"
          rows="15"
          className={`w-full p-4 rounded-lg border transition ${errors.essay
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          placeholder="Dán bài làm của bạn tại đây..."
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, essay: null }));
            }
          }}
        />
        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-sm ${essayWordCount > 0 ? "text-gray-600" : "text-gray-400"
              }`}
          >
            Số chữ: <span className="font-semibold">{essayWordCount}</span>
          </div>
          {errors.essay && (
            <div className="text-red-600 text-sm">{errors.essay}</div>
          )}
        </div>
      </div>

      <button
        id="grade-button"
        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 !text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span>{isLoading ? "Đang Xử Lý..." : "Chấm Điểm Bằng AI"}</span>
      </button>
    </div>
  );
};

export default InputColumn;