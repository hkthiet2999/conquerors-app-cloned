import { BaseService } from './base';

export class PostService extends BaseService {
  async create(data) {
    const response = await this.post('/posts', {
        content: data.description
      },
      this.getHeaders());

    return response.data;
  }

  async update(id, data: any) {
    const response = await this.put('/posts/' + data.id, {
        content: data.description
      },
      this.getHeaders());
  }

  async getPostById(id) {
    const response = await this.get('/posts/' + id, {}, this.getHeaders());
    return response.data;
  }
}
