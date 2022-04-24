import { Input, Button, Form } from 'antd';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Vui lòng nhập email hợp lệ')
    .max(255)
    .required('Vui lòng nhập email'),
  password: Yup.string().required('Required'),
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (data: any) => console.log(data);
  const onError = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <Controller
        name="email"
        defaultValue=""
        control={control}

        // render={({ onChange, value }) => (
        //   <Input onChange={onChange} value={value} placeholder="email" />
        // )}
      /> */}

      <Input
        name="email"
        type="email"
        placeholder="email"
        onChange={(e) => setValue('email', e.target.value)}
      />
      <p>{errors.email?.message}</p>
      <Input
        {...register('password')}
        name="password"
        type="password"
        placeholder="Mật khẩu"
      />
      <p>{errors.password?.message}</p>
      <Button type="primary">Đăng nhập</Button>
    </form>
  );
}
