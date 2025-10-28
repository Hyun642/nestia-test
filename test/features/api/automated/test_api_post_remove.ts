import type { Primitive } from 'typia';
import typia from 'typia';

import api from '../../../../src/api';
import type { ISuccessResponse } from '../../../../src/post/Interfaces/IPost.interface';

export const test_api_post_remove = async (connection: api.IConnection) => {
  const newPost = await api.functional.post.create(connection, {
    title: '삭제될 테스트 글',
    content: '이 글은 곧 삭제됩니다.',
    authorId: 0,
  });

  const output: Primitive<ISuccessResponse> = await api.functional.post.remove(
    connection,
    newPost.id,
  );
  typia.assert(output);
};
