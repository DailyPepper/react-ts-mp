import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        await axiosInstance.post('auth/logout/');
        window.dispatchEvent(new Event('auth_storage'));
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    if (error.response.status === 500) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      await axiosInstance.post('auth/logout/');
      window.dispatchEvent(new Event('auth_storage'));
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
