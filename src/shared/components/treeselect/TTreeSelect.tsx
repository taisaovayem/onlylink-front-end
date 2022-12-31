import { TreeSelect } from "antd";
import * as React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type DefaultSelectProps = React.ComponentPropsWithoutRef<typeof TreeSelect>;
type TSelectProps<T extends FieldValues> = Omit<
  DefaultSelectProps,
  "name" | "defaultValue" | "onChange" | "onBlur"
> &
  UseControllerProps<T>;

const { TreeNode } = TreeSelect;

const TTreeSelect = <T extends FieldValues>(props: TSelectProps<T>) => {
  const { name, control, defaultValue, shouldUnregister, ...restProps } = props;
  const { field } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
  });
  return <TreeSelect {...restProps} {...field} />;
};

TTreeSelect.TreeNode = TreeNode;

export { TTreeSelect };
