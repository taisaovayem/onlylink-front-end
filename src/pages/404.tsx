import { Row, Typography, Button } from '@/shared/components';
import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Trang không tìm thấy</title>
      </Head>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Typography style={{ textAlign: 'center' }}>
          Trang không tìm thấy
          <Link href="/">
            <a>
              <Button type="primary">Trở về trang chủ</Button>
            </a>
          </Link>
        </Typography>
      </Row>
    </>
  );
}
