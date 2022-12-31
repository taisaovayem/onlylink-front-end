import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

export function LandingLayout({ children }: Props) {
  return <div>{children}</div>;
}
