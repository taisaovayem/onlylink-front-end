import React from 'react';
import { useRouter } from 'next/router';
import { useGetListInfoQuery } from '../hooks/api';
import { Layout, List } from '@/shared/components';

export function ListDetail() {
  const { Header, Footer, Sider, Content } = Layout;
  const { query } = useRouter();
  const listId = query.id as unknown as string;
  const { data } = useGetListInfoQuery(listId);
  return (
    //
    // danh sách post của list
    <Layout>
      <Header style={{ padding: '0 10px', background: 'white' }}>Header</Header>
      <Layout>
        <Sider style={{ padding: '0 10px', background: 'white' }}>Sider</Sider>
        <Content>
          <List>
          <List.Item key={data?.id}>
            <ul>
                <ol>Tên phim: {data?.name}</ol>
                <ol>Mô tả: {data?.description}</ol>
                <ol>Chế độ: {data?.mode}</ol>
            </ul>
        </List.Item>
        </List>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
