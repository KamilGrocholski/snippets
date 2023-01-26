import clsx from "clsx"
import { forwardRef, type InputHTMLAttributes } from "react"
import { type Keys } from "../../types/helpers"

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: Keys<typeof VARIANT>
    label?: string
    labelClassName?: string
    sizeInput?: Keys<typeof SIZE>
    errorMessage?: string
    errorMessageClassName?: string
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => {
    const {
        variant = 'primary',
        sizeInput = 'md',
        label,
        labelClassName,
        errorMessage,
        errorMessageClassName
    } = props

    return (
        <div className='flex flex-col w-fit items-center'>
            <div className='flex flex-row space-x-3'>
                {label ? <label className={clsx('mb-0.5', labelClassName)}>{label}</label> : null}
                <input
                    type='checkbox'
                    className={clsx(
                        'border-none',
                        VARIANT[variant],
                        SIZE[sizeInput],
                    )}
                    {...props}
                    ref={ref}
                />
            </div>
            {errorMessage ? <span className={clsx('text-sm text-error', errorMessageClassName)}>{errorMessage}</span> : null}
        </div>
    )
})

CheckboxInput.displayName = 'CheckboxInput'

export default CheckboxInput

const VARIANT = {
    primary: 'form-checkbox text-primary flex bg-neutral px-1 shadow-sm rounded-sm',
} as const

const SIZE = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
} as const