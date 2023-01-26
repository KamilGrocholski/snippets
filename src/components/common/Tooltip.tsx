import { forwardRef, type HTMLAttributes } from "react"
import clsx from "clsx"
import { type Keys } from "../../types/helpers"

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    variant?: Keys<typeof VARIANT>
    size?: Keys<typeof SIZE>
    className?: string
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        className,
        children
    } = props

    return (
        <div
            className={clsx(
                VARIANT[variant],
                SIZE[size],
                className
            )}
            ref={ref}
        >
            {children}
        </div>
    )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip

const VARIANT = {
    primary: 'bg-neutral',
    'primary-reversed': ''
} as const

const SIZE = {
    xs: '',
    sm: '',
    md: 'px-3 py-3 rounded-md',
    lg: '',
} as const