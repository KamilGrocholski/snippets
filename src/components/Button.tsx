import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary'
}

const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({
    ...rest
}, ref) => {
    return (
        <button
            type='button'
            ref={ref}
            {...rest}
        >
            Button
        </button>
    )
})

Button.displayName = 'Button'

export default Button