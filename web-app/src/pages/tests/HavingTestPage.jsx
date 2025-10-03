import React, { useEffect, useState } from 'react';
import TimeFrame from '../../components/tests/TimeFrame';
import MainContent from '../../components/tests/MainContent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { retrieveQuestionForTest } from '../../slice/questions';
import { retrieveSingleTest } from '../../slice/tests';

const HavingTestPage = () => {
    const [editMode, setEditMode] = useState(false);
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const { questions, userAnswers } = useSelector((state) => state.questions)
    const { test } = useSelector((state) => state.tests);
    useEffect(() => {
        const getQuestionsOfTest = async (id) => {
            await dispatch(retrieveQuestionForTest(id));
        }
        const getTestData = async (id) => {
            await dispatch(retrieveSingleTest(id));
        }
        getQuestionsOfTest(id);
        getTestData(id);
    }, [id]);
    // console.log(test)
    console.log(userAnswers)
    return (
        <>
            <TimeFrame editMode={editMode} setEditMode={setEditMode} questions={questions} />
            <MainContent editMode={editMode} testTitle={name} testId={id} />
        </>
    );
};

export default HavingTestPage;