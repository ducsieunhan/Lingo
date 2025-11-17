import { Card, Select } from "antd"
import ExamCate from "../../components/tests/ListPage/ExamCate"
import Statistics from "../../components/client/userInfo/Statistics";
import LineChart from "../../components/client/userInfo/LineChart";
import HistoryAttempt from "../../components/client/userInfo/HistoryAttempt";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { retrieveAttempts } from "../../slice/attempts";

const Analytics = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { attempts } = useSelector(state => state.attempts);
  const { user } = useSelector((state) => state.authentication);
  const params = new URLSearchParams(window.location.search);
  const [lineType, setLineType] = useState("")
  // const category = params.get("category");

  const userId = user?.sub;

  useEffect(() => {
    dispatch(retrieveAttempts(userId));
  }, [userId, dispatch])

  const handleNavigate = (para, value) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set(para, value);
    navigate({
      pathname: location.pathname,
      search: `${createSearchParams(currentParams)}`
    })
  };

  const filterAttempts = attempts;
  // console.log(filterAttempts);

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test history statistics</h1>
        <p className="text-gray-600">Track your learning progress and analyze your results</p>
      </div>

      {/* <Card className="!shadow-md !mb-7 ">
        <ExamCate handleNavigate={handleNavigate} analytics={true} />
      </Card> */}


      <Statistics attemptData={filterAttempts} />
      <Card className="!shadow-md !mb-7 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Score chart of the last 10 attempts</h2>
          <div className="flex items-center !space-x-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Score</span>
            </div>
            <Select
              defaultValue="All "
              style={{ width: 120 }}
              onChange={(value) => setLineType(value)}
              options={[
                { value: '', label: 'All ' },
                { value: 'Reading', label: 'Reading' },
                { value: 'Listening', label: 'Listening' },
                { value: 'Writing', label: 'Writing' },
                { value: 'Speaking', label: 'Speaking' },
              ]}
            />
          </div>
        </div>
        <div className="h-96">
          <LineChart attemptData={filterAttempts} type={lineType} />
        </div>
      </Card>

      <Card className="!shadow-md !mb-7 ">
        <HistoryAttempt />
      </Card>


    </div>
  )
}
export default Analytics