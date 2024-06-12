import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { HHKKAddTable, PKKTable } from "../tables/pkk-table";
import {
  useAddPhieuKiemKe,
  useHangHoaByIdKho,
  useKhos,
  usePhieuKiemKeHangHoa,
  usePhieuKiemKes,
} from "../admin.loader";
import { useState } from "react";
import { HHKKTable } from "../tables/hhkk-table";

export const PhieuKiemKe = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [idSelectedKho, setIdSelectedKho] = useState<any>();

  const { data: dataKhos } = useKhos();
  const { data: dataHangHoas } = useHangHoaByIdKho(idSelectedKho);
  const { data: dataPhieuKiemKes } = usePhieuKiemKes();
  const { data: dataPhieuKiemKeHangHoa } = usePhieuKiemKeHangHoa(
    dataSelected?.id || 1
  );
  const { mutate: mutateAdd } = useAddPhieuKiemKe();
  const [form] = Form.useForm();

  const handleOkAddModal = () => {
    var data = {
      ngaykiemke: new Date().toISOString().split("T")[0],
      idKho: idSelectedKho,
      idNvien: 1,
      hanghoas: tableData.map((item) => {
        return {
          idHanghoa: item.id,
          soluong: item.soluongton,
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
  const onChangeMatHang = (value: string, data: any) => {
    console.log(`selected ${value}`);
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
          title={"Thêm phiếu kiểm kê"}
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
                    tableData.push(values);
                    setTableData([...tableData]);
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
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>
            <Col span={14}>
              <HHKKAddTable
                data={tableData}
                tableData={tableData}
                setTableData={setTableData}
              />
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};
