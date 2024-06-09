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
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
