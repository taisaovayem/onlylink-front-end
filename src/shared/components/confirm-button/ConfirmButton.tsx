import * as React from 'react';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  message?: React.ReactNode;
  ignore?: boolean; // bỏ qua confirm dialog
  onConfirm?: () => void;
  onCancel?: () => void;
  onChangeShowConfirmDialog: (show: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function ConfirmButton({
  children,
  type,
  message,
  ignore,
  onConfirm,
  onCancel,
  onChangeShowConfirmDialog,
  disabled,
  loading,
}: Props) {
  const { confirm } = Modal;
  const { t } = useTranslation();

  function handleClick() {
    if (ignore) {
      onConfirm?.();
    } else {
      onChangeShowConfirmDialog?.(true);
      confirm({
        title: t('Thông báo'),
        content: message ?? '',
        okText: t('Đồng ý'),
        cancelText: t('Huỷ'),
        onOk: () => {
          onChangeShowConfirmDialog?.(false);
          onConfirm?.();
        },
        onCancel: () => {
          onChangeShowConfirmDialog?.(false);
          onCancel?.();
        },
      });
    }
  }
  return (
    <Button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </Button>
  );
}
