import axios from "axios";
// import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default methods;
