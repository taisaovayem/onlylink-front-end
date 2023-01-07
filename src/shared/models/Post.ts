type Tag = {
  id: string;
  name: string;
};

type Author = {
  id: string;
  name: string;
  email: string;
  status: string;
};

enum Mode {
  Public = 'public',
  Private = 'private',
}

export type Post = {
  id: string;
  code: string;
  link: string;
  description: string;
  mode: Mode;
  tags: Tag[];
  author: Author;
};
