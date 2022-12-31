import { createStyles, MantineColor, MantineNumberSize, getStylesRef } from '@mantine/styles';

const sizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 30,
  xl: 36,
};

export interface CheckboxStylesParams {
  radius: MantineNumberSize;
  color: MantineColor;
  transitionDuration: number;
  labelPosition: 'left' | 'right';
  error: boolean;
  indeterminate: boolean;
}

export default createStyles(
  (
    theme,
    {
      radius,
      color,
      transitionDuration,
      labelPosition,
      error,
      indeterminate,
    }: CheckboxStylesParams,
    { size }
  ) => {
    const _size = theme.fn.size({ size, sizes });
    const colors = theme.fn.variant({ variant: 'filled', color });

    return {
      icon: {
        ref: getStylesRef('icon'),
        color: indeterminate ? 'inherit' : theme.white,
        transform: indeterminate ? 'none' : 'translateY(5px) scale(0.5)',
        opacity: indeterminate ? 1 : 0,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'ease',
        transitionDuration: `${transitionDuration}ms`,
        pointerEvents: 'none',
        width: '60%',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',

        '@media (prefers-reduced-motion)': {
          transitionDuration: theme.respectReducedMotion ? '0ms' : undefined,
        },
      },

      inner: {
        position: 'relative',
        width: _size,
        height: _size,
        order: labelPosition === 'left' ? 2 : 1,
      },

      input: {
        ...theme.fn.focusStyles(),
        appearance: 'none',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        border: `1px solid ${
          error
            ? theme.fn.variant({ variant: 'filled', color: 'red' }).background
            : theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
        width: _size,
        height: _size,
        borderRadius: theme.fn.radius(radius),
        padding: 0,
        display: 'block',
        margin: 0,
        transition: `border-color ${transitionDuration}ms ease, background-color ${transitionDuration}ms ease`,
        cursor: theme.cursorType,

        '&:checked': {
          backgroundColor: colors.background,
          borderColor: colors.background,

          [`& + .${getStylesRef('icon')}`]: {
            opacity: 1,
            color: theme.white,
            transform: 'translateY(0) scale(1)',
          },
        },

        '&:disabled': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
          cursor: 'not-allowed',

          [`& + .${getStylesRef('icon')}`]: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
          },
        },
      },
    };
  }
);
