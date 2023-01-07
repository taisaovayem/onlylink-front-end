import { useAppMutation } from '@/shared/hooks/api';
import { like } from '../../api';

export function useLikeMutation() {
  return useAppMutation({
    mutationFn: like,
  });
}
