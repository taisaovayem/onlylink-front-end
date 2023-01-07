import { httpClient } from '@/shared/api';
import { PaginationResponse, Post } from '@/shared/models';

export function getMyPost(page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<Post>>('/api/v1/post/my-post', {
      params: {
        page,
        perPage,
      },
    })
    .then(rs => rs?.data);
}

export function getPostDetail(id: string) {
  return httpClient.get<Post>(`/api/v1/post/${id}`).then(rs => rs?.data);
}

type AddPostRequest = Pick<Post, 'code' | 'link' | 'description' | 'mode'> & {
  tags: string[];
};

export function addPost(data: AddPostRequest) {
  return httpClient.post<Post>('/api/v1/post', data).then(rs => rs?.data);
}

type EditPostRequest = AddPostRequest & {
  id: string;
};

export function editPost({ id, ...data }: EditPostRequest) {
  return httpClient.put(`/api/v1/post/${id}`, data).then(rs => rs?.data);
}

export function deletePost(id: string) {
  return httpClient.delete<never>(`/api/v1/post/${id}`).then(rs => rs?.data);
}

export function getPostByUser(userId: string, page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<Post>>(`/api/v1/post/user/${userId}`, {
      params: {
        page,
        perPage,
      },
    })
    .then(rs => rs?.data);
}

export function getPostLiked(page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<Post>>('/api/v1/post/liked', {
      params: {
        page,
        perPage,
      },
    })
    .then(rs => rs?.data);
}

export function getPostByTag(tagId: string, page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<Post>>(`/api/v1/post/tag/${tagId}`, {
      params: {
        page,
        perPage,
      },
    })
    .then(rs => rs?.data);
}

type GetLinkResponse = {
  link: string;
};

export function getLink(postId: string) {
  return httpClient
    .get<GetLinkResponse>(`/api/v1/post/${postId}/link`)
    .then(rs => rs?.data);
}
