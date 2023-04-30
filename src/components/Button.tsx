import {FC, HTMLProps, PropsWithChildren} from 'react'

export enum Style {
    DEFAULT,
    PRIMARY,
    SECONDARY,
    WARNING,
    DANGER,
}

interface ButtonProps {
    variant?: Style
    disabled?: boolean
}

const Button: FC<ButtonProps & HTMLProps<HTMLButtonElement>> = (
    {
        variant  = Style.DEFAULT,
        disabled = false,
        children,
        ...props
    }
) => {
    const classes = {
        [Style.DEFAULT]: 'text-black bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 ring-1 ring-inset',
        [Style.PRIMARY]: '',
        [Style.SECONDARY]: '',
        [Style.WARNING]: '',
        [Style.DANGER]: 'text-white bg-red-600 hover:bg-red-500',
    }

    return (
        <button
            {...props}
            type="button"
            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${classes[variant]} ${props.className}`}
        >
            {children}
        </button>
    )
}

export default Button