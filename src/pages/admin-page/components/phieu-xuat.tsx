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
import { PXTable } from "../tables/px-table";
import {
  useAddPhieuXuat,
  useDaiLys,
  useHangHoaByIdKho,
  useKhos,
  usePhieuXuatHangHoa,
  usePhieuXuats,
} from "../admin.loader";
import { useEffect, useState } from "react";
import { HHTable } from "../tables/hh-table";
import { HHTableAdd } from "../tables/hh-table-add";

export const PhieuXuat = () => {
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
  const { data: dataHangHoas } = useHangHoaByIdKho(idSelectedKho);
  const { data: dataPhieuXuats } = usePhieuXuats();
  const { data: dataPhieuXuatHangHoa } = usePhieuXuatHangHoa(
    dataSelected?.id || 1
  );
  const { mutate: mutateAdd } = useAddPhieuXuat();
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataPhieuXuatHangHoa) {
      let tong = 0;
      dataPhieuXuatHangHoa?.dsHangHoa?.forEach((item: any) => {
        tong += item.dongia * item.soluong;
      });
      setTongTien(tong);
    }
  }, [dataPhieuXuatHangHoa]);
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
    setTableData([]);
    form.resetFields();
  };
  const handleChangeNcc = (value: string) => {
    setIdSelectedNcc(value);
  };
  const onChangeMatHang = (value: string, data: any) => {
    form.setFieldsValue({
      id: value,
      ten: data?.label,
      soluongton: data?.soluongton,
    });
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
          <h2>QUẢN LÝ PHIẾU XUẤT</h2>
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
            Thêm phiếu xuất{" "}
          </Button>
        </Col>
      </Row>
      <PXTable
        data={dataPhieuXuats}
        setVisible={setVisible}
        setDataSelected={setDataSelected}
      />
      {visible && (
        <Modal
          title={"Thông tin phiếu xuất"}
          visible={visible}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={false}
        >
          <Row>
            <Col span={12}>
              <Row>Mã phiếu xuất: {dataSelected?.id}</Row>
            </Col>
            <Col span={12}>
              <Row>Ngày lập: {dataSelected?.ngayxuat}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Người lập phiếu: {dataPhieuXuatHangHoa?.nhanvien?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>Mã NV: {dataPhieuXuatHangHoa?.nhanvien?.id}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Đại lý: {dataPhieuXuatHangHoa?.daily?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>SĐT: {dataPhieuXuatHangHoa?.daily?.sdt}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Kho: {dataPhieuXuatHangHoa?.kho?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>Địa chỉ: {dataPhieuXuatHangHoa?.kho?.diachi}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Tổng tiền: {tongTien}</Row>
            </Col>
          </Row>
          <HHTable data={dataPhieuXuatHangHoa?.dsHangHoa} />
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
                      soluongton: item.soluongton,
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
                    } else if (values.soluongton == 0) {
                      message.error("Mặt hàng đã hết hàng!");
                    } else if (values.soluong <= 0) {
                      message.error("Số lượng phải lớn hơn 0!");
                    } else if (values.soluong > values.soluongton) {
                      message.error("Số lượng vượt quá số lượng tồn!");
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
                  <Form.Item label="Còn lại" name="soluongton">
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
