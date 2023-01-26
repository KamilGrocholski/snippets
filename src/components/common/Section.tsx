import clsx from "clsx"
import { forwardRef } from "react"

interface SectionProps {
    children: JSX.Element | JSX.Element[]
    containerClassName?: string
    sectionClassName?: string
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({
    children,
    containerClassName,
    sectionClassName,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'w-256 max-w-full mx-auto mb-0 bg-base-300 rounded-md',
                containerClassName
            )}
            {...props}
        >
            <section
                className={clsx(
                    'p-4',
                    sectionClassName
                )}
            >
                {children}
            </section>
        </div>
    )
})

Section.displayName = 'Section'

export default Section