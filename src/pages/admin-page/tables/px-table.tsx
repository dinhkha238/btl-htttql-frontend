import { Table, TableProps } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  data: any;
  setVisible: any;
  setDataSelected: any;
}

export const PXTable: React.FC<Props> = ({
  data,
  setVisible,
  setDataSelected,
}) => {
  const columns: TableProps["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ID đại lý",
      dataIndex: "idDaily",
      key: "idDaily",
    },
    {
      title: "ID kho",
      dataIndex: "idKho",
      key: "idKho",
    },
    {
      title: "ID nhân viên",
      dataIndex: "idNVien",
      key: "idNVien",
    },
    {
      title: "Tổng số lượng",
      dataIndex: "tongsl",
      key: "tongsl",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
    },
    {
      title: "Ngày xuất",
      dataIndex: "ngayxuat",
      key: "ngayxuat",
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      width: 200,
      render: (_: any, data: any) => {
        return (
          <div>
            <EyeOutlined
              style={{ paddingRight: 8, color: "blue" }}
              onClick={handleDetail}
            />
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );
        function handleDetail() {
          setVisible(true);
          setDataSelected(data);
        }
        function handleDelete() {
          // setIsModalOpen(true);
          // setIdSelected(data.id);
          // setUserSelected(data.email);
        }
      },
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
