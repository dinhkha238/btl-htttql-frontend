import { Table, TableProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  data: any;
  tableData: any;
  setTableData: any;
}

export const HHTableAdd: React.FC<Props> = ({
  data,
  setTableData,
  tableData,
}) => {
  const columns: TableProps["columns"] = [
    {
      title: "Mã MH",
      dataIndex: "id",
      key: "id",
      width: 10,
    },
    {
      title: "Mặt hàng",
      dataIndex: "ten",
      key: "ten",
      width: 300,
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
    {
      title: "Hoạt động",
      dataIndex: "active",
      render: (_: any, data: any) => {
        return (
          <div>
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );
        function handleDelete() {
          const index = tableData.findIndex((item: any) => item.id === data.id);
          tableData.splice(index, 1);
          setTableData([...tableData]);
        }
      },
    },
  ];
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );
};
