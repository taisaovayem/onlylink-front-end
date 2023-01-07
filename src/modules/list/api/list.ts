import { httpClient } from '@/shared/api';
import { PaginationResponse, Post } from '@/shared/models';
import { List } from '../models';

export function getMyList(page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<List>>('/api/v1/list/my-list', {
      params: { page, perPage },
    })
    .then(rs => rs?.data);
}

export function getPostByList(listId: string, page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<Post>>(`/api/v1/list/${listId}/posts`, {
      params: { page, perPage },
    })
    .then(rs => rs?.data);
}

export function getListByUser(userId: string, page: number, perPage: number) {
  return httpClient
    .get<PaginationResponse<List>>(`/api/v1/list/user/${userId}`, {
      params: { page, perPage },
    })
    .then(rs => rs?.data);
}

export function getListInfo(listId: string) {
  return httpClient.get<List>(`/api/v1/list/${listId}`).then(rs => rs?.data);
}

type AddListRequest = Omit<List, 'id' | 'user'>;

export function addList(data: AddListRequest) {
  return httpClient.post<List>('/api/v1/list', data).then(rs => rs?.data);
}

type EditListRequest = Omit<List, 'user'>;
export function editList({ id, ...data }: EditListRequest) {
  return httpClient.put<List>(`/api/v1/list/${id}`, data).then(rs => rs?.data);
}

export function deleteList(listId: string) {
  return httpClient
    .delete<never>(`/api/v1/list/${listId}`)
    .then(rs => rs?.data);
}

type AddRemoveItemRequest = {
  list: string;
  post: string;
};

export function addRemoveItem(data: AddRemoveItemRequest) {
  return httpClient
    .post<never>('/api/v1/list/add-remove-item', data)
    .then(rs => rs?.data);
}
