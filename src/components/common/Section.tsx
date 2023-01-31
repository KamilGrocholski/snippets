import clsx from "clsx"
import { forwardRef } from "react"

interface SectionProps {
    children: JSX.Element | JSX.Element[]
    containerClassName?: string
    sectionClassName?: string
    useBgColor?: boolean
    useSectionPadding?: boolean
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({
    children,
    containerClassName,
    sectionClassName,
    useBgColor = true,
    useSectionPadding = true,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'w-256 max-w-full mx-auto mb-0 rounded-md',
                useBgColor && 'bg-base-200',
                containerClassName
            )}
            {...props}
        >
            <section
                className={clsx(
                    useSectionPadding && 'p-3',
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