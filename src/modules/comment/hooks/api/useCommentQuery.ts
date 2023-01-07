import { useAppQuery } from '@/shared/hooks/api';
import { getCommentByPost } from '../../api';

export function useGetCommentByPost(
  postId: string,
  page: number,
  perPage: number,
) {
  return useAppQuery({
    queryKey: ['GET_COMMENT_BY_POST', page, perPage],
    queryFn() {
      getCommentByPost(postId, page, perPage);
    },
  });
}
