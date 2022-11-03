import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;

export async function fetcher(url: string): Promise<any> {
  return api.get(url).then(resp => resp.data)
}