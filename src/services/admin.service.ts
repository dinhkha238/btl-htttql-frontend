import { apiClient } from "../utils/api";

//get
export const getCustomers = async () => {
    const result = await apiClient.get("/api/list-customers");
    return result.data;
}

export const getCustomer = async () => {
    const result = await apiClient.get("/api/get-customer");
    return result.data;
}

//post
export const checkLogin = async (data:any) => {
    const result = await apiClient.post("/api/login",data);
    return result.data;
}
export const addCustomer = async (data:any) => {
    const result = await apiClient.post("/api/create-customer",data);
    return result.data;
}

// put
export const updateCustomer = async (data:any) => {
    const result = await apiClient.put(`/api/update-customer/${data._id}`,data);
    return result.data;
}
    

// delete
export const deleteCustomer = async (id:any) => {
    const result = await apiClient.delete(`/api/delete-customer/${id}`);
    return result.data;
}

