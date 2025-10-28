import type { Primitive, tags } from 'typia';
import typia from 'typia';

import api from '../../../../src/api';
import type {
  IErrorResponse,
  IPost,
} from '../../../../src/post/Interfaces/IPost.interface';
import { TestValidator } from '@nestia/e2e';

export const test_api_post_findOne = async (connection: api.IConnection) => {
  const input: IPost.ICreate = typia.random<IPost.ICreate>();
  const created: Primitive<IPost.ISummary> = await api.functional.post.create(
    connection,
    input,
  );

  const output: Primitive<IPost.ISummary> = await api.functional.post.findOne(
    connection,
    created.id,
  );
  typia.assert(output);
};
