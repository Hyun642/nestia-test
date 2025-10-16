import { Injectable } from '@nestjs/common';

import { IPost } from './Interfaces/IPost.interface';

@Injectable()
export class PostService {
  create(input: IPost.ICreate) {
    return input;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: any) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
