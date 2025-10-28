import typia from 'typia';
import type { Primitive } from 'typia';

import api from '../../../../src/api';
import type {
  IPageRequest,
  IPost,
} from '../../../../src/post/Interfaces/IPost.interface';

export const test_api_post_findAll = async (connection: api.IConnection) => {
  const output: Primitive<IPost.ISummary[]> = await api.functional.post.findAll(
    connection,
    typia.random<IPageRequest>(),
  );
  typia.assert(output);
};
