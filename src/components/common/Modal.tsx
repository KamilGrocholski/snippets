import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export interface ModalProps {
    openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    initialFocus?: React.MutableRefObject<null>
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> & {
    Title: typeof Dialog.Title
    Description: typeof Dialog.Description
} = ({
    openState,
    initialFocus,
    children,
}) => {
        const [open, setOpen] = openState

        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='fixed inset-0 z-50 overflow-y-auto'
                    initialFocus={initialFocus}
                    onClose={setOpen}
                >
                    <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-base-300/75 transition-opacity' />
                        </Transition.Child>
                        <span
                            className="hidden sm:inline-block sm:h-screen sm:align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block text-left align-bottom sm:align-middle">
                                {children}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

export default Modal

Modal.Title = Dialog.Title
Modal.Description = Dialog.Description