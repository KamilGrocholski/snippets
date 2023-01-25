import LoaderSpinner from '../LoadingSpinner'

interface StateWrapperProps<T> {
    isLoading: boolean
    isError: boolean
    isEmpty?: boolean
    data: T
    NonEmpty: (data: NonNullable<T>) => JSX.Element
    Empty?: React.ReactNode
    Loading?: React.ReactNode
    Error?: React.ReactNode
}

const StateWrapper = <T,>({
    isLoading,
    isError,
    isEmpty,
    data,
    NonEmpty,
    Empty,
    Loading,
    Error,
}: StateWrapperProps<T>) => {
    if (isLoading) return <>{Loading ?? DefaultLoading}</>

    if (isError) return <>{Error ?? DefaultError}</>

    if (isEmpty) return <>{Empty ?? DefaultEmpty}</>

    if (Array.isArray(data) && data.length <= 0) return <>{Empty ?? DefaultEmpty}</>

    if (data === undefined || data === null) return <>{Empty ?? DefaultEmpty}</>
    return NonEmpty(data)
}

export default StateWrapper

const DefaultLoading = <div><LoaderSpinner className='h-24 w-24' /></div>
const DefaultError = <div>Error</div>
const DefaultEmpty = <div>Empty</div>