import { Card, Upload, message } from 'antd';
import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from "xlsx";
import { extractData, readExcelFile } from '../../slice/files';

const UploadDragger = ({ type, testTitle, mediaUrl }) => {
    const dispatch = useDispatch();
    const { excelData, questionList, answerList, error } = useSelector((state) => state.file);

    const beforeUploadExcel = (file) => {
        dispatch(readExcelFile(file))
            .unwrap()
            .then(() => {
                console.log("Test title:", testTitle);
                dispatch(extractData({ testTitle: testTitle, mediaUrl: mediaUrl }));
            })
        return false;
    }
    return (
        <Card className="uploadFrame">
            <Upload.Dragger
                accept=".xls,.xlsx"
                maxCount={1}
                beforeUpload={beforeUploadExcel}
                showUploadList={false}
                className="!h-64 w-full !flex !flex-col !justify-center !items-center"
            >
                <p
                    className={`ant-upload-drag-icon w-24 h-24 !flex !items-center !justify-center p-4 ${type === "Excel" ? "bg-green-100" : "bg-blue-100"} rounded-[50%]`}
                >
                    {type === "Excel"
                        ? <FaFileExcel className='text-green-600 text-4xl' />
                        : <HiSpeakerWave className='text-blue-600 text-4xl' />
                    }
                </p>
                <p className='text-xl font-[400]'>Kéo thả file {type} vào đây</p>
                <span>hoặc <span className='text-blue-400'>chọn file</span></span>
                <p className="text-gray-400 text-xs mt-2">
                    {type === "Excel"
                        ? <>Hỗ trợ .xlsx, .xls (tối đa 10MB)</>
                        : <>Hỗ trợ .mp3, .wav, .m4a (tối đa 50MB)</>}
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
