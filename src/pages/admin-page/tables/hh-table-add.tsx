import { Button, Form, Input, Table, TableProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useState } from "react";

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

interface EditProps {
  data: any;
  setTableDataEdit: any;
  dataSelected: any;
  mutateEdit: any;
  type: string;
}

interface DataType {
  id: string;
  ten: string;
  dongia: number;
  soluong: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <Input type="number" /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const HHTableEdit: React.FC<EditProps> = ({
  data,
  setTableDataEdit,
  dataSelected,
  mutateEdit,
  type,
}) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataType[]>(data);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const isEditing = (record: DataType) => record.id === editingKey;

  const edit = (record: DataType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      console.log(row, key);
      if (type === "pn") {
        mutateEdit({
          idPn: dataSelected.id,
          idHanghoa: key,
          dongia: row.dongia,
          soluong: row.soluong,
        });
      } else if (type === "px") {
        mutateEdit({
          idPx: dataSelected.id,
          idHanghoa: key,
          dongia: row.dongia,
          soluong: row.soluong,
        });
      }
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey(null);
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey(null);
      }
      setTableDataEdit(newData);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns: ColumnType<DataType>[] = [
    {
      title: "Mã mặt hàng",
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
      editable: true,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
      editable: true,
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
      title: "Hành động",
      dataIndex: "operation",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.id)}
              type="link"
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button onClick={cancel} type="link">
              Cancel
            </Button>
          </span>
        ) : (
          <Button
            disabled={editingKey !== null}
            onClick={() => edit(record)}
            type="link"
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType:
          col.dataIndex === "dongia" || col.dataIndex === "soluong"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
