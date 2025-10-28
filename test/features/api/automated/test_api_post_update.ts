import type { Primitive, tags } from 'typia';
import typia from 'typia';

import api from '../../../../src/api';
import type {
  IErrorResponse,
  IPost,
} from '../../../../src/post/Interfaces/IPost.interface';

export const test_api_post_update = async (connection: api.IConnection) => {
  const input: IPost.ICreate = typia.random<IPost.ICreate>();
  const created: Primitive<IPost.ISummary> = await api.functional.post.create(
    connection,
    input,
  );

  // 2. 업데이트에 사용할 데이터 준비
  // (typia.random()이 아닌, 업데이트 내용을 명시적으로 지정할 수도 있습니다.)
  const updateInput: IPost.IUpdate = typia.random<IPost.IUpdate>();

  // 3. 생성된 게시글의 ID를 사용해 업데이트 요청
  const output: Primitive<IPost.ISummary> = await api.functional.post.update(
    connection,
    created.id, // <--- 1단계에서 확보한 유효한 ID 사용
    typia.random<IPost.IUpdate>(),
  );

  typia.assert(output);
};
