import { Form as AntdForm, Tooltip as AntdToolTip, TooltipProps } from 'antd';
import React from 'react';

type DefaultFormProps = React.ComponentPropsWithoutRef<typeof AntdForm>;
const Form = (props: DefaultFormProps) => {
  const { children } = props;
  return <AntdForm {...props}>{children}</AntdForm>;
};

type DefaultFormItemProps = React.ComponentPropsWithoutRef<
  typeof AntdForm.Item
> & {
  children: React.ReactNode;
  helpPosition?: TooltipProps['placement'];
  helpColor?: TooltipProps['color'];
};
const Item = (props: DefaultFormItemProps) => {
  const {
    children,
    help,
    helpColor = 'red',
    helpPosition,
    ...restProps
  } = props;
  return (
    <AntdForm.Item {...restProps}>
      <AntdToolTip
        title={help}
        color={helpColor}
        placement={helpPosition}
        className={!!help ? 'icc-has-error' : undefined}
      >
        {children}
      </AntdToolTip>
    </AntdForm.Item>
  );
};
Form.Item = Item;

export { Form };
