import { Space, Table, Tag } from 'antd';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { retrieveAttempts } from "../../../slice/attempts";
import { formatTime } from '../../../service/GlobalFunction';
const HistoryAttempts = () => {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const { attempts } = useSelector((state) => state.attempts);
  const { user } = useSelector((state) => state.authentication);
  const histories = attempts.filter(a => String(a.quizId) === id) || 0;
  let path = window.location.pathname;
  console.log(histories);


  useEffect(() => {
    if (user) {
      dispatch(retrieveAttempts(user?.sub));
    }
  }, [user, dispatch]);

  const columns = [
    {
      title: 'Ngày làm',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: text => <div>{text.split("T")[0].split("-").join("/")}</div>,
    },
    {
      title: 'Kết quả',
      dataIndex: 'score',
      key: 'score',
      render: text => <div className='font-semibold'>{text}/200</div>
    },
    {
      title: 'Thời gian làm bài',
      dataIndex: 'timeTaken',
      key: 'timeTaken',
      render: text => <div>{formatTime(text)}</div>
    },
    {
      key: 'action',
      dataIndex: "detail",
      render: (_, record) => <Link to={`${path}/results/${record?.attemptId}`} className='!text-blue-700 text-base hover:!text-blue-900'>Xem chi tiết</Link>,
    },
  ];

  return (
    histories.length !== 0 && <div className='space-y-4 mb-7'>
      <h1 className='font-semibold text-lg'>Kết quả làm bài của bạn:</h1>
      <Table columns={columns} dataSource={histories} pagination={false} scroll={{ x: 'max-content' }} />
    </div>

  )
}
export default HistoryAttempts