import { Table, TableProps } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  data: any;
  setVisible: any;
  setDataSelected: any;
}

interface AddProps {
  data: any;
  tableData: any;
  setTableData: any;
}

export const PKKTable: React.FC<Props> = ({
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
      key: "idNvien",
    },
    {
      title: "Tổng số lượng tồn",
      dataIndex: "tongslton",
      key: "tongslton",
    },

    {
      title: "Ngày kiểm kê",
      dataIndex: "ngaykiemke",
      key: "ngaykiemke",
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

export const HHKKAddTable: React.FC<AddProps> = ({ data }) => {
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
      title: "Số lượng tồn",
      dataIndex: "soluongton",
      key: "soluongton",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
