import { Mutex } from "async-mutex";
import axios from "axios"
const mutex = new Mutex();
const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});
export default instance


