enum StatusUser {
  Active = 'active',
}

export type User = {
  id: string;
  name: string;
  email: string;
  status: StatusUser;
};
