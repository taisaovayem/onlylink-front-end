import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useFilter } from '@/shared/hooks';
// import { deleteList } from "../api";
import { useGetMyListQuery, useDeleteListMutation } from '../hooks/api';
import {
  Pagination,
  List,
  Layout,
  Menu,
  ConfirmButton,
} from '@/shared/components';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

export function MyList() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);
  const { page, perPage, setPagination } = useFilter();
  const { data } = useGetMyListQuery(page, perPage);

  const { t } = useTranslation();
  const mutationDel = useDeleteListMutation();

  function handleDelete(id: string) {
    mutationDel.mutate(id);
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: '0 10px', background: 'white' }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
          <strong style={{ marginLeft: 30 }}>THIS IS MY LINK</strong>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <List>
            {data?.data.map(item => (
              <List.Item
                key={item.id}
                actions={[
                  <a key="list-loadmore-edit" href={`/list/${item.id}/edit`}>
                    edit
                  </a>,
                  <ConfirmButton
                    key="list-delete"
                    type="text"
                    message={'Bạn có đồng ý xoá?'}
                    onConfirm={() => handleDelete(item.id)}
                  >
                    {t('Delete')}
                  </ConfirmButton>,
                ]}
              >
                <Link href={`/list/${item.id}`}>{item.name}</Link>
              </List.Item>
            ))}
            <Pagination
              current={page}
              pageSize={perPage}
              total={data?.total ?? 0}
              onChange={setPagination}
            />
          </List>
        </Content>
      </Layout>
    </Layout>
  );
}
