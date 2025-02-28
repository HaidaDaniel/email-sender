import axios from 'axios';
import { CreateUser, User, EmailLog, SendEmail, LoginUser, EmailLogResponse } from './types';

const API_URL = '/api';
const AUTH_STORAGE_KEY = 'authToken';

export const getAuthToken = (): string => localStorage.getItem(AUTH_STORAGE_KEY) || '';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

export const setAuthToken = (username: string, password: string): void => {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem(AUTH_STORAGE_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const registerUser = async (data: CreateUser): Promise<User> => {
  const response = await api.post<User>('/users/', data);
  return response.data;
};

export const loginUser = async (data: LoginUser): Promise<User> => {
  const token = btoa(`${data.username}:${data.password}`);

  try {
    const response = await axios.get<User>(`${API_URL}/users/current`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    setAuthToken(data.username, data.password);
    return response.data;
  } catch (error) {
    throw new Error('Invalid login credentials');
  }
};

export const getCurrentUser = async (token: string): Promise<User> => {
    const response = await api.get("/users/current", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return response.data;
  };

export const sendEmail = async (data: SendEmail): Promise<EmailLog> => {
  const response = await api.post<EmailLog>('/emails/', data);
  return response.data;
};

export const getEmails = async (limit = 2, offset = 0): Promise<EmailLogResponse> => {
  const response = await api.get(`/emails/?limit=${limit}&offset=${offset}`);
  return response.data;
};
