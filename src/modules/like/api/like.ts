import { httpClient } from '@/shared/api';

export function like(post: string) {
  return httpClient.post<never>('/api/v1/like', { post }).then(rs => rs?.data);
}
