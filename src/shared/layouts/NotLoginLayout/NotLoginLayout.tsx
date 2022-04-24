import React from 'react';
import { WithChildren } from '../../interfaces';
import { Layout } from 'antd';
const { Content } = Layout;

export function NotLoginLayout({ children }: WithChildren) {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
}
