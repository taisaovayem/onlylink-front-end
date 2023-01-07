import { useAppMutation } from '@/shared/hooks/api';
import { addPost, editPost, deletePost } from '../../api';

export function useAddPostMutation() {
  return useAppMutation({
    mutationFn: addPost,
  });
}

export function useEditPostMutation() {
  return useAppMutation({
    mutationFn: editPost,
  });
}

export function useDeletePostMutation() {
  return useAppMutation({
    mutationFn: deletePost,
  });
}
