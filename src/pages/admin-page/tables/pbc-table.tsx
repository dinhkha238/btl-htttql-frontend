import React, { useState, useRef } from "react";
import { Table, Input, Button } from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps, ColumnType } from "antd/es/table";
import type { InputRef } from "antd";

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

interface DataType {
  id: string;
  idKho: string;
  idNvien: string;
  tongslban: number;
  doanhthu: number;
  ngaybaocao: string;
  active: boolean;
}

export const PBCTable: React.FC<Props> = ({
  data,
  setVisible,
  setDataSelected,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex as string)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex as string)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters as () => void)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? <span>{text.toString()}</span> : text,
  });

  const columns: TableProps<DataType>["columns"] = [
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
      title: "Tổng số lượng bán",
      dataIndex: "tongslban",
      key: "tongslban",
    },
    {
      title: "Doanh thu",
      dataIndex: "doanhthu",
      key: "doanhthu",
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "ngaybaocao",
      key: "ngaybaocao",
      ...getColumnSearchProps("ngaybaocao"),
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      key: "active",
      width: 200,
      render: (_: any, record: DataType) => {
        return (
          <div>
            <EyeOutlined
              style={{ paddingRight: 8, color: "blue" }}
              onClick={() => handleDetail(record)}
            />
          </div>
        );
        function handleDetail(data: DataType) {
          setVisible(true);
          setDataSelected(data);
        }
        function handleDelete(data: DataType) {
          // Implement delete functionality here
        }
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export const PBCAddTable: React.FC<AddProps> = ({ data }) => {
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
      title: "Tổng số lượng",
      dataIndex: "soluongxuat",
      key: "soluongxuat",
    },
    {
      title: "Tổng tiền",
      dataIndex: "doanhthu",
      key: "doanhthu",
    },
    {
      title: "Ngày xuất hàng",
      dataIndex: "ngayxuat",
      key: "ngayxuat",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
