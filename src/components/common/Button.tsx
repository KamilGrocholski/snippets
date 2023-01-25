import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof BUTTON_VARIANT
    outline?: boolean
    disabled?: boolean
    size?: keyof typeof BUTTON_SIZE
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
    primary: 'text-white border-pink-700 bg-pink-600 hover:bg-pink-700 hover:border-pink-800 shadow-sm',
    'primary-inverted': 'text-pink-600 border-transparent bg-white hover:bg-pink-50 shadow-sm',
    ghost: '',
} as const

const BUTTON_SIZE = {
    xs: 'text-xs px-2.5 py-1.5 rounded',
    sm: 'text-sm px-3 py-2 leading-4 rounded',
    md: 'text-sm px-4 py-2 rounded',
    lg: 'text-md px-4 py-2 rounded-md'
} as const

