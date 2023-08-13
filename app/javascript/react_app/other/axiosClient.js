import axios from "axios"
import { setupCache } from "axios-cache-interceptor"

const axiosClient = setupCache(axios)

export default axiosClient
