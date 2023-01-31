import { create } from 'zustand'

export type ToastId = 
    'add-snippet-success'
    | 'add-snippet-error' 
    | 'remove-snippet-success'
    | 'remove-snippet-error'
    | 'update-snippet-success'
    | 'update-snippet-error'
    | 'update-profile-success'
    | 'update-profile-error'

interface ToastStoreState {
    toasts: Set<ToastId>

    add: (id: ToastId) => void
    remove: (id: ToastId) => void 
}

const useToastStore = create<ToastStoreState>(set => ({
    toasts: new Set(),

    add: (id) => set((state) => {
        const newToasts = state.toasts
        newToasts.add(id)

        return {
            ...state,
            toasts: newToasts
        }
    }),

    remove: (id) => set((state) => {
        const newToasts = state.toasts
        newToasts.delete(id)

        return {
            ...state,
            newToasts
        }
    }) 
}))

export default useToastStore
