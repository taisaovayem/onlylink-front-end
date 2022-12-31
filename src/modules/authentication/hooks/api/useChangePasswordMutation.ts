import { useAppMutation } from '@/shared/hooks/api';
import { changePassword } from '../../api';

export function useChangePassword() {
  return useAppMutation({
    mutationFn: changePassword,
  });
}
