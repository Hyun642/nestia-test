import { tags } from 'typia';

export namespace IPost {
  export interface ISummary {
    id: string & tags.Format<'uuid'>;
    title: string & tags.MinLength<2> & tags.MaxLength<10>;
    content: string;
    authorId: number;
    createdAt: Date;
  }

  export interface ICreate {
    title: string & tags.MinLength<2> & tags.MaxLength<10>;
    content: string & tags.MinLength<5>;
    authorId: number & tags.Type<'uint32'>;
  }

  export interface IUpdate {
    title: string & tags.MinLength<2> & tags.MaxLength<10>;
    content?: string;
  }
}

export interface IPageRequest {
  page: number & tags.Type<'uint32'>;
  limit: number & tags.Type<'uint32'>;
  // keyword: string;
}
export interface IErrorResponse {
  errorCode: string;
  message: string;
}

export interface ISuccessResponse {
  code: string;
  message: string;
}
