import { useQuery } from "react-query";
import {
  getPhieuBaoCaoHangHoa,
  getPhieuBaoCaos,
  getPhieuKiemKeHangHoa,
  getPhieuKiemKes,
  getPhieuNhapHangHoa,
  getPhieuNhaps,
  getPhieuXuatHangHoa,
  getPhieuXuats,
} from "../../services/admin.service";

export const CACHE_KEYS = {
  InforPhieuNhaps: "InforPhieuNhaps",
  InforPhieuNhapHangHoa: "InforPhieuNhapHangHoa",
  InforPhieuXuats: "InforPhieuXuats",
  InforPhieuXuatHangHoa: "InforPhieuXuatHangHoa",
  InforPhieuKiemKes: "InforPhieuKiemKes",
  InforPhieuKiemKeHangHoa: "InforPhieuKiemKeHangHoa",
  InforPhieuBaoCaos: "InforPhieuBaoCaos",
  InforPhieuBaoCaoHangHoa: "InforPhieuBaoCaoHangHoa",
};

export const usePhieuNhaps = () => {
  return useQuery(CACHE_KEYS.InforPhieuNhaps, () => getPhieuNhaps());
};
export const usePhieuNhapHangHoa = (id: any) => {
  return useQuery([CACHE_KEYS.InforPhieuNhapHangHoa, id], () =>
    getPhieuNhapHangHoa(id)
  );
};
export const usePhieuXuats = () => {
  return useQuery(CACHE_KEYS.InforPhieuXuats, () => getPhieuXuats());
};
export const usePhieuXuatHangHoa = (id: any) => {
  return useQuery([CACHE_KEYS.InforPhieuXuatHangHoa, id], () =>
    getPhieuXuatHangHoa(id)
  );
};
export const usePhieuKiemKes = () => {
  return useQuery(CACHE_KEYS.InforPhieuKiemKes, () => getPhieuKiemKes());
};
export const usePhieuKiemKeHangHoa = (id: any) => {
  return useQuery([CACHE_KEYS.InforPhieuKiemKeHangHoa, id], () =>
    getPhieuKiemKeHangHoa(id)
  );
};
export const usePhieuBaoCaos = () => {
  return useQuery(CACHE_KEYS.InforPhieuBaoCaos, () => getPhieuBaoCaos());
};
export const usePhieuBaoCaoHangHoa = (id: any) => {
  return useQuery([CACHE_KEYS.InforPhieuBaoCaoHangHoa, id], () =>
    getPhieuBaoCaoHangHoa(id)
  );
};

// export const useAddUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation((data: any) => {
//       return addCustomer(data)
//     },
//     {
//       onSuccess:() => {
//         queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
//         message.success("Add customer success")
//       },
//       onError:(data:any) => {
//         if(data?.response?.status === 409){ // 409 Conflict
//           message.error("Customer already exists")}
//         else {
//           message.error("Add customer failed")
//         }
//       }
//     }
//     )
//   }

// export const useUpdateUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation((data: any) => {
//       return updateCustomer(data)
//     },
//     {
//       onSuccess:() => {
//         queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
//         message.success("Update customer success")
//       },
//       onError:() => {
//         message.error("Update customer failed")
//       }
//     }
//     )
//   }
//   export const useDeleteUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation((id: any) => {
//       return deleteCustomer(id)
//     },
//     {
//       onSuccess:() => {
//         queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
//         message.success("Delete customer success")
//       },
//       onError:() => {
//         message.error("Delete customer failed")
//       }
//     }
//     )
//   }
//   export const useOcrImage = () => {
//     return useMutation((data: any) => {
//       return ocrImage(data)
//     },
//     {
//       onSuccess:() => {
//         message.success("Nhận dạng thành công")
//       },
//       onError:() => {
//         message.error("Nhận dạng thất bại")
//       }
//     }
//     )
//   }
