import { api } from '../../../lib/api/api.ts';

export const authFetches = {
    check: async () => api.post('/auth/check'),
    login: async (login: string, password: string) => {
        const response = await api.post<{ accessToken: string }>('/auth/login', { login, password });
        
        localStorage.setItem('accessToken', response.data.accessToken);
        
        return response;
    },
};
