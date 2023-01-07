import { User } from '@/shared/models';

enum ListMode {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export type List = {
  name: string;
  description: string;
  mode: ListMode;
  user: User;
  id: string;
};
