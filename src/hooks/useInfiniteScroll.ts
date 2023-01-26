import { useEffect, type RefObject } from "react"
import useIntersectionObserver, { type Args as IntersectionObserverArgs } from "./useIntersectionObserver"

interface UseInfiniteScrollParams extends IntersectionObserverArgs {
    elementRef: RefObject<Element>
    isFetching: boolean
    hasMore: boolean
    fetchMore: () => void
    isDisabled?: boolean    
    delayInMs?: number
}

const useInfiniteScroll = ({
    elementRef,
    isFetching,
    hasMore,
    fetchMore,
    isDisabled,
    delayInMs = 50,
    ...observerConfig
}: UseInfiniteScrollParams) => {
    const entry = useIntersectionObserver(elementRef, observerConfig)

    const shouldLoadMore = !isDisabled && !isFetching && !!entry?.isIntersecting && hasMore 

    useEffect(() => {
        if (shouldLoadMore) {
            
            const setTimeoutId = setTimeout(() => {
                fetchMore()  
            }, delayInMs)
                    
            return () => {
                clearTimeout(setTimeoutId)
            }
        }
    }, [delayInMs, fetchMore, shouldLoadMore])

    return [elementRef, entry]
}

export default useInfiniteScroll