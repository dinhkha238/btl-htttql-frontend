import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Modal,
  Row,
  Select,
} from "antd";
import {
  useAddPhieuBaoCao,
  useHangHoaByIdKhoForBaoCao,
  useKhos,
  usePhieuBaoCaoHangHoa,
  usePhieuBaoCaos,
} from "../admin.loader";
import { useEffect, useState } from "react";
import { HHBCTable } from "../tables/hhbc-table";
import { PBCAddTable, PBCTable } from "../tables/pbc-table";

export const PhieuBaoCao = () => {
  const [visible, setVisible] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [tongTien, setTongTien] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [idSelectedKho, setIdSelectedKho] = useState<any>();
  const [tongTienMatHang, setTongTienMatHang] = useState(0);
  const [dataBaoCao, setDataBaoCao] = useState<any>({});
  const [yearMonth, setYearMonth] = useState<any>();

  const { data: dataKhos } = useKhos();
  const { data: dataHangHoas } = useHangHoaByIdKhoForBaoCao(dataBaoCao);
  const { data: dataPhieuBaoCaos } = usePhieuBaoCaos();
  const { data: dataPhieuBaoCaoHangHoa } = usePhieuBaoCaoHangHoa(
    dataSelected?.id || 1
  );

  const { mutate: mutateAdd } = useAddPhieuBaoCao();

  useEffect(() => {
    if (dataPhieuBaoCaoHangHoa) {
      let tong = 0;
      dataPhieuBaoCaoHangHoa?.dsHangHoa?.forEach((item: any) => {
        tong += item.tongtien;
      });
      setTongTien(tong);
    }
  }, [dataPhieuBaoCaoHangHoa]);
  useEffect(() => {
    if (dataHangHoas) {
      setTableData(
        dataHangHoas.map((item: any) => {
          return {
            id: item.id,
            ten: item.ten,
            soluongxuat: item.soluongxuat,
            doanhthu: item.doanhthu,
            ngayxuat: item.ngayxuat,
          };
        })
      );
    }
  }, [dataHangHoas]);

  useEffect(() => {
    let tong = 0;
    tableData.forEach((item) => {
      tong += item.doanhthu;
    });
    setTongTienMatHang(tong);
  }, [tableData]);

  const handleOkAddModal = () => {
    var data = {
      ngaybaocao: new Date().toISOString().split("T")[0],
      idKho: idSelectedKho,
      idNvien: 1,
      hanghoas: tableData.map((item) => {
        return {
          idHanghoa: item.id,
          slban: item.soluongxuat,
          tongtien: item.doanhthu,
          ngayxuat: item.ngayxuat,
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

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setYearMonth(dateString);
  };
  return (
    <div style={{ padding: 20 }}>
      <Row justify={"space-between"} gutter={[20, 20]}>
        <Col>
          <h2>QUẢN LÝ PHIẾU BÁO CÁO</h2>
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
            Thêm phiếu báo cáo{" "}
          </Button>
        </Col>
      </Row>
      <PBCTable
        data={dataPhieuBaoCaos}
        setVisible={setVisible}
        setDataSelected={setDataSelected}
      />
      {visible && (
        <Modal
          title={"Thông tin phiếu báo cáo"}
          visible={visible}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={false}
        >
          <Row>
            <Col span={12}>
              <Row>Mã phiếu báo cáo: {dataSelected?.id}</Row>
            </Col>
            <Col span={12}>
              <Row>Ngày lập: {dataSelected?.ngaybaocao}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                Người lập phiếu: {dataPhieuBaoCaoHangHoa?.nhanvien?.ten}
              </Row>
            </Col>
            <Col span={12}>
              <Row>Mã NV: {dataPhieuBaoCaoHangHoa?.nhanvien?.id}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Kho: {dataPhieuBaoCaoHangHoa?.kho?.ten}</Row>
            </Col>
            <Col span={12}>
              <Row>Địa chỉ: {dataPhieuBaoCaoHangHoa?.kho?.diachi}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Tổng tiền: {tongTien}</Row>
            </Col>
          </Row>
          <HHBCTable data={dataPhieuBaoCaoHangHoa?.dsHangHoa} />
        </Modal>
      )}
      {addModal && (
        <Modal
          title={"Thêm phiếu báo cáo"}
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
              <Row>
                <Col>
                  <Row>Kho</Row>
                  <Row>
                    <Select
                      style={{ width: 300 }}
                      onChange={handleChangeKho}
                      options={dataKhos?.map((item: any) => {
                        return { value: item.id, label: item.ten };
                      })}
                      placeholder="Chọn kho"
                    />
                  </Row>
                </Col>
                <Col style={{ margin: "0 20px" }}>
                  <Row>Thời gian</Row>
                  <Row>
                    <DatePicker onChange={onChange} picker="month" />
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Button
                      type="primary"
                      onClick={() => {
                        setDataBaoCao({
                          idKho: idSelectedKho,
                          year_month: yearMonth,
                        });
                      }}
                      style={{ marginTop: 23 }}
                    >
                      Thêm
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <PBCAddTable
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
