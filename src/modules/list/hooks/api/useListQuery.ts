import { useAppQuery } from '@/shared/hooks/api';
import {
  getListByUser,
  getListInfo,
  getMyList,
  getPostByList,
} from '../../api';

export function useGetListByUser(
  userId: string,
  page: number,
  perPage: number,
) {
  return useAppQuery({
    queryKey: ['GET_LIST_BY_USER', userId, page, perPage],
    queryFn() {
      return getListByUser(userId, page, perPage);
    },
  });
}

export function useGetListInfo(listId: string) {
  return useAppQuery({
    queryKey: ['GET_LIST_INFO', listId],
    queryFn() {
      return getListInfo(listId);
    },
  });
}

export function useMyList(page: number, perPage: number) {
  return useAppQuery({
    queryKey: ['GET_MY_LIST', page, perPage],
    queryFn() {
      return getMyList(page, perPage);
    },
  });
}

export function usePostByList(listId: string, page: number, perPage: number) {
  return useAppQuery({
    queryKey: ['GET_POST_BY_LIST', listId, page, perPage],
    queryFn() {
      return getPostByList(listId, page, perPage);
    },
  });
}
