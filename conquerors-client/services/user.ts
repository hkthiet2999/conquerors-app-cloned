import { BaseService } from './base';

export class UserService extends BaseService {

  async login(email: string, password: string) {
    const response = await this.post('/auth/login', {email, password});
    return response.data;
  }

  async register(email: string, password: string) {
    const response = await this.post('/auth/create', {
      email
      , password,
    });
    return response.data;
  }

  async profile(id: string) {
    const response = await this.get(`/users/profile/` + id);
    return response.data;
  }

  async me() {
    const response = await this.get(`/users/me`, {}, this.getHeaders());
    return response.data;
  }
}
