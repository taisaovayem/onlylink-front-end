import { Login } from '@/modules/authentication/views';
import Head from 'next/head';

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
