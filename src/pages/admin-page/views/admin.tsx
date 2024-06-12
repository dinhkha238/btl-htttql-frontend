import { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import { PhieuNhap } from "../components/phieu-nhap";
import { Navigate, useNavigate } from "react-router-dom";
import { PhieuXuat } from "../components/phieu-xuat";
import { PhieuBaoCao } from "../components/phieu-bao-cao";
import { PhieuKiemKe } from "../components/phieu-kiem-ke";

export const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("qlpn");
  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key); // Cập nhật trạng thái khi mục SideNav được chọn
  };
  const [isAuthenticated] = useState(localStorage.getItem("loginAdmin"));
  return (
    <>
      {isAuthenticated == "true" ? (
        <Layout>
          <Row>
            <Col xl={4} xxl={3} lg={5} xs={0}>
              <Layout
                style={{
                  minHeight: "100vh",
                  position: "fixed",
                  top: 0,
                }}
              >
                <Sider>
                  <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={["qlpn"]}
                    onClick={handleMenuClick} //Gọi hàm xử lý khi click vào mục SideNav
                  >
                    <Menu.Item key="qlpn">Quản lý phiếu nhập</Menu.Item>
                    <Menu.Item key="qlpx">Quản lý phiếu xuất</Menu.Item>
                    <Menu.Item key="qlpkk">Quản lý phiếu kiểm kê</Menu.Item>
                    <Menu.Item key="qlpbc">Quản lý phiếu báo cáo</Menu.Item>
                    <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
                  </Menu>
                </Sider>
              </Layout>
            </Col>
            <Col xl={20} xxl={21} lg={19} xs={24}>
              {selectedMenu === "qlpn" && <PhieuNhap />}
              {selectedMenu === "qlpx" && <PhieuXuat />}
              {selectedMenu === "qlpbc" && <PhieuBaoCao />}
              {selectedMenu === "qlpkk" && <PhieuKiemKe />}
            </Col>
          </Row>
        </Layout>
      ) : (
        <Navigate to="/login-admin" />
      )}
    </>
  );
  function handleLogout() {
    localStorage.removeItem("loginAdmin");
    navigate("/login-admin");
  }
};
