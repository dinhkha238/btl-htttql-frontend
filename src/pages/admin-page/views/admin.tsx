import { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import { Customer } from "../components/customer";
import { Navigate, useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("users");
  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key); // Cập nhật trạng thái khi mục SideNav được chọn
  };
  const [isAuthenticated] = useState(localStorage.getItem("loginAdmin"));
  return (
    <>
      {isAuthenticated == "true" ? (
        <Row>
          <Col xl={4} xxl={3}>
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
                  defaultSelectedKeys={["users"]}
                  onClick={handleMenuClick} //Gọi hàm xử lý khi click vào mục SideNav
                >
                  <Menu.Item key="users">Quản lý khách hàng</Menu.Item>
                  <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
                </Menu>
              </Sider>
            </Layout>
          </Col>
          <Col xl={20} xxl={21}>
            {selectedMenu === "users" && <Customer />}
          </Col>
        </Row>
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
