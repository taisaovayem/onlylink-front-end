import { httpClient } from '@/shared/api';
import { User, PaginationResponse } from '@/shared/models';

type Comment = {
  id: string;
  content: string;
  user: User;
};

export function getCommentByPost(
  postId: string,
  page: number,
  perPage: number,
) {
  return httpClient
    .get<PaginationResponse<Comment>>(`/api/v1/comment/${postId}`, {
      params: { page, perPage },
    })
    .then(rs => rs?.data);
}

type AddCommentRequest = Omit<Comment, 'id'>;

export function addComment(data: AddCommentRequest) {
  return httpClient.post<Comment>('/api/v1/comment', data).then(rs => rs?.data);
}
