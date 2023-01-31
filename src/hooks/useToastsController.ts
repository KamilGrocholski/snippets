import useToastStore from "../store/toast-store"
import { shallow } from 'zustand/shallow'

const useToastsController = () => {
    const controls = useToastStore(
        store => ({
            add: store.add,
            remove: store.remove,
        }),
        shallow
    )

    return controls
}

export default useToastsController