import { Table, TableProps } from "antd";

interface Props {
  data: any;
}

export const HHTable: React.FC<Props> = ({ data }) => {
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
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Thành tiền",
      dataIndex: "id",
      key: "id",
      render: (_: any, data: any) => {
        return data.dongia * data.soluong;
      },
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
