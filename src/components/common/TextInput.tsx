import clsx from "clsx"
import { forwardRef, type InputHTMLAttributes } from "react"
import { type Keys } from "../../types/helpers"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  sizeTotal?: Keys<typeof SIZE>
  variant?: Keys<typeof VARIANT>
  label?: string
  labelPosition?: 'left' | 'top'
  labelClassName?: string
  errorMessage?: string
  errorMessageClassName?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  sizeTotal = 'md',
  variant = 'primary',
  label,
  labelClassName,
  errorMessage,
  errorMessageClassName,
  className,
  ...rest
}, ref) => {
  return (
    <div className={clsx(
      'flex flex-col',
    )}>
      {label ? <label className={clsx(labelClassName)}>{label}</label> : null}
      {errorMessage ? <span className={clsx('text-sm text-error', errorMessageClassName)}>{errorMessage}</span> : null}
      <input
        type='text'
        className={clsx(
          SIZE[sizeTotal],
          VARIANT[variant],
          className
        )}
        {...rest}
        ref={ref}
      />
    </div>
  )
})

TextInput.displayName = 'TextInput'

export default TextInput

const VARIANT = {
  primary: 'text-white flex rounded-md bg-neutral px-1 shadow-sm',
} as const

const SIZE = {
  xs: 'text-xs pl-2.5 py-1.5 rounded',
  sm: 'text-sm pl-3 py-2 leading-4 rounded',
  md: 'text-sm w-64 pl-4 py-2 rounded',
  lg: 'text-md pl-4 py-2 rounded-md'
} as const