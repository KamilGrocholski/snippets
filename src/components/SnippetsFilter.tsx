import React, { useState } from "react"
import { SNIPPETS_FILTER } from "../server/api/schemes/schemes"
import { type SnippetsFilter } from "../server/api/schemes/schemes"
import Button from "./common/Button"

export const initialFilterState: SnippetsFilter = {
    time: 'All time',
    language: 'All',
    search: ''
}

export const useSnippetsFilter = () => {
    const [filter, setFilter] = useState<SnippetsFilter>(initialFilterState)

    const setTime = (time: SnippetsFilter['time']) => {
        setFilter(prev => ({
            ...prev,
            time
        }))
    }

    const setLanguage = (language: SnippetsFilter['language']) => {
        setFilter(prev => ({
            ...prev,
            language
        }))
    }

    const setSearch = (search: SnippetsFilter['search']) => {
        setFilter(prev => ({
            ...prev,
            search
        }))
    }

    const resetFilter = () => setFilter(initialFilterState)

    return {
        state: filter,
        dispatch: {
            setTime,
            setLanguage,
            setSearch,
            resetFilter,
        },
        setFilter
    }
}

const SnippetsFilter: React.FC<{
    // filter: ReturnType<typeof useSnippetsFilter>,
    onSearch: (filter: ReturnType<typeof useSnippetsFilter>['state']) => void
}> = ({
    // filter,
    onSearch
}) => {
        const { state, dispatch } = useSnippetsFilter()

        const handleSearch = (e: React.FormEvent) => {
            e.nativeEvent.preventDefault()
            e.preventDefault()
            onSearch(state)
            console.log({ state })
        }

        const handleReset = (e: React.FormEvent) => {
            e.nativeEvent.preventDefault()
            e.preventDefault()
            dispatch.resetFilter()
        }

        return (
            <form className='flex gap-2 w-256 mx-auto my-2'>
                <input
                    type="text"
                    placeholder="Search…"
                    className="input input-sm input-bordered"
                    value={state.search}
                    onChange={e => dispatch.setSearch(e.target.value)}
                />

                <select
                    className='select select-primary select-sm'
                    onChange={(e) => dispatch.setTime(e.target.value as SnippetsFilter['time'])}
                    value={state.time}
                >
                    {SNIPPETS_FILTER.time.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>

                <select
                    className='select select-primary select-sm'
                    onChange={(e) => dispatch.setLanguage(e.target.value)}
                    value={state.language ?? 'Language'}
                >
                    <option className='font-bold border-primary border-b'>Language</option>
                    {SNIPPETS_FILTER.language.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>

                <button
                    type='submit'
                    className="btn btn-sm btn-primary flex flex-row space-x-3 items-center"
                    onClick={handleSearch}
                >
                    <span>Search</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></span>
                </button>
                <Button
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </form>
        )
    }

export default SnippetsFilter