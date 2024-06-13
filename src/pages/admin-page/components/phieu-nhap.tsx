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
import { PNTable } from "../tables/pn-table";
import {
  useAddPhieuNhap,
  useHangHoaByIdNcc,
  useKhos,
  useNhaCungCaps,
  usePhieuNhapHangHoa,
  usePhieuNhaps,
} from "../admin.loader";
import { useEffect, useState } from "react";
import { HHTable } from "../tables/hh-table";
import { HHTableAdd } from "../tables/hh-table-add";

export const PhieuNhap = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [tongTien, setTongTien] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [idSelectedNcc, setIdSelectedNcc] = useState<any>();
  const [idSelectedKho, setIdSelectedKho] = useState<any>();
  const [tongTienMatHang, setTongTienMatHang] = useState(0);

  const { data: dataKhos } = useKhos();
  const { data: dataNhaCungCaps } = useNhaCungCaps();
  const { data: dataHangHoas } = useHangHoaByIdNcc(idSelectedNcc);
  const { data: dataPhieuNhaps } = usePhieuNhaps();
  const { data: dataPhieuNhapHangHoa } = usePhieuNhapHangHoa(
    dataSelected?.id || 1
  );
  const { mutate: mutateAdd } = useAddPhieuNhap();
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataPhieuNhapHangHoa) {
      let tong = 0;
      dataPhieuNhapHangHoa?.dsHangHoa?.forEach((item: any) => {
        tong += item.dongia * item.soluong;
      });
      setTongTien(tong);
    }
  }, [dataPhieuNhapHangHoa]);
  useEffect(() => {
    let tong = 0;
    tableData.forEach((item) => {
      tong += item.thanhtien;
    });
    setTongTienMatHang(tong);
  }, [tableData]);

  const handleOkAddModal = () => {
    var data = {
      ngaynhap: new Date().toISOString().split("T")[0],
      idNcc: idSelectedNcc,
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
          <h2>QUẢN LÝ PHIẾU NHẬP</h2>
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
            Thêm phiếu nhập
          </Button>
        </Col>
      </Row>
      <PNTable
        data={dataPhieuNhaps}
        setVisible={setVisible}
        setDataSelected={setDataSelected}
      />
      {visible && (
        <Modal
          title={"Thông tin phiếu nhập"}
          visible={visible}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={false}
        >
          <Row>
            <Col span={12}>
              <Row>Mã phiếu nhập: {dataSelected?.id}</Row>
            </Col>
            <Col span={12}>
              <Row>Ngày lập: {dataSelected?.ngaynhap}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Người lập phiếu: {dataPhieuNhapHangHoa?.nhanvien?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>Mã NV: {dataPhieuNhapHangHoa?.nhanvien?.id}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Nhà cung cấp: {dataPhieuNhapHangHoa?.nhacungcap?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>SĐT: {dataPhieuNhapHangHoa?.nhacungcap?.sdt}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Kho: {dataPhieuNhapHangHoa?.kho?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>Địa chỉ: {dataPhieuNhapHangHoa?.kho?.diachi}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Tổng tiền: {tongTien}</Row>
            </Col>
          </Row>
          <HHTable data={dataPhieuNhapHangHoa?.dsHangHoa} />
        </Modal>
      )}
      {addModal && (
        <Modal
          title={"Thêm phiếu nhập"}
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
              <Row>Nhà cung cấp</Row>
              <Row>
                <Col span={24}>
                  <Select
                    style={{ width: 350 }}
                    onChange={handleChangeNcc}
                    options={dataNhaCungCaps?.map((item: any) => {
                      return { value: item.id, label: item.ten };
                    })}
                    placeholder="Chọn nhà cung cấp"
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
