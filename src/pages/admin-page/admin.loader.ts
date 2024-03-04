import { message } from "antd";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { addCustomer, deleteCustomer, getCustomers, ocrImage, updateCustomer } from "../../services/admin.service";

export const CACHE_KEYS = {
    InforCustomer: "INFOR_CUSTOMER",
    InforCustomers: "INFOR_CUSTOMERS",
  }

export const useCustomers =  () => {
    return useQuery(CACHE_KEYS.InforCustomers, () => getCustomers());
}
export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => {
      return addCustomer(data)
    },
    {
      onSuccess:() => {
        queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
        message.success("Add customer success")
      },
      onError:() => {
        message.error("Add customer failed")
      }
    }
    )
  }
  
  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => {
      return updateCustomer(data)
    },
    {
      onSuccess:() => {
        queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
        message.success("Update customer success")
      },
      onError:() => {
        message.error("Update customer failed")
      }
    }
    )
  }
  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation((id: any) => {
      return deleteCustomer(id)
    },
    {
      onSuccess:() => {
        queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
        message.success("Delete customer success")
      },
      onError:() => {
        message.error("Delete customer failed")
      }
    }
    )
  }
  export const useOcrImage = () => {
    return useMutation((data: any) => {
      return ocrImage(data)
    },
    {
      onSuccess:() => {
        message.success("Nhận dạng thành công")
      },
      onError:() => {
        message.error("Nhận dạng thất bại")
      }
    }
    )
  }