import {
  useCustomers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
  useOcrImage,
} from "../admin.loader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Image,
  DatePicker,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Customer = () => {
  const { data: dataCustomers } = useCustomers();
  const [optionModal, setOptionModal] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalCccd, setModalCccd] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [imageFileFront, setImageFileFront] = useState("");
  const [imageFileBack, setImageFileBack] = useState("");
  const [imageDataFront, setImageDataFront] = useState(null);
  const [imageDataBack, setImageDataBack] = useState(null);

  const { mutate: mutateAddUser } = useAddUser();
  const { mutate: mutateUpdateUser } = useUpdateUser();
  const { mutate: mutateDeleteUser } = useDeleteUser();
  const {
    mutate: mutateOcrImage,
    data: dataOcrImage,
    isLoading: isLoadingOcrImage,
  } = useOcrImage();
  const [form] = Form.useForm();
  const [formCccc] = Form.useForm();
  //
  useEffect(() => {
    form.setFieldsValue({
      cccd: dataOcrImage?.data?.data?.front?.fields?.id_number,
      fullname: dataOcrImage?.data?.data?.front?.fields?.name,
      date_of_birth:
        dataOcrImage?.data?.data?.front?.fields?.birthday != undefined
          ? dayjs(
              dataOcrImage?.data?.data?.front?.fields?.birthday,
              "DD/MM/YYYY"
            )
          : null,
      gender: dataOcrImage?.data?.data?.front?.fields?.gender,
      address: dataOcrImage?.data?.data?.front?.fields?.home,
    });
  }, [dataOcrImage]);

  const showModal = () => {
    setOptionModal("Add");
    setVisible(true);
  };
  const handleOpenModalCccc = () => {
    setModalCccd(true);
    setImageFileFront("");
    setImageFileBack("");
    setImageDataFront(null);
    setImageDataBack(null);
    formCccc.resetFields();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleOkDelete = () => {
    mutateDeleteUser(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      width: 300,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      width: 200,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 200,
    },
    {
      title: "Số CCCD",
      dataIndex: "cccd",
      width: 200,
    },
    {
      title: "Quốc tịch",
      dataIndex: "nationality",
      width: 200,
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      width: 200,
      render: (_: any, data: any) => {
        return (
          <div>
            <EditOutlined
              style={{ paddingRight: 8, color: "blue" }}
              onClick={handleEdit}
            />
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );
        function handleEdit() {
          setOptionModal("Edit");
          setVisible(true);
          setIdSelected(data.id);
          data.date_of_birth = dayjs(data.date_of_birth, "DD/MM/YYYY");
          form.setFieldsValue(data);
        }
        function handleDelete() {
          setIsModalOpen(true);
          setIdSelected(data.id);
          setUserSelected(data.email);
        }
      },
    },
  ];
  const handleOk = () => {
    // Xử lý khi khách hàng ấn OK
    if (optionModal === "Add") {
      form
        .validateFields()
        .then((values) => {
          values.date_of_birth = formatDate(values?.date_of_birth);
          mutateAddUser(values);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    } else {
      form
        .validateFields()
        .then((values) => {
          var a = { ...values, _id: idSelected };
          mutateUpdateUser(a);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    }
  };

  const handleCancel = () => {
    // Xử lý khi khách hàng ấn Hủy
    form.resetFields();
    setVisible(false);
  };
  const handleCancelModalCccc = () => {
    // Xử lý khi khách hàng ấn Hủy
    formCccc.resetFields();
    setImageDataBack(null);
    setImageDataFront(null);
    setModalCccd(false);
  };
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>DANH SÁCH KHÁCH HÀNG</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} style={{ margin: 20 }}>
            Thêm khách hàng{" "}
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataCustomers} columns={columns} />;
      <Modal
        title={
          optionModal === "Add" ? "Thêm khách hàng" : "Sửa thông tin khách hàng"
        }
        visible={visible}
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
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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
          <Form.Item label="Căn cước công dân" name="cccd">
            <Input />
          </Form.Item>

          <Form.Item label="Quốc tịch" name="nationality">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"Upload ảnh thẻ căn cước công dân"}
        visible={modalCccd}
        onCancel={handleCancelModalCccc}
        onOk={handleOCR}
        footer={[
          <Button key="cancel" onClick={handleCancelModalCccc}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOCR}>
            OK
          </Button>,
        ]}
      >
        <Form form={formCccc}>
          <Form.Item
            name="image_front"
            label="Ảnh mặt trước cccd"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ảnh mặt trước cccd!",
              },
            ]}
          >
            <Col>
              <Row>
                <input
                  type="file"
                  id="file-upload"
                  required
                  onChange={handleFileUploadFront}
                  onClick={() => setImageDataFront(null)}
                />

                {(imageDataFront || formCccc.getFieldValue("image")) && (
                  <div>
                    <Image
                      src={
                        imageDataFront
                          ? imageDataFront
                          : formCccc.getFieldValue("image")
                      }
                      alt="Uploaded Image"
                      width={100}
                      preview={false}
                    />
                  </div>
                )}
              </Row>
            </Col>
          </Form.Item>
          <Form.Item
            name="image_back"
            label="Ảnh mặt sau cccd"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ảnh mặt sau cccd!",
              },
            ]}
          >
            <Col>
              <Row>
                <input
                  type="file"
                  id="file-upload"
                  required
                  onChange={handleFileUploadBack}
                  onClick={() => setImageDataBack(null)}
                />

                {(imageDataBack || formCccc.getFieldValue("image")) && (
                  <div>
                    <Image
                      src={
                        imageDataBack
                          ? imageDataBack
                          : formCccc.getFieldValue("image")
                      }
                      alt="Uploaded Image"
                      width={100}
                      preview={false}
                    />
                  </div>
                )}
              </Row>
            </Col>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xóa khách hàng"
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Alert
          message={
            <p>
              Bạn có chắc chắn muốn xóa khách hàng "<b>{userSelected}</b>"
              không?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
      <Modal
        open={isLoadingOcrImage}
        footer={null}
        closable={false}
        centered
        width={250}
      >
        <h4>Đang xử lý, vui lòng chờ trong giây lát ...</h4>
      </Modal>
    </div>
  );
  function handleFileUploadFront(event: any) {
    const file = event.target.files[0];
    setImageFileFront(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageDataURL = e.target.result;
        setImageDataFront(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  }
  function handleFileUploadBack(event: any) {
    const file = event.target.files[0];
    setImageFileBack(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageDataURL = e.target.result;
        setImageDataBack(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  }
  function handleOCR() {
    setModalCccd(false);
    var bodyFormData = new FormData();
    bodyFormData.append("image_front", imageFileFront || "");
    bodyFormData.append("image_back", imageFileBack || "");
    mutateOcrImage(bodyFormData);
  }
  function formatDate(inputDate: any) {
    // Chuyển chuỗi thành đối tượng Date
    var dateObject = new Date(inputDate);
    // Lấy ngày, tháng và năm
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0 nên phải cộng thêm 1
    var year = dateObject.getFullYear();

    // Định dạng lại ngày theo "dd/mm/yyyy"
    var formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;
    return formattedDate;
  }
};
