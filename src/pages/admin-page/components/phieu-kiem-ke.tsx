import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { PKKTable } from "../tables/pkk-table";
import {
  useAddPhieuXuat,
  useDaiLys,
  useHangHoaByIdNcc,
  useKhos,
  usePhieuKiemKeHangHoa,
  usePhieuKiemKes,
} from "../admin.loader";
import { useEffect, useState } from "react";
import { HHKKTable } from "../tables/hhkk-table";
import { HHTableAdd } from "../tables/hh-table-add";

export const PhieuKiemKe = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [tongTien, setTongTien] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [idSelectedNcc, setIdSelectedNcc] = useState<any>();
  const [idSelectedKho, setIdSelectedKho] = useState<any>();
  const [tongTienMatHang, setTongTienMatHang] = useState(0);

  const { data: dataKhos } = useKhos();
  const { data: dataDaiLys } = useDaiLys();
  const { data: dataHangHoas } = useHangHoaByIdNcc(idSelectedNcc);
  const { data: dataPhieuKiemKes } = usePhieuKiemKes();
  const { data: dataPhieuKiemKeHangHoa } = usePhieuKiemKeHangHoa(
    dataSelected?.id || 1
  );
  const { mutate: mutateAdd } = useAddPhieuXuat();
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataPhieuKiemKeHangHoa) {
      let tong = 0;
      dataPhieuKiemKeHangHoa?.dsHangHoa?.forEach((item: any) => {
        tong += item.dongia * item.soluong;
      });
      setTongTien(tong);
    }
  }, [dataPhieuKiemKeHangHoa]);
  useEffect(() => {
    let tong = 0;
    tableData.forEach((item) => {
      tong += item.thanhtien;
    });
    setTongTienMatHang(tong);
  }, [tableData]);

  const handleOkAddModal = () => {
    var data = {
      ngayxuat: new Date().toISOString().split("T")[0],
      idDaily: idSelectedNcc,
      idKho: idSelectedKho,
      idNvien: 1,
      hanghoas: tableData.map((item) => {
        return {
          idHanghoa: item.id,
          dongia: item.dongia,
          soluong: item.soluong,
        };
      }),
    };
    mutateAdd(data);
    setAddModal(false);
  };
  const handleCancelAddModal = () => {
    setAddModal(false);
  };
  const handleChangeKho = (value: string) => {
    setIdSelectedKho(value);
  };
  const handleChangeNcc = (value: string) => {
    setIdSelectedNcc(value);
    setTableData([]);
    form.resetFields();
  };
  const onChangeMatHang = (value: string, data: any) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ id: value, ten: data?.label });
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div style={{ padding: 20 }}>
      <Row justify={"space-between"} gutter={[20, 20]}>
        <Col>
          <h2>QUẢN LÝ PHIẾU KIỂM KÊ</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={() => {
              setAddModal(true);
              setTableData([]);
            }}
          >
            Thêm phiếu kiểm kê{" "}
          </Button>
        </Col>
      </Row>
      <PKKTable
        data={dataPhieuKiemKes}
        setVisible={setVisible}
        setDataSelected={setDataSelected}
      />
      {visible && (
        <Modal
          title={"Thông tin phiếu kiểm kê"}
          visible={visible}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={false}
        >
          <Row>
            <Col span={12}>
              <Row>Mã phiếu kiểm kê: {dataSelected?.id}</Row>
            </Col>
            <Col span={12}>
              <Row>Ngày lập: {dataSelected?.ngaykiemke}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                Người lập phiếu: {dataPhieuKiemKeHangHoa?.nhanvien?.ten}
              </Row>
            </Col>
            <Col span={12}>
              <Row>Mã NV: {dataPhieuKiemKeHangHoa?.nhanvien?.id}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Địa chỉ: {dataPhieuKiemKeHangHoa?.kho?.diachi}</Row>
            </Col>
          </Row>
          <HHKKTable data={dataPhieuKiemKeHangHoa?.dsHangHoa} />
        </Modal>
      )}
      {addModal && (
        <Modal
          title={"Thêm phiếu xuất"}
          visible={addModal}
          onCancel={handleCancelAddModal}
          onOk={handleOkAddModal}
          width={1000}
          footer={[
            <Button key="cancel" onClick={handleCancelAddModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleOkAddModal}>
              OK
            </Button>,
          ]}
        >
          <Row>
            <Col span={10}>
              <Row>Kho</Row>
              <Row>
                <Col span={24}>
                  <Select
                    style={{ width: 350 }}
                    onChange={handleChangeKho}
                    options={dataKhos?.map((item: any) => {
                      return { value: item.id, label: item.ten };
                    })}
                    placeholder="Chọn kho"
                  />
                </Col>
              </Row>
              <Row>Đại lý</Row>
              <Row>
                <Col span={24}>
                  <Select
                    style={{ width: 350 }}
                    onChange={handleChangeNcc}
                    options={dataDaiLys?.map((item: any) => {
                      return { value: item.id, label: item.ten };
                    })}
                    placeholder="Chọn đại lý"
                  />
                </Col>
              </Row>
              <Row>Mặt hàng</Row>
              <Row>
                <Select
                  showSearch
                  placeholder="Chọn mặt hàng"
                  optionFilterProp="children"
                  onChange={onChangeMatHang}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={dataHangHoas?.map((item: any) => {
                    return {
                      value: item.id,
                      label: item.ten,
                    };
                  })}
                  style={{ width: 350 }}
                />
              </Row>
              <Row>
                <Form
                  form={form}
                  onFinish={(values) => {
                    if (tableData.find((item) => item.id === values.id)) {
                      message.error("Mặt hàng đã tồn tại!");
                    } else {
                      values.thanhtien = values.dongia * values.soluong;
                      tableData.push(values);
                      setTableData([...tableData]);
                      form.resetFields(["dongia", "soluong"]);
                    }
                  }}
                >
                  <Form.Item
                    label="Mã mặt hàng"
                    name="id"
                    style={{ marginTop: 20 }}
                  >
                    <Input disabled style={{ width: 250 }} />
                  </Form.Item>
                  <Form.Item label="Tên mặt hàng" name="ten">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Đơn giá"
                    name="dongia"
                    rules={[
                      { required: true, message: "Vui lòng nhập đơn giá!" },
                    ]}
                  >
                    <InputNumber style={{ width: 200 }} />
                  </Form.Item>
                  <Form.Item
                    label="Số lượng"
                    name="soluong"
                    rules={[
                      { required: true, message: "Vui lòng nhập số lượng!" },
                    ]}
                  >
                    <InputNumber style={{ width: 200 }} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>
            <Col span={14}>
              <HHTableAdd
                data={tableData}
                tableData={tableData}
                setTableData={setTableData}
              />
              <Row>Tổng tiền mặt hàng: {tongTienMatHang}</Row>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};
