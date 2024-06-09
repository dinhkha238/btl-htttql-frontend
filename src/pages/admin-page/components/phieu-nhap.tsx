import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { PNTable } from "../tables/pn-table";
import { usePhieuNhapHangHoa, usePhieuNhaps } from "../admin.loader";
import { useEffect, useState } from "react";
import { HHTable } from "../tables/hh-table";

export const PhieuNhap = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [tongTien, setTongTien] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const { data: dataPhieuNhaps } = usePhieuNhaps();
  const { data: dataPhieuNhapHangHoa } = usePhieuNhapHangHoa(
    dataSelected?.id || 1
  );
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

  const handleOkAddModal = () => {
    setAddModal(false);
  };
  const handleCancelAddModal = () => {
    setAddModal(false);
  };
  const handleChangeKho = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeNcc = (value: string) => {
    console.log(`selected ${value}`);
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
              <Row>Địa chỉ: {dataPhieuNhapHangHoa?.kho?.diachi}</Row>
            </Col>
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
            <Col span={12}>
              <Row>Kho</Row>
              <Row>
                <Col span={24}>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChangeKho}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </Col>
              </Row>
              <Row>Nhà cung cấp</Row>
              <Row>
                <Col span={24}>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChangeNcc}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
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
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </Row>
              <Row>
                <Form
                  form={form}
                  onFinish={(values) => {
                    console.log(values);
                  }}
                >
                  <Form.Item label="Mã mặt hàng" name="id">
                    <Input disabled />
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Số lượng"
                    name="soluong"
                    rules={[
                      { required: true, message: "Vui lòng nhập số lượng!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>
            <Col span={12}>
              <HHTable data={dataPhieuNhaps} />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};
