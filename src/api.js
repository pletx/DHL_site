import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export function getApiErrorMessage(error) {
  if (!error) return 'Une erreur est survenue. Veuillez réessayer.';

  if (error.response?.data) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (data.message) return data.message;
    if (data.error) return data.error;
  }

  return error.message || 'Une erreur est survenue. Veuillez réessayer.';
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      // backend expects 'x-auth-token'; also set Authorization for compatibility
      config.headers['x-auth-token'] = token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired: remove token and redirect to home to prompt login
      localStorage.removeItem('token');
      try {
        // add query param to indicate session expired
        const url = new URL(window.location.href);
        url.searchParams.set('sessionExpired', '1');
        window.location.href = url.toString();
      } catch (e) {
        // fallback: reload
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
