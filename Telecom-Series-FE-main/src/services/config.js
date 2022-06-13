import axios from "axios";

const baseUrl = window.__RUNTIME_CONFIG__.REACT_APP_URL_BASE;

const apiSeries = axios.create({ baseURL: baseUrl });

export default apiSeries;
