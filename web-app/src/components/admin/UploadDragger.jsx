import { Card, Upload, message } from 'antd';
import React, { useState } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import * as XLSX from "xlsx";

const UploadDragger = ({ type }) => {
    const [excelData, setExcelData] = useState([]);
    const [listQuestion, setListQuestion] = useState([]);
    const [listAnswer, setListAnswer] = useState([]);
    const readExcelData = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });

                    // Take first sheet
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];

                    // Convert to JSON
                    const json = XLSX.utils.sheet_to_json(worksheet, { defval: null });
                    setExcelData(json);

                    resolve(false); // prevent upload
                } catch (err) {
                    message.error("Không đọc được file Excel");
                    reject(err);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };
    console.log("excel data:", excelData);
    const extractData = () => {

        excelData.map((item) => {
            let reqAnswer = [];
            ["A", "B", "C", "D"].map((opt) => {
                const answer = {
                    content: item[`answer_${opt}`],
                    correct: item.correct_answer === opt ? "true" : "false"
                }
                reqAnswer.push(answer);
                listAnswer.push(answer);
            });
            const question = {
                tittle: item.content,
                point: 0,
                answerKey: null,
                explanation: null,
                part: item.part,
                category: item.category,
                mediaUrl: item.mediaUrl,
                testTittle: item.testTittle,
                answers: reqAnswer
            }
        })
    }
    extractData();
    console.log("Answer list:", listAnswer);
    return (
        <Card className="uploadFrame">
            <Upload.Dragger
                accept=".xls,.xlsx"
                maxCount={1}
                beforeUpload={readExcelData}
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
