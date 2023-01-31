import { Fragment, useEffect } from "react"
import { type ToastId } from "../../store/toast-store"
import useToastStore from "../../store/toast-store"
import { type Keys } from "../../types/helpers"
import clsx from "clsx"
import UiIcons from "../../assets/UiIcons"
import { Transition } from "@headlessui/react"

interface ToastProps {
    id: ToastId
    duration?: number
    content: React.ReactNode
    variant: Keys<typeof TOAST_VARIANT>
}

const toasts: ToastProps[] = [
    {
        id: 'remove-snippet-success',
        content: 'The snippet has been removed!',
        variant: 'success'
    },
    {
        id: 'remove-snippet-error',
        content: 'An error during the snippet removal.',
        variant: 'error'
    },
    {
        id: 'add-snippet-success',
        content: 'A snippet has been added!',
        variant: 'success'
    },
    {
        id: 'add-snippet-error',
        content: 'An error during the snippet addition.',
        variant: 'error'
    },
    {
        id: 'update-profile-success',
        content: 'Your profile has been updated!',
        variant: 'success'
    },
    {
        id: 'update-profile-error',
        content: "We couldn't update your profile.",
        variant: 'error'
    },
    {
        id: 'update-snippet-success',
        content: 'The snippet has been updated!',
        variant: 'success'
    },
    {
        id: 'update-snippet-error',
        content: "We couldn't update your snippet.",
        variant: 'error'
    }
]

const ToastContainer = () => {
    return (
        <div className='fixed bottom-0 right-0 p-3 flex flex-col space-y-3'>
            {toasts.map((toast) => (
                <Toast {...toast} key={toast.id} />
            ))}
        </div>
    )
}

const Toast: React.FC<ToastProps> = ({
    id,
    duration = 5000,
    content,
    variant
}) => {
    const { remove, toasts } = useToastStore()

    const isShown = toasts.has(id)

    useEffect(() => {
        if (!isShown) return
        const timeoutId = setTimeout(() => remove(id), duration)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [duration, id, isShown, remove])

    return (
        <Transition.Root show={isShown} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div className={clsx(
                    'w-full h-fit p-3 flex gap-2 items-start rounded-md',
                    TOAST_VARIANT[variant]
                )}>
                    <span>{ICON[variant]}</span>
                    <span className='break-words'>{content}</span>
                </div>
            </Transition.Child>
        </Transition.Root>
    )
}

const TOAST_VARIANT = {
    error: 'bg-error text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-white'
} as const

const ICON = {
    error: UiIcons.exclamationCircle,
    success: UiIcons.checkCircle,
    info: UiIcons.informationCircle
} as const

export default ToastContainer