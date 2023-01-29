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

export interface ButtonContentProps {
    loading?: boolean
    children?: React.ReactNode
    icon?: React.ReactNode
    iconPosition?: 'start' | 'end'
    iconClassName?: string
}

const ButtonContent: React.FC<ButtonContentProps> = ({
    loading,
    children,
    icon,
    iconPosition = 'start',
    iconClassName
}) => {
    return (
        <>
            {loading ? (
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <LoadingSpinner className='h-5 w-5' />
                </span>
            ) : null}
            {icon && iconPosition === 'start' ?
                <span className={clsx(
                    'mr-2 text-neutral',
                    iconClassName
                )}>{icon}</span> : null}
            <span
                className={clsx(
                    loading ? 'invisible' : ''
                )}
            >
                {children}
            </span>
            {icon && iconPosition === 'end' ?
                <span className={clsx(
                    'ml-2 text-neutral',
                    iconClassName
                )}>{icon}</span> : null}
        </>
    )
}

const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps & ButtonContentProps
>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        disabled,
        loading,
        className,
        ...rest
    } = props

    return (
        <button
            type='button'
            className={clsx(
                'z-0 relative transition-all duration-100 ease-in-out inline-flex items-center font-medium',
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
    lg: 'text-md px-4 py-2 rounded-md',
    'supa-large': 'text-2xl px-8 py-4 rounded-md w-full'
} as const

