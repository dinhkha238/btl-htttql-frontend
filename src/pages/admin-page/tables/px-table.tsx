import React, { useState, useRef } from "react";
import { Table, Input, Button } from "antd";
import { EyeOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps, ColumnType } from "antd/es/table";
import type { InputRef } from "antd";

interface Props {
  data: any;
  setVisible: any;
  setDataSelected: any;
  setEditModal: any;
}

interface DataType {
  id: string;
  idDaily: string;
  idKho: string;
  idNvien: string;
  tongsl: number;
  tongtien: number;
  ngayxuat: string;
  active: boolean;
}

export const PXTable: React.FC<Props> = ({
  data,
  setVisible,
  setDataSelected,
  setEditModal,
}) => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    _: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
      dataIndex: "idNvien",
      key: "idNvien",
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
      ...getColumnSearchProps("ngayxuat"),
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
            <EditOutlined
              style={{ paddingRight: 8, color: "green" }}
              onClick={() => handleEdit(record)}
            ></EditOutlined>
          </div>
        );
        function handleDetail(data: DataType) {
          setVisible(true);
          setDataSelected(data);
        }
        function handleEdit(data: DataType) {
          setEditModal(true);
          setDataSelected(data);
        }
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};
