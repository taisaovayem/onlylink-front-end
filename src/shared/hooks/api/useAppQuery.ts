import {
  useQuery,
  QueryKey,
  UseQueryResult,
  UseQueryOptions,
} from 'react-query';
import { ApiError } from '../../api';
import { useHandleApiError } from './useHandleApiError';

type UseAppQueryResult<Response> = UseQueryResult<Response, ApiError>;

export function useAppQuery<
  Key extends QueryKey = QueryKey,
  Response = unknown,
  SelectData = Response,
>(
  options: UseQueryOptions<Response, ApiError, SelectData, Key> = {},
): UseAppQueryResult<SelectData> {
  const { handleApiError } = useHandleApiError();
  return useQuery<Response, ApiError, SelectData, Key>({
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    retry: false,
    onError(error) {
      handleApiError(error);
    },
    cacheTime: 0,
    keepPreviousData: true,
    ...options,
  });
}
