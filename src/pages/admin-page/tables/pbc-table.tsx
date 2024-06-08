import { Table, TableProps } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  data: any;
  setVisible: any;
  setDataSelected: any;
}

export const PBCTable: React.FC<Props> = ({
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
      title: "ID kho",
      dataIndex: "idKho",
      key: "idKho",
    },
    {
      title: "ID nhân viên",
      dataIndex: "idNvien",
      key: "idNVien",
    },
    {
      title: "Tổng số lượng",
      dataIndex: "tongslban",
      key: "tongslban",
    },
    {
      title: "Tổng tiền",
      dataIndex: "doanhthu",
      key: "doanhthu",
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "ngaybaocao",
      key: "ngaybaocao",
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
