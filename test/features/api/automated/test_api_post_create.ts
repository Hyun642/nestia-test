import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IPost } from "../../../../src/post/Interfaces/IPost.interface";

export const test_api_post_create = async (connection: api.IConnection) => {
  const output: Primitive<IPost.ISummary> = await api.functional.post.create(
    connection,
    typia.random<IPost.ICreate>(),
  );
  typia.assert(output);
};
