import axios from "axios";

const UNKNOWN_ERROR_MESSAGE = "Unknown network error!";
const AXIOS_TIMEOUT = 10000;

const mockApi = "https://5f3bb099fff8550016ae5862.mockapi.io/api";
const token = window.localStorage.getItem("access_token") || "";

const axiosInstance = axios.create({
  baseURL: mockApi,
  timeout: AXIOS_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => ({ ...response, error: null }),
  (error) => {
    window.console.log(
      `[Error] Message:${error.message} ${
        error.response
          ? `response_data: ${JSON.stringify(error.response.data)}`
          : ""
      }`
    );
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.status === "UNAUTHORIZED"
    ) {
      window.location.replace("/login");
      window.localStorage.clear();
    }

    return {
      status: (error.response && error.response.status) || 0,
      data: (error.response && error.response.data) || {},
      error: error.message || UNKNOWN_ERROR_MESSAGE,
    };
  }
);

export default axiosInstance;
