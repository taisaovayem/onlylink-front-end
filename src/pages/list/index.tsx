import Head from 'next/head';
import { MyList } from '@/modules/list/views';

export default function ListPage() {
  return (
    <>
      <Head>
        <title>Danh sách link</title>
      </Head>
      <MyList />
    </>
  );
}
