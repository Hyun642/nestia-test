import { Injectable, NotFoundException } from '@nestjs/common';

import { IPageRequest, IPost } from './Interfaces/IPost.interface';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tags } from 'typia';

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

  public async findAll(query: IPageRequest): Promise<IPost.ISummary[]> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const post = await this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });
    if (!post) throw new NotFoundException('글을 찾을 수 없습니다');
    return post;
  }

  public async findOne(
    postId: string & tags.Format<'uuid'>,
  ): Promise<IPost.ISummary> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException('글을 찾을 수 없습니다');
    return post;
  }

  public async update(
    id: string & tags.Format<'uuid'>,
    input: IPost.IUpdate,
  ): Promise<IPost.ISummary> {
    const { title, content } = input;
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) throw new NotFoundException('글을 찾을 수 없습니다');

    await this.postRepository.update(id, {
      title,
      content,
    });

    const updatedPost = await this.postRepository.findOne({
      where: { id },
    });

    if (!updatedPost) {
      throw new NotFoundException('수정 후 게시글을 찾을 수 없습니다.');
    }
    return updatedPost;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
