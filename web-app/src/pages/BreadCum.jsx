import { Breadcrumb } from "antd";

const Brc = ({ value1 = "", value2 = "" }) => {
  return (
    <Breadcrumb
      items={
        [
          {
            title: 'Trang chủ',
          },
          {
            title: <a href="">{value1}</a>,
          },
          {
            title: `${value2}`,
          },
        ]}
    />
  )
}

export default Brc; 