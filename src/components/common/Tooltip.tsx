import { forwardRef, type HTMLAttributes } from "react"
import clsx from "clsx"
import { type Keys } from "../../types/helpers"

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    variant?: Keys<typeof VARIANT>
    size?: Keys<typeof SIZE>
    className?: string
    position?: 'top'
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        position = 'top',
        className,
        children
    } = props

    return (
        <div
            className={clsx(
                'absolute z-40',
                VARIANT[variant],
                SIZE[size],
                POSITION[position],
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

const POSITION = {
    top: '-translate-x-1/2 -translate-y-1/2'
} as const