import React from 'react';
import { WithChildren } from '../../interfaces';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

export function MainLayout({ children }: WithChildren) {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
