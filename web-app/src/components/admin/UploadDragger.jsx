import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaRegImage } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from "xlsx";
import { extractData, readExcelFile, saveMultipleFiles } from '../../slice/files';

const UploadDragger = ({ type, testTitle, mediaUrl, form, typeUpload }) => {
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([]);
    const { excelData, questionList, answerList, error, uploadedFiles, loading } = useSelector((state) => state.file);
    const beforeUploadExcel = (file) => {
        dispatch(readExcelFile(file))
            .unwrap()
            .then(() => {
                // console.log("Test title:", testTitle);
                dispatch(extractData({ testTitle: testTitle, mediaUrl: mediaUrl }));
            })
        return false;
    }
    const handleUploadResourceContent = (options) => {
        // console.log(options);
        const { file, onSuccess, onError } = options;
        const newFiles = [...fileList, file];
        setFileList(newFiles);
        // console.log("uploaded files when handle", newFiles)
        if (!form.getFieldValue("title")) {
            alert("Vui lòng nhập Tên bài thi trước khi upload");
            onError("Missing test title");
            return;
        }
        dispatch(saveMultipleFiles({ files: newFiles, testTitle: form.getFieldValue("title"), fileCategory: type },
            { dispatch: dispatch }))
            .unwrap()
            .then(() => {
                onSuccess("ok");
            })
            .catch(err => {
                onError(err);
            });
    };
    console.log("file uploaded:", uploadedFiles)
    return (
        <Card className="uploadFrame">
            <Upload.Dragger
                fileList={fileList}
                onRemove={(file) => {
                    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
                }}
                customRequest={handleUploadResourceContent}
                multiple={type === "Excel" || type === "LISTENING_AUDIO" ? false : true}
                accept={type === "Excel" ? ".xls,.xlsx" : type === "LISTENING_AUDIO" || type === "QUESTION_AUDIO" ? ".mp3, .wav, .m4a" : ".png, .webp, .jpg, .jpeg"}
                beforeUpload={type === "Excel" && beforeUploadExcel}
                showUploadList={true}
                className="!h-64 w-full !flex !flex-col !justify-center !items-center"
            >
                <p
                    className={`ant-upload-drag-icon w-24 h-24 !flex !items-center !justify-center p-4 ${type === "Excel" ? "bg-green-100" : type === "LISTENING_AUDIO" || type === "QUESTION_AUDIO" ? "bg-blue-100" : "bg-orange-100"} rounded-[50%]`}
                >
                    {type === "Excel"
                        ? <FaFileExcel className='text-green-600 text-4xl' />
                        : type === "LISTENING_AUDIO" || type === "QUESTION_AUDIO"
                            ? <HiSpeakerWave className='text-blue-600 text-4xl' />
                            : <FaRegImage className='text-orange-900 text-4xl' />
                    }
                </p>
                <p className='text-xl font-[400]'>Kéo thả file vào đây</p>
                <span>hoặc <span className='text-blue-400'>chọn file</span></span>
                <p className="text-gray-400 text-xs mt-2">
                    {type === "Excel"
                        ? <>Hỗ trợ .xlsx, .xls (tối đa 10MB)</>
                        : type === "LISTENING_AUDIO" || type === "QUESTION_AUDIO"
                            ? <>Hỗ trợ .mp3, .wav, .m4a (tối đa 50MB)</>
                            : <>Hỗ trợ .png, .jpg, .jpeg, webp (tối đa 50MB)</>}
                </p>
            </Upload.Dragger>

            {/* 👇 Preview parsed JSON */}
            {excelData.length > 0 && (
                <pre className="bg-gray-100 p-2 mt-4 overflow-x-auto text-xs">
                    {JSON.stringify(excelData, null, 2)}
                </pre>
            )}
        </Card>
    );
};

export default UploadDragger;
