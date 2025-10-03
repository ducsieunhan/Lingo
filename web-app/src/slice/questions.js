import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMultipleQuestions, addQuestion, deleteQuestion, getAllQuestionForTest, getAllQuestions, getOneQuestion, updateQuestion } from "../service/TestService";

const initialState = {
    questions: [],
    userAnswers: []
};

export const createQuestion = createAsyncThunk(
    "questions/create",
    async (question) => {
        return await addQuestion(question);
    }
)

export const retrieveAllQuestions = createAsyncThunk(
    "questions/retrieveAll",
    async () => {
        return await getAllQuestions();
    }
)

export const retrieveSingleQuestion = createAsyncThunk(
    "questions/retrieveOne",
    async (id) => {
        return await getOneQuestion(id);
    }
)

export const modifyQuestion = createAsyncThunk(
    "questions/update",
    async ({ id, question }) => {
        return await updateQuestion(id, question);
    }
)

export const removeQuestion = createAsyncThunk(
    "questions/delete",
    async (id) => {
        return await deleteQuestion(id);
    }
)

export const saveMultipleQuestions = createAsyncThunk(
    "questions/saveAll",
    async (questionList) => {
        return await addMultipleQuestions(questionList);
    }
)

export const retrieveQuestionForTest = createAsyncThunk(
    "question/testQuestions",
    async (id) => {
        return await getAllQuestionForTest(id);
    }
)


const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        getUserAnswers: (state, action) => {
            const { questionId, userAnswerChoice, userAnswer } = action.payload;
            // console.log("debug", action.payload);
            const answerIndex = state.userAnswers.findIndex(
                answer => answer.questionId === questionId
            );

            if (answerIndex !== -1) {

                state.userAnswers[answerIndex] = {
                    ...state.userAnswers[answerIndex],
                    userAnswer: userAnswerChoice
                };
            } else {
                state.userAnswers.push({
                    questionId,
                    userAnswer: userAnswerChoice,

                });
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(retrieveAllQuestions.fulfilled, (state, action) => {
                return [...action.payload];
            })
            .addCase(retrieveSingleQuestion.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(modifyQuestion.fulfilled, (state, action) => {
                const index = state.questions.findIndex(q => q.id === action.payload.id);
                if (index !== -1) {
                    state.questions[index] = { ...state[index], ...action.payload };
                }
            })
            .addCase(removeQuestion.fulfilled, (state, action) => {
                let index = state.questions.findIndex(({ id }) => id === action.payload.id);
                state.questions.splice(index, 1);
            })
            .addCase(saveMultipleQuestions.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(retrieveQuestionForTest.fulfilled, (state, action) => {
                state.questions = action.payload
            });
    }
});


const { reducer } = questionSlice;
export default reducer;
export const { getUserAnswers } = questionSlice.actions;