import { apiClient } from "../utils/api";

//get
export const getPhieuNhaps = async () => {
  const result = await apiClient.get("/phieunhaps");
  return result.data;
};
export const getPhieuXuats = async () => {
  const result = await apiClient.get("/phieuxuats");
  return result.data;
};
export const getPhieuKiemKes = async () => {
  const result = await apiClient.get("/phieukiemkes");
  return result.data;
};
export const getPhieuBaoCaos = async () => {
  const result = await apiClient.get("/phieubaocaos");
  return result.data;
};

export const getPhieuNhapHangHoa = async (id: any) => {
  const result = await apiClient.get(`/phieunhaphanghoas/${id}`);
  return result.data;
};
export const getPhieuXuatHangHoa = async (id: any) => {
  const result = await apiClient.get(`/phieuxuat_hanghoas/${id}`);
  return result.data;
};
export const getPhieuKiemKeHangHoa = async (id: any) => {
  const result = await apiClient.get(`/phieukiemke_hanghoas/${id}`);
  return result.data;
};
export const getPhieuBaoCaoHangHoa = async (id: any) => {
  const result = await apiClient.get(`/phieubaocao_hanghoas/${id}`);
  return result.data;
};

export const getKhos = async () => {
  const result = await apiClient.get("/khos");
  return result.data;
};
export const getNhaCungCaps = async () => {
  const result = await apiClient.get("/nhacungcaps");
  return result.data;
};
export const getDaiLys = async () => {
  const result = await apiClient.get("/dailys");
  return result.data;
};
export const getHangHoaByIdNcc = async (idNcc: any) => {
  const result = await apiClient.get(`/hanghoas-by-idNcc/${idNcc}`);
  return result.data;
};
export const getHangHoaByIdKho = async (idKho: any) => {
  const result = await apiClient.get(`/hanghoas-by-idKho/${idKho}`);
  return result.data;
};

//post
export const addPhieuNhap = async (data: any) => {
  const result = await apiClient.post("/phieunhaps", data);
  return result.data;
};
export const addPhieuXuat = async (data: any) => {
  const result = await apiClient.post("/phieuxuats", data);
  return result.data;
};

export const checkLogin = async (data: any) => {
  const result = await apiClient.post("/api/login", data);
  return result.data;
};
export const addCustomer = async (data: any) => {
  const result = await apiClient.post("/api/create-customer", data);
  return result.data;
};
export const ocrImage = async (data: any) => {
  const result = await apiClient.post("/api/ocr-image", data);
  return result.data;
};

// put
export const updateCustomer = async (data: any) => {
  const result = await apiClient.put(`/api/update-customer/${data._id}`, data);
  return result.data;
};

// delete
export const deleteCustomer = async (id: any) => {
  const result = await apiClient.delete(`/api/delete-customer/${id}`);
  return result.data;
};
