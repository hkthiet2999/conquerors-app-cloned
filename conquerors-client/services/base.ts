import axios from 'axios';

export class BaseService {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = process.env.API_URL || 'http://localhost:5000';
  }

  protected getToken() {
    return localStorage.getItem('token');
  }

  protected getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      }
    };
  }

  protected async get<T>(path: string, params: any = {}, headers: any = {}): Promise<T> {
    const response = await axios.get<T>(`${this.baseURL}${path}`, {
      params,
      ...headers
    });
    return response.data;
  }

  protected async post<T>(path: string, data: any = {}, headers: any = {}): Promise<T> {
    const response = await axios.post<T>(`${this.baseURL}${path}`, data, headers);
    return response.data;
  }

  protected async put<T>(path: string, data: any = {}, headers: any = {}): Promise<T> {
    const response = await axios.put<T>(`${this.baseURL}${path}`, data, headers);
    return response.data;
  }

  protected async delete<T>(path: string, params: any = {}, headers: any = {}): Promise<T> {
    const response = await axios.delete<T>(`${this.baseURL}${path}`, {
      params,
      ...headers
    });
    return response.data;
  }
}
