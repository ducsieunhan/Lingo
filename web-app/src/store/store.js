import { configureStore } from "@reduxjs/toolkit";
import testListSlice from "../slice/testListSlice";
import attemptSlice from "../slice/attempts"
import accountSlice from "../slice/accounts"
import authReducer from '../slice/authentication';
import testReducer from "../slice/tests"
import questionReducer from "../slice/questions";
import answerReducer from "../slice/answers";
import fileReducer from "../slice/files";
import resourceReducer from "../slice/resource";
import speakingSlice from "../slice-ATI/speaking";
import writingSlice from "../slice-ATI/writing";
import notificationSlice from "../slice/notifications";
import settingsSlice from "../slice/notificationSettings";
import chatReducer from "../slice/chat";
import commentSlice from "../slice/commentSlice";
const reducer = {
    test: testReducer,
    questions: questionReducer,
    chat: chatReducer,
    answers: answerReducer,
    file: fileReducer,
    resource: resourceReducer,
    authentication: authReducer,
    tests: testListSlice,
    attempts: attemptSlice,
    accounts: accountSlice,
    speaking: speakingSlice,
    writing: writingSlice,
    notifications: notificationSlice,
    settings: settingsSlice,
    comments: commentSlice
};
export const store = configureStore({
    reducer: reducer,
    devTools: true
});
