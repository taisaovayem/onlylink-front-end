import * as yup from 'yup';
import { PASSWORD_REGEX } from './regex';

export const emailSchema = yup
  .string()
  .email()
  .required('Dữ liệu bắt buộc nhập');

export const passwordSchema = yup
  .string()
  .required('Dữ liệu bắt buộc nhập')
  .matches(
    PASSWORD_REGEX,
    'Mật khẩu phải có 8-30 ký tự, 1 chữ cái thường, 1 chữ hoa và 1 chữ số',
  );

export const confirmPasswordSchema = yup
  .string()
  .required('Dữ liệu bắt buộc nhập')
  .matches(
    PASSWORD_REGEX,
    'Mật khẩu phải có 8-30 ký tự, 1 chữ cái thường, 1 chữ hoa và 1 chữ số',
  )
  .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp');
