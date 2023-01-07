import { useAppMutation } from '@/shared/hooks/api';
import { addList, addRemoveItem, deleteList, editList } from '../../api';
import { useQueryClient } from 'react-query';

export function useAddListMutation() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: addList,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['GET_LIST_BY_USER', 'GET_MY_LIST', 'GET_POST_BY_LIST'],
      });
    },
  });
}

export function useAddRemoveItemMutation() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: addRemoveItem,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['GET_LIST_BY_USER', 'GET_MY_LIST', 'GET_POST_BY_LIST'],
      });
    },
  });
}

export function useDeleteListMutation() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: deleteList,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['GET_LIST_BY_USER', 'GET_MY_LIST', 'GET_POST_BY_LIST'],
      });
    },
  });
}

export function useEditListMutation() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: editList,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['GET_LIST_BY_USER', 'GET_MY_LIST', 'GET_POST_BY_LIST'],
      });
    },
  });
}
