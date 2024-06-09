import { Table, TableProps } from "antd";

interface Props {
  data: any;
}

export const HHKKTable: React.FC<Props> = ({ data }) => {
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
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
