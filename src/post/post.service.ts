import { Injectable } from '@nestjs/common';

import { IPost } from './Interfaces/IPost.interface';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  public async create(input: IPost.ICreate): Promise<IPost.ISummary> {
    const { title, content, authorId } = input;
    const newPost = this.postRepository.create({
      title: title,
      content: content,
      authorId: authorId,
    });
    const savedEntity = await this.postRepository.save(newPost);
    return savedEntity;
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
