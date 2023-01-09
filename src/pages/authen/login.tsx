import Head from 'next/head';
import { Login } from '@/modules/authentication/views';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <Login />
    </>
  );
}
