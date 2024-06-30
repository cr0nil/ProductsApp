import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as SecureStore from "expo-secure-store";
export interface ErrorResponse {
  statusCode: number;
  status: boolean;
  data: any;
}
const createHttpClient = () => {
  const client: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with your API base URL
    timeout: 5000, // Set a timeout value if needed
  });

  const onRequest = async (request: AxiosRequestConfig): Promise<any> => {
    if (request.url === "/login" || request.url === "/register") {
      return request;
    }
    const token = await SecureStore.getItemAsync("token");

    request.headers!.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    return request;
  };

  const onResponse = (response: AxiosResponse): any => {
    return {
      statusCode: response.status,
      data: response.data,
      headers: response.headers,
    };
  };
  const onError = async (error: AxiosError | any) => {
    if (error.response) {
      throw {
        statusCode: error.response?.status ?? "",
        status: false,
        data: error.response?.data ?? "",
      };
    } else {
      throw error;
    }
  };
  client.interceptors.request.use(onRequest);
  client.interceptors.response.use(onResponse, onError);
  return client;
};
export const api = createHttpClient();
