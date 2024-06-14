import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { refreshTokenRotation } from "../util/RTR";

const instance = axios.create({ baseURL: BASE_URL });

const authInstance = axios.create({ baseURL: BASE_URL });

const { setAuthHeader } = refreshTokenRotation();

authInstance.interceptors.request.use(setAuthHeader);

export { authInstance, instance };
