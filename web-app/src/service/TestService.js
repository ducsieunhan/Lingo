// Test service
import instance from "./axios-customize";
export const getAllTests = async () => {
    const URL = "/test/all";
    const response = await instance.get(URL);
    return (await response).data;
}
export const getOneTest = async (id) => {
    const URL = `/test/${id}`;
    const response = await instance.get(URL);
    return (await response).data;
}
export const addTest = async (test) => {
    const URL = `/test/add`;
    const response = await instance.post(URL, test);
    if (response.status === 500) {
        alert("failed to create test");
        console.log("failed to create test");
    }
    return (await response).data;
}
export const updateTest = async (id, updateTest) => {
    const URL = `/test/update/${id}`;
    const response = await instance.put(URL, updateTest);
    return (await response).data;
}
export const deleteTest = async (id) => {
    const URL = `/test/delete/${id}`;
    const response = await instance.delete(URL);
    return (await response).data;
}

//crud question
export const getAllQuestions = async () => {
    const URL = "/question/all";
    const response = await instance.get(URL);
    return (await response).data;
}
export const getOneQuestion = async (id) => {
    const URL = `/question/${id}`;
    const response = await instance.get(URL);
    return (await response).data;
}
export const addQuestion = async (question) => {
    const URL = `/question/add`;
    const response = await instance.post(URL, question);
    if (response.status === 500) {
        alert("failed to create question");
        console.log("failed to create question");
    }
    return (await response).data;
}
export const updateQuestion = async (id, updateQuestion) => {
    const URL = `/question/update/${id}`;
    const response = await instance.put(URL, updateQuestion);
    return (await response).data;
}
export const deleteQuestion = async (id) => {
    const URL = `/question/delete/${id}`;
    const response = await instance.delete(URL);
    return (await response).data;
}
export const addMultipleQuestions = async (questionList) => {
    const URL = `/question/bulk`;
    const response = await instance.post(URL, questionList);
    return (await response).data;
}
//crud media resource
export const getAllResource = async () => {
    const URL = "/resource/all";
    const response = await instance.get(URL);
    return (await response).data;
}
export const getOneResource = async (id) => {
    const URL = `/resource/${id}`;
    const response = await instance.get(URL);
    return (await response).data;
}
export const addResource = async (resource) => {
    const URL = `/resource/add`;
    const response = await instance.post(URL, resource);
    if (response.status === 500) {
        alert("failed to create resource");
        console.log("failed to create resource");
    }
    return (await response).data;
}
export const updateResource = async (id, updateResource) => {
    const URL = `/resource/update/${id}`;
    const response = await instance.put(URL, updateResource);
    return (await response).data;
}
export const deleteResource = async (id) => {
    const URL = `/resource/delete/${id}`;
    const response = await instance.delete(URL);
    return (await response).data;
}

// crud for answer
export const getAllAnswers = async () => {
    const URL = "/answer/all";
    const response = await instance.get(URL);
    return (await response).data;
}
export const getOneAnswer = async (id) => {
    const URL = `/answer/${id}`;
    const response = await instance.get(URL);
    return (await response).data;
}
export const addAnswer = async (answer) => {
    const URL = `/answer/add`;
    const response = await instance.post(URL, answer);
    if (response.status === 500) {
        alert("failed to create answer");
        console.log("failed to create answer");
    }
    return (await response).data;
}
export const updateAnswer = async (id, updateAnswer) => {
    const URL = `/answer/update/${id}`;
    const response = await instance.put(URL, updateAnswer);
    return (await response).data;
}
export const deleteAnswer = async (id) => {
    const URL = `/answer/delete/${id}`;
    const response = await instance.delete(URL);
    return (await response).data;
}

export const addMultipleAnswers = async (answerList) => {
    const URL = `/answer/bulk`;
    const response = await instance.post(URL);
    return (await response).data;
}