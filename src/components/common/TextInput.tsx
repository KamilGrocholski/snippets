import clsx from "clsx"
import { forwardRef, type InputHTMLAttributes } from "react"

type Keys<T extends { [key: string]: unknown }> = keyof T

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  sizeTotal?: Keys<typeof SIZE>
  variant?: Keys<typeof VARIANT>
  bordered?: boolean
  label?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  sizeTotal = 'sm',
  variant = 'primary',
  bordered,
  label,
  className,
  ...rest
}, ref) => {
  return (
    <div className='form-control'>
      <label className='label'>{label}</label>
      <input
        type='text'
        className={clsx(
          'input input-xs w-full max-w-xs',
          bordered && 'input-bordered',
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
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  ghost: 'input-ghost',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
} as const

const SIZE = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg'
} as const