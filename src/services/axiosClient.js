import axios from "axios";
import {sessionStorageService} from "@/handlers/sessionStorageService";

const baseDomain = process.env.VUE_APP_BASE_URL;
const lang = sessionStorageService.returnGetLanguage() || "tr";

const axiosInstance = axios.create({
    baseURL:baseDomain,
    headers: {
        Authorization: sessionStorageService.returnGetAccessToken(),
        "Content-Type":'application/json',
        "Accept-Language":lang,
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        //config.headers.common['interceptorheader'] = 'Interceptor Header';
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);
export default axiosInstance