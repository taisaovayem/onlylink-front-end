import { useAppMutation } from '@/shared/hooks/api';
import { addComment } from '../../api';
import { useQueryClient } from 'react-query';

export function usePostCommentMutation() {
  const queryClient = useQueryClient();
  return useAppMutation({
    mutationFn: addComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['GET_COMMENT_BY_POST'],
      });
    },
  });
}
