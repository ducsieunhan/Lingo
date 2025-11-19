import { Button, Card, Col, Input, Pagination, Row, Select, Space, Spin, Tabs, Tag, Typography } from "antd"
import RightSider from "../../components/tests/RightSider"
import { CaretRightOutlined, ClockCircleFilled, ClockCircleOutlined, DownOutlined, PlayCircleOutlined, QuestionCircleFilled, QuestionCircleOutlined, SearchOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import FilterTab from "../../components/tests/ListPage/FilterTab";
import ExamCate from "../../components/tests/ListPage/ExamCate";
import TestItem from "../../components/tests/ListPage/TestItem";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTests, setPage, setPageSize, setSearch, setSort } from "../../slice/testListSlice";
import { useEffect } from "react";
import { retrieveAttempts } from "../../slice/attempts";


const TestListPage = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = parseInt(searchParams.get("size") || "9", 10);

  const status = searchParams.get("status") || "";
  const { loading, attempts } = useSelector((state) => state.attempts);
  const { user } = useSelector((state) => state.authentication);
  const { meta } = useSelector((state) => state.tests);

  // console.log(meta);


  const userId = user?.sub;

  useEffect(() => {
    const Page = `page=${page}&size=${pageSize}&`;

    let filterExpr = "";

    if (status === "done" || status === "notdone") {
      const quizIds = [...new Set(attempts.map(a => a.quizId))];
      if (quizIds.length > 0) {
        if (status === "done") {
          filterExpr = `id in [${quizIds.join(",")}]`;
        } else if (status === "notdone") {
          filterExpr = `id not in [${quizIds.join(",")}]`;
        }
      }
    }

    if (category && category !== "all") {
      filterExpr += filterExpr
        ? ` and type~'${category}'`
        : `type~'${category}'`;
    }

    if (search && search.trim() !== "") {
      filterExpr += filterExpr
        ? ` and title~'*${search}*'`
        : `title~'*${search}*'`;
    }

    const filter = filterExpr ? `filter=${encodeURIComponent(filterExpr)}` : "";
    const sortParam = sort ? `&sort=${sort},asc` : "";
    const params = filter || sortParam ? `${filter}${sortParam}` : "";

    dispatch(retrieveTests(Page + params));
  }, [dispatch, attempts, category, search, sort, page, pageSize, status]);


  // get all attempt user did along with test 
  useEffect(() => {
    dispatch(retrieveAttempts(userId));
  }, [userId]);

  const handleNavigate = (para, value) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set(para, value);
    navigate({
      pathname: location.pathname,
      search: `${createSearchParams(currentParams)}`
    })
  };

  function handleChangeSelect(value) {
    dispatch(setSort(value));
    handleNavigate("sort", value);
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    handleNavigate("search", e.target.value);
  }


  const onShowSizeChange = (current, pageSize) => {
    dispatch(setPage(current));
    dispatch(setPageSize(pageSize));
  };

  if (loading) return <Spin fullscreen={true} />

  return (
    <div className="bg-gray-50 pt-10 ">
      {/* main  */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-7 ">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách bài thi</h1>
              <p className="text-gray-600">Chọn bài thi phù hợp với trình độ và mục tiêu của bạn</p>
            </div>

            {/* <Category /> */}
            <div className="mb-8"><ExamCate handleNavigate={handleNavigate} /></div>

            {/* search */}

            <Card className="!shadow-md !mb-7 ">
              <div className="!flex !flex-row space-x-6">
                <Input
                  placeholder="Tìm kiếm bài thi theo tên, mã số"
                  size="large"
                  prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
                  allowClear
                  onPressEnter={handleSearch}
                />

                <Select size="large" placeholder="Sắp xếp" style={{ width: 150 }} onChange={handleChangeSelect}>
                  <Option value="attempts">Lượt làm bài</Option>
                  <Option value="comment">Lượt bình luận</Option>
                  <Option value="">Điểm đánh giá</Option>
                </Select>
              </div>

              <FilterTab handleNavigate={handleNavigate} />


            </Card>

            {/* items */}

            <TestItem />

            <div className="mt-4">
              <Pagination align="center"
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={meta?.page + 1}
                total={meta?.pages}
              />
            </div>

          </div>

          <div className="lg:col-span-3 space-y-6">
            <RightSider />
          </div>

        </div>
      </div>
    </div>
  )
}
export default TestListPage