import publicInstance from "./AxiosPublicReq";

const urlSpeaking = "https://ielts-scoring-production.up.railway.app/api/v1";
const urlWriting = "https://leonine-dave-unequally.ngrok-free.dev";

export const submitSpeaking = (formData) => {
  return publicInstance.post(`${urlSpeaking}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const submitWriting = (formData) => {
  return publicInstance.post(`${urlWriting}/score`, formData);
}

export const getResult = (id) => {
  return publicInstance.get(`${urlSpeaking}/result/${id}`);
}