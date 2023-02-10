import axios from 'axios'


const axiosHeaders = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossdomain: true,
  }

  const createOptions = {
    baseURL: ' http://127.0.0.1:8000/',
    headers: axiosHeaders  
  }
  
  const apiService = axios.create(createOptions);
 
export { apiService };