import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { HHKKAddTable, PKKTable } from "../tables/pkk-table";
import {
  useAddPhieuKiemKe,
  useHangHoaByIdKho,
  useKhos,
  usePhieuKiemKeHangHoa,
  usePhieuKiemKes,
} from "../admin.loader";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (dataHangHoas) {
      setTableData(
        dataHangHoas.map((item: any) => {
          return {
            id: item.id,
            ten: item.ten,
            soluongton: item.soluongton,
          };
        })
      );
    }
  }, [dataHangHoas]);

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
              <Row>Kho: {dataPhieuKiemKeHangHoa?.kho?.ten}</Row>
            </Col>
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
            <Col span={24}>
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
              <HHKKAddTable
                data={tableData}
                tableData={tableData}
                setTableData={setTableData}
              />
            </Col>
            <Col span={14}></Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};
