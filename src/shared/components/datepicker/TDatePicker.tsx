import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

type DefaultDatePickerProps = React.ComponentPropsWithoutRef<typeof DatePicker>;
type TDatePickerProps<T extends FieldValues> = Omit<
  DefaultDatePickerProps,
  "name" | "defaultValue" | "onChange" | "onBlur" | "ref"
> &
  UseControllerProps<T>;
const TDatePicker = <T extends FieldValues>(props: TDatePickerProps<T>) => {
  const {
    name,
    control,
    defaultValue,
    shouldUnregister,
    format = "DD/MM/yyyy",
    ...restProps
  } = props;
  const {
    field: { onChange, value, ...restFields },
  } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
  });

  const transform = React.useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      input: (value: any) => {
        return value && moment(value, "YYYY-MM-DD");
      },
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      output: (value: any) => {
        if (restProps.picker === "year") {
          return value?.isValid() && moment(value).year();
        }
        return value?.isValid() && value.format("YYYY-MM-DD");
      },
    };
  }, [restProps.picker]);

  return (
    <DatePicker
      onChange={(valueZ) => onChange(transform.output(valueZ))}
      value={transform.input(value)}
      style={{ width: "100%" }}
      format={format}
      {...restProps}
      {...restFields}
    />
  );
};

export { TDatePicker };
