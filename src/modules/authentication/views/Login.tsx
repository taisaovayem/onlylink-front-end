import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useLoginMutation } from '@/shared/auth/hooks/api';
import { useRouter } from 'next/router';
import {
  setAccessToken,
  setRefreshToken,
  setUserProile,
} from '@/shared/auth/helpers';
import { useGuard } from '@/shared/auth/hooks';
import { useStore } from '@/store';
import { emailSchema, passwordSchema } from '@/shared/models';
import {
  Row,
  Col,
  TInput,
  Form,
  Button,
  Card,
  Typography,
  Layout,
} from '@/shared/components';

const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

type FormData = {
  email: string;
  password: string;
};

export function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });
  const { mutateAsync, isLoading } = useLoginMutation();
  const { refreshAuthStore } = useGuard();
  const {
    authStore: { setLoginStatus },
  } = useStore();

  const onSubmit: SubmitHandler<FormData> = () => {
    setLoginStatus('checking');
    const form = getValues();
    mutateAsync(form).then(rs => {
      setAccessToken(rs.accessToken);
      setRefreshToken(rs.refreshToken);
      setUserProile({
        email: rs.email,
        name: rs.name,
      });
      refreshAuthStore();
      setLoginStatus('logged');
      router.push('/');
    });
  };

  return (
    <Layout style={{ height: '100vh', background: 'white' }}>
      <Row align="middle" style={{ height: '100%' }}>
        <Col md={{ span: 8, offset: 8 }}>
          <Card>
            <Row justify="center" style={{ marginBottom: '2rem' }}>
              <Col>
                <img src="/favicon.png" alt="logo" />
              </Col>
            </Row>
            <Form
              onSubmitCapture={handleSubmit(onSubmit)}
              labelCol={{ span: 8 }}
              labelAlign="left"
            >
              <Form.Item label="Tên đăng nhập" help={errors?.email?.message}>
                <TInput control={control} name="email" />
              </Form.Item>
              <Form.Item label="Mật khẩu" help={errors?.password?.message}>
                <TInput.TPassword control={control} name="password" />
              </Form.Item>
              <Form.Item label=" ">
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph>
              <Typography.Text>Quên mật khẩu</Typography.Text>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
