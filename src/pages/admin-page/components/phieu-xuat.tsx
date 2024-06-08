import { Button, Col, Modal, Row } from "antd";
import { PXTable } from "../tables/px-table";
import { usePhieuXuatHangHoa, usePhieuXuats } from "../admin.loader";
import { useEffect, useState } from "react";
import { HHTable } from "../tables/hh-table";

export const PhieuXuat = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [tongTien, setTongTien] = useState(0);

  const { data: dataPhieuXuats } = usePhieuXuats();
  const { data: dataPhieuXuatHangHoa } = usePhieuXuatHangHoa(
    dataSelected?.id || 1
  );
  useEffect(() => {
    if (dataPhieuXuatHangHoa) {
      let tong = 0;
      dataPhieuXuatHangHoa?.dsHangHoa?.forEach((item: any) => {
        tong += item.dongia * item.soluong;
      });
      setTongTien(tong);
    }
  }, [dataPhieuXuatHangHoa]);
  return (
    <div style={{ padding: 20 }}>
      <Row justify={"space-between"} gutter={[20, 20]}>
        <Col>
          <h2>QUẢN LÝ PHIẾU XUẤT</h2>
        </Col>
        <Col>
          <Button type="primary" style={{ marginBottom: 20 }}>
            Thêm khách hàng{" "}
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
              <Row>Địa chỉ: {dataPhieuXuatHangHoa?.kho?.diachi}</Row>
            </Col>
            <Col span={12}>
              <Row>Tổng tiền: {tongTien}</Row>
            </Col>
          </Row>
          <HHTable data={dataPhieuXuatHangHoa?.dsHangHoa} />
        </Modal>
      )}
      {/* <Modal
        title={
          optionModal === "Add" ? "Thêm khách hàng" : "Sửa thông tin khách hàng"
        }
        visible={addModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Button
          type="primary"
          onClick={handleOpenModalCccc}
          style={{ margin: "10px 0 30px 0" }}
        >
          Thêm bằng thẻ căn cước công dân
        </Button>
        <Form form={form}>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập fullname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
          >
            <Select
              placeholder={"Chọn giới tính"}
              options={["Nam", "Nữ"].map((item) => {
                return { label: item, value: item };
              })}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="date_of_birth"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker
              format={["DD/MM/YYYY", "DD/MM/YYYY"]}
              placeholder={"Chọn ngày sinh"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Loại xe" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Số khung" name="cccd">
            <Input />
          </Form.Item>
          <Form.Item label="Số máy" name="nationality">
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};
