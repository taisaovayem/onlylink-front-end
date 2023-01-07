import { useAppQuery } from '@/shared/hooks/api';
import {
  getMyPost,
  getPostDetail,
  getPostByUser,
  getPostLiked,
  getPostByTag,
} from '../../api';

export function useGetMyPost(page: number, perPage: number) {
  return useAppQuery({
    queryKey: ['GET_MY_POST', page, perPage],
    queryFn() {
      return getMyPost(page, perPage);
    },
  });
}

export function useGetPostDetail(id: string) {
  return useAppQuery({
    queryKey: ['GET_POST_DETAIL', id],
    queryFn() {
      return getPostDetail(id);
    },
  });
}

export function useGetPostByUser(
  userId: string,
  page: number,
  perPage: number,
) {
  return useAppQuery({
    queryKey: ['GET_POST_BY_USER', userId, page, perPage],
    queryFn() {
      return getPostByUser(userId, page, perPage);
    },
  });
}

export function useGetPostLiked(page: number, perPage: number) {
  return useAppQuery({
    queryKey: ['GET_POST_LIKED', page, perPage],
    queryFn() {
      return getPostLiked(page, perPage);
    },
  });
}

export function useGetPostByTag(tagId: string, page: number, perPage: number) {
  return useAppQuery({
    queryKey: ['GET_POST_BY_TAG', page, perPage],
    queryFn() {
      return getPostByTag(tagId, page, perPage);
    },
  });
}
