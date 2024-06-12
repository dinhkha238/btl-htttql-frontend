import { Table, TableProps } from "antd";

interface Props {
  data: any;
}

export const HHBCTable: React.FC<Props> = ({ data }) => {
  const columns: TableProps["columns"] = [
    {
      title: "Mã hàng hóa",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mặt hàng",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Số lượng bán",
      dataIndex: "slban",
      key: "slban",
      sorter: (a, b) => a.slban - b.slban,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
    },
    {
      title: "Ngày xuất hàng",
      dataIndex: "ngayxuat",
      key: "ngayxuat",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
