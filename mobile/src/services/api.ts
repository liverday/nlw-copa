import axios from 'axios';
import { API_HOST, DEBUG } from '@env';

const api = axios.create({
  baseURL: `${API_HOST}:3333`
});

if (DEBUG) {
  api.interceptors.response.use((response) => {
    console.log(`[${response.config.method} ${response.config.url}] ${response.status} response: ${JSON.stringify(response.data)}`)
  
    return response;
  })
}

export default api;