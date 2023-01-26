import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { type Keys } from "../../types/helpers";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Keys<typeof BUTTON_VARIANT>
    outline?: boolean
    disabled?: boolean
    size?: Keys<typeof BUTTON_SIZE>
}

interface ButtonContentProps {
    loading?: boolean
    children?: React.ReactNode
}

const ButtonContent: React.FC<ButtonContentProps> = ({
    loading,
    children
}) => {
    return (
        <>
            {loading ? (
                <span><LoadingSpinner className='h-5 w-5' /> </span>
            ) : null}
            <span
                className={clsx(
                    loading && 'invisible'
                )}
            >
                {children}
            </span>
        </>
    )
}

const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        disabled,
        className,
        ...rest
    } = props

    return (
        <button
            type='button'
            className={clsx(
                'transition-all duration-100 ease-in-out',
                BUTTON_SIZE[size],
                BUTTON_VARIANT[variant],
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            disabled={disabled}
            aria-disabled={disabled}
            ref={ref}
            {...rest}
        >
            <ButtonContent {...props} />
        </button>
    )
})

Button.displayName = 'Button'

export default Button

const BUTTON_VARIANT = {
    primary: 'text-white bg-primary hover:bg-primary/80 shadow-sm active:scale-95 active:shadow-lg',
    'primary-reversed': 'text-primary bg-neutral hover:bg-primary shadow-sm hover:text-neutral',
    ghost: 'text-white bg-transtapernt hover:bg-neutral',
} as const

const BUTTON_SIZE = {
    xs: 'text-xs px-1.5 py-1 rounded',
    sm: 'text-sm px-3 py-2 leading-4 rounded',
    md: 'text-sm px-4 py-2 rounded',
    lg: 'text-md px-4 py-2 rounded-md'
} as const

