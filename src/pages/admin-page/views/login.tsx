import { Input, Button, Form, message, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

export const LayoutAdmin = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (values.username === "admin" && values.password === "admin") {
      localStorage.setItem("loginAdmin", "true");
      navigate("/");
      message.success("Đăng nhập thành công");
    } else {
      message.error("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <>
      <Col span={24}>
        <Row justify={"center"}>
          <Form
            name="login-form"
            onFinish={onFinish}
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "#f0f2f5",
              borderRadius: 8,
              marginTop: 150,
            }}
          >
            <h1 style={{ textAlign: "center", marginBottom: 24 }}>Login</h1>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </>
  );
};
