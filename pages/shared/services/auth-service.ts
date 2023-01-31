import axios from 'axios';
import { apiService } from './common/api.service';


const authService = {
    login: (payload: any) => apiService.post(`/api/login?email=${payload.email}&password=${payload.password}`),
    register: (payload: any) => apiService.post(`/api/register?firstname=${payload.firstname}&lastname=${payload.lastname}&email=${payload.email}&password=${payload.password}&c_password=${payload.password}`),
    signout: (payload: any) => axios.post(`http://localhost:8000/api/logout`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            crossdomain: true,
            Authorization: `Bearer ${payload}` 
        }
    })
    
}

export default authService