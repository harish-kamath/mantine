/* eslint-disable react/no-unused-prop-types */
import React, { forwardRef } from 'react';
import { DefaultProps, MantineSize, Selectors, useComponentDefaultProps } from '@mantine/styles';
import { Box } from '../../Box';
import useStyles from './InputLabel.styles';

export type InputLabelStylesNames = Selectors<typeof useStyles>;

export interface InputLabelProps
  extends DefaultProps<InputLabelStylesNames>,
    React.ComponentPropsWithoutRef<'label'> {
  variant?: string;

  /** Label content */
  children?: React.ReactNode;

  /** Label root element */
  labelElement?: 'label' | 'div';

  /** Determines whether required asterisk should be displayed */
  required?: boolean;

  /** Predefined label size */
  size?: MantineSize;

  __staticSelector?: string;
}

const defaultProps: Partial<InputLabelProps> = {
  labelElement: 'label',
  size: 'sm',
};

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>((props, ref) => {
  const {
    labelElement,
    children,
    required,
    size,
    classNames,
    styles,
    unstyled,
    className,
    htmlFor,
    __staticSelector,
    variant,
    ...others
  } = useComponentDefaultProps('InputLabel', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    name: ['InputWrapper', __staticSelector],
    classNames,
    styles,
    unstyled,
    variant,
    size,
  });

  return (
    <Box<'label'>
      component={labelElement as 'label'}
      ref={ref}
      className={cx(classes.label, className)}
      htmlFor={labelElement === 'label' ? htmlFor : undefined}
      {...others}
    >
      {children}
      {required && (
        <span className={classes.required} aria-hidden>
          {' *'}
        </span>
      )}
    </Box>
  );
});

InputLabel.displayName = '@mantine/core/InputLabel';
