import { FC, HTMLProps, PropsWithChildren } from 'react';

export enum Style {
  DEFAULT,
  PRIMARY,
  SECONDARY,
  WARNING,
  DANGER,
}

interface ButtonProps {
  size: 'small' | 'default' | 'large' | undefined;
  variant?: Style;
  disabled?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = Style.DEFAULT,
  size = 'default',
  disabled = false,
  children,
  ...props
}) => {
  const classes = {
    [Style.DEFAULT]:
      'text-black bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 ring-inset',
    [Style.PRIMARY]: '',
    [Style.SECONDARY]: '',
    [Style.WARNING]: '',
    [Style.DANGER]: 'text-white bg-red-600 hover:bg-red-500',
    small: 'px-2 py-2',
    default: 'px-3 py-3',
    large: 'px-4 py-4',
  } as const;

  return (
    <button
      {...props}
      type="button"
      className={`inline-flex w-full justify-center rounded-md text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${classes[variant]} ${classes[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
