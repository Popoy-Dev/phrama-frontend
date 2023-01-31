import axios from 'axios'


const axiosHeaders = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    crossdomain: true,
  }

  const createOptions = {
    baseURL: 'http://localhost:8000/',
    headers: axiosHeaders
    
  }
  
  const apiService = axios.create(createOptions);
 


  // const addAuthorization = (config: any) => {
  //   const token=  localStorage.getItem('token')
  //   if (typeof window !== 'undefined') {
  //     console.log('fengfeng', token);
  //     const getAuthorizationBearerHeaderValue = () => token ? `Bearer ${token}` : ''
  
  //     config.headers.Authorization = getAuthorizationBearerHeaderValue()
  //     console.log('config', config)
  //     return config
  //    }
   

  // }
  // apiService.interceptors.request.use(addAuthorization)
export { apiService };