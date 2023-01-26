import { useEffect, useState } from "react"

const useDebounce = <T>(value: T, delay = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(setTimeoutId)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce