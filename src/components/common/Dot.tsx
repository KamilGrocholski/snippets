import clsx from "clsx"
import { type Keys } from "../../types/helpers"

const Dot: React.FC<{
    size?: Keys<typeof SIZE>
    className?: string
}> = ({
    size = 'md',
    className
}) => {
        return (
            <div
                className={clsx(
                    'bg-base-300 rounded-full',
                    SIZE[size],
                    className
                )}
            />
        )
    }

export default Dot

const SIZE = {
    xs: 'w-0.5',
    sm: 'w-0.75',
    md: 'w-1 h-1',
    lg: 'w-2 h-2'
} as const