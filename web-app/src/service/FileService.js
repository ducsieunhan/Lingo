import { useDispatch } from "react-redux";
import instance from "./axios-customize";
import { updateProgress } from "../slice/files";

export const uploadOneFile = async (file, testTitle, fileCategory) => {
    const URL = "/file/upload";
    const bodyForm = new FormData();
    bodyForm.append("file", file);
    bodyForm.append("testTitle", testTitle);
    bodyForm.append("fileCategory", fileCategory);

    const response = await instance.post(URL, bodyForm, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return (await response).data;
}
export const uploadMultipleFiles = async (files, testTitle, fileCategory, onProgress) => {
    const URL = "/file/uploadMany";
    const bodyForm = new FormData();
    files.forEach((file) => {
        bodyForm.append("files", file);
    });
    bodyForm.append("testTitle", testTitle);
    bodyForm.append("fileCategory", fileCategory);

    const response = await instance.post(URL, bodyForm, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            if (onProgress) {
                onProgress(percent);
            }
        },
    });

    return response.data;
};

export const modifyQuestionResourceMedia = async (resourceId, file, testTitle, fileCategory, currentResourceContent, updatedFileName) => {
    const URL = `/file/updateContent/${resourceId}`;
    const bodyForm = new FormData();
    bodyForm.append("testTitle", testTitle);
    bodyForm.append("file", file);
    bodyForm.append("fileCategory", fileCategory);
    bodyForm.append("currentResourceContent", currentResourceContent);
    bodyForm.append("updatedFileName", updatedFileName);
    const response = await instance.put(URL, bodyForm, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
}

export const modifyExplanationResourceMedia = async (questionId, file, testTitle, fileCategory, currentResourceContent, updatedFileName) => {
    const URL = `/file/updateExplanation/${questionId}`;
    const bodyForm = new FormData();
    bodyForm.append("testTitle", testTitle);
    bodyForm.append("file", file);
    bodyForm.append("fileCategory", fileCategory);
    bodyForm.append("currentResourceContent", currentResourceContent);
    bodyForm.append("updatedFileName", updatedFileName);
    const response = await instance.put(URL, bodyForm, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data;
}
