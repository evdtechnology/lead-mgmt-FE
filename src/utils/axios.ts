import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import toast from "react-hot-toast";

interface AxiosClientArgs extends AxiosRequestConfig {
  toolkit: {
    fulfillWithValue: (value: unknown) => unknown;
    rejectWithValue: (value: unknown) => unknown;
  };
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
  error: { message: string };
}

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ErrorResponse).message === "string"
  );
};

const AxiosClient = async (args: AxiosClientArgs) => {
  const { toolkit, headers = {}, ...rest } = args;

  return axios({
    baseURL: process.env.NEXT_PUBLIC_API_KEY,
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then((response: AxiosResponse) => toolkit.fulfillWithValue(response.data))
    .catch((error: AxiosError) => {
      if (error.response?.data && isErrorResponse(error.response.data)) {
        return toolkit.rejectWithValue(error.response.data);
      }
      return toolkit.rejectWithValue("An unknown error occurred");
    });
};

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = isErrorResponse(error.response?.data)
      ? error.response.data.message
      : "Something went wrong";

    toast.error(errorMessage);
    return Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

export default AxiosClient;