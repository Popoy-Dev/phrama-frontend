import axios from 'axios';
import { apiService } from './common/api.service';


const authService = {
    login: (payload: any) => apiService.post(`/api/login?email=${payload.email}&password=${payload.password}`),
    register: (payload: any) => apiService.post(`/api/register?firstname=${payload.firstname}&lastname=${payload.lastname}&email=${payload.email}&password=${payload.password}&c_password=${payload.password}`),    
}

export default authService