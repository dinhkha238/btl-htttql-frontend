import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addPhieuBaoCao,
  addPhieuKiemKe,
  addPhieuNhap,
  addPhieuXuat,
  getDaiLys,
  getHangHoaByIdKho,
  getHangHoaByIdNcc,
  getHangHoaForPbchh,
  getKhos,
  getNhaCungCaps,
  getPhieuBaoCaoHangHoa,
  getPhieuBaoCaos,
  getPhieuKiemKeHangHoa,
  getPhieuKiemKes,
  getPhieuNhapHangHoa,
  getPhieuNhaps,
  getPhieuXuatHangHoa,
  getPhieuXuats,
} from "../../services/admin.service";
import { message } from "antd";

export const CACHE_KEYS = {
  InforPhieuNhaps: "InforPhieuNhaps",
  InforPhieuNhapHangHoa: "InforPhieuNhapHangHoa",
  InforPhieuXuats: "InforPhieuXuats",
  InforPhieuXuatHangHoa: "InforPhieuXuatHangHoa",
  InforPhieuKiemKes: "InforPhieuKiemKes",
  InforPhieuKiemKeHangHoa: "InforPhieuKiemKeHangHoa",
  InforPhieuBaoCaos: "InforPhieuBaoCaos",
  InforPhieuBaoCaoHangHoa: "InforPhieuBaoCaoHangHoa",
  InforKhos: "InforKhos",
  InforNhaCungCaps: "InforNhaCungCaps",
  InforDaiLys: "InforDaiLys",
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
export const useKhos = () => {
  return useQuery(CACHE_KEYS.InforKhos, () => getKhos());
};
export const useNhaCungCaps = () => {
  return useQuery(CACHE_KEYS.InforNhaCungCaps, () => getNhaCungCaps());
};
export const useDaiLys = () => {
  return useQuery(CACHE_KEYS.InforDaiLys, () => getDaiLys());
};
export const useHangHoaByIdNcc = (idNcc: any) => {
  return useQuery([CACHE_KEYS.InforNhaCungCaps, idNcc], () =>
    getHangHoaByIdNcc(idNcc)
  );
};
export const useHangHoaByIdKho = (idKho: any) => {
  return useQuery([CACHE_KEYS.InforKhos, idKho], () =>
    getHangHoaByIdKho(idKho)
  );
};
export const useHangHoaByIdKhoForBaoCao = (data: any) => {
  return useQuery([CACHE_KEYS.InforKhos, data], () => getHangHoaForPbchh(data));
};

export const useAddPhieuNhap = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addPhieuNhap(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforPhieuNhaps);
        message.success("Add success");
      },
      onError: () => {
        message.error("Add failed");
      },
    }
  );
};

export const useAddPhieuXuat = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addPhieuXuat(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforPhieuXuats);
        message.success("Add success");
      },
      onError: () => {
        message.error("Add failed");
      },
    }
  );
};
export const useAddPhieuKiemKe = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addPhieuKiemKe(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforPhieuKiemKes);
        message.success("Add success");
      },
      onError: () => {
        message.error("Add failed");
      },
    }
  );
};
export const useAddPhieuBaoCao = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addPhieuBaoCao(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforPhieuBaoCaos);
        message.success("Add success");
      },
      onError: () => {
        message.error("Add failed");
      },
    }
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
