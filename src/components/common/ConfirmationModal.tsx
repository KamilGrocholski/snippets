import Button from "./Button"
import Modal, { type ModalProps } from "./Modal"

export type ConfirmationModalProps = {
    openState: ModalProps['openState']
} & {
    title: string;
    description: string;
    confirmationLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void
    icon?: React.ReactNode;
    variant?: "primary" | 'ghost' | 'danger';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    openState,
    title,
    description,
    confirmationLabel = "Okay",
    onConfirm,
    onCancel,
    icon,
    variant = "primary",
}) => {
    return (
        <Modal
            openState={openState}
        >
            <div className="overflow-hidden rounded-lg border border-base-300 bg-base-200 px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    {/* {icon && (
                        <div
                            className={clsx(
                                "mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:mx-0 sm:h-10 sm:w-10",
                                // {
                                //     "border-gray-700 bg-gray-600": variant === "primary",
                                //     "border-red-700 bg-red-600": variant === "danger",
                                // }
                            )}
                        >
                            icon
                        </div>
                    )} */}
                    <div className="text-center sm:text-left">
                        <Modal.Title as="h3" className="text-lg font-medium leading-6">
                            {title}
                        </Modal.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-400">{description}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex-row-reverse">
                    <Button
                        variant={variant}
                        className="w-full justify-center sm:w-auto sm:text-sm"
                        onClick={onConfirm}
                    >
                        {confirmationLabel}
                    </Button>
                    <Button
                        variant='ghost'
                        className="w-full justify-center sm:w-auto sm:text-sm"
                        onClick={onCancel}
                    // ref={cancelButtonRef}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmationModal