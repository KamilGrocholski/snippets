import clsx from "clsx"

interface SectionProps {
    children: JSX.Element | JSX.Element[]
    containerClassName?: string
    sectionClassName?: string
}

const Section: React.FC<SectionProps> = ({
    children,
    containerClassName,
    sectionClassName
}) => {
    return (
        <div
            className={clsx(
                'w-256 max-w-full mx-auto mb-0 bg-base-300 rounded-md',
                containerClassName
            )}
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
}

export default Section