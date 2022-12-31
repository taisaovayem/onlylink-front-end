import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useHandleApiError } from './useHandleApiError';
import { ApiError } from '../../api';

export type UseAppMutationResult<
  Response,
  Variable = unknown,
> = UseMutationResult<Response, ApiError, Variable>;
export type UseAppMutationOptions<
  Response,
  Variable = unknown,
> = UseMutationOptions<Response, ApiError, Variable>;

export function useAppMutation<Response, Variable = unknown>(
  options: UseAppMutationOptions<Response, Variable> = {},
): UseAppMutationResult<Response, Variable> {
  const { handleApiError } = useHandleApiError();

  return useMutation<Response, ApiError, Variable>({
    onError(error) {
      handleApiError(error);
    },
    ...options,
  });
}
