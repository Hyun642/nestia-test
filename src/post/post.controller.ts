import { Controller, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import {
  TypedBody,
  TypedException,
  TypedParam,
  TypedQuery,
  TypedRoute,
} from '@nestia/core';
import {
  IErrorResponse,
  IPageRequest,
  IPost,
} from './Interfaces/IPost.interface';
import { tags } from 'typia';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TypedRoute.Post()
  public async create(
    @TypedBody() input: IPost.ICreate,
  ): Promise<IPost.ISummary> {
    return this.postService.create(input);
  }

  @TypedRoute.Get()
  public async findAll(
    @TypedQuery() query: IPageRequest,
  ): Promise<IPost.ISummary[]> {
    return this.postService.findAll(query);
  }

  @TypedRoute.Get(':id')
  @TypedException<IErrorResponse>({
    status: 404,
    description: '게시글 ID를 찾을 수 없음',
    example: {
      errorCode: 'POST_NOT_FOUND',
      message: 'Article ID not found',
    },
  })
  public async findOne(
    @TypedParam('id') postId: string & tags.Format<'uuid'>,
  ): Promise<IPost.ISummary> {
    return this.postService.findOne(postId);
  }

  @TypedRoute.Patch(':id')
  @TypedException<IErrorResponse>({
    status: 404,
    description: '게시글 ID를 찾을 수 없음',
  })
  public async update(
    @TypedParam('id') id: string & tags.Format<'uuid'>,
    @TypedBody() input: IPost.IUpdate,
  ): Promise<IPost.ISummary> {
    return this.postService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
