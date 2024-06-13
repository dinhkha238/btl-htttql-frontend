import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://1da5-58-186-167-0.ngrok-free.app/",
  timeout: 20000,
  headers: {
    "ngrok-skip-browser-warning": "any",
  },
});
// apiClient.interceptors.request.use(
//   (config) => {
//     const jwtToken = localStorage.getItem('jwtToken');
//     if (jwtToken) {
//       config.headers.Authorization = `Bearer ${jwtToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// apiClient.interceptors.response.use(
//   (response) => {
//     const jwtToken = response.data.token;
//     if (jwtToken) {
//       localStorage.setItem('jwtToken', jwtToken);
//     }

//     return response;
//   },
//   (error) => {
//     localStorage.setItem('token', 'false');
//     return Promise.reject(error);
//   }
// );

export const filterEmptyString = (params: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      if (typeof value === "string") {
        result[key] = value.trim();
      } else {
        result[key] = value;
      }
    }
  });

  return result;
};
