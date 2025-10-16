import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { IPageRequest, IPost } from './Interfaces/IPost.interface';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: any) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
