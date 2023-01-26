import React, { useState } from "react"
import { type SnippetsFilter } from "../server/api/schemes/schemes"
import { type Language, TIMES, LANGUAGES_FILTER, type LanguageFilter, type Times } from "../utils/constants"
import Button from "./common/Button"
import Select from "./common/Select"
import TextInput from "./common/TextInput"

const NO_LANGUAGE_SELECTED = 'All languages' as const

export const initialFilterState = {
    time: 'All time' as Times,
    language: undefined as LanguageFilter,
    search: ''
}

export const useSnippetsFilter = () => {
    const [filter, setFilter] = useState(initialFilterState)

    const setTime = (time: Times) => {
        setFilter(prev => ({
            ...prev,
            time
        }))
    }

    const setLanguage = (language: LanguageFilter) => {
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
            <form className='flex gap-2'>
                <TextInput
                    placeholder="Search…"
                    value={state.search}
                    onChange={e => dispatch.setSearch(e.target.value)}
                />
                <Select
                    options={TIMES}
                    extractKey={(option, index) => option + ' ' + index.toString()}
                    extractValue={(option) => option}
                    selected={state.time}
                    setSelected={(option) => dispatch.setTime(option)}
                />
                <Select
                    options={LANGUAGES_FILTER}
                    extractKey={(option, index) => option ?? NO_LANGUAGE_SELECTED + ' ' + index.toString()}
                    extractValue={(option) => option ?? NO_LANGUAGE_SELECTED}
                    selected={state.language as Language}
                    setSelected={(option) => dispatch.setLanguage(option)}
                />

                <Button
                    type='submit'
                    onClick={handleSearch}
                >
                    <span>Search</span>
                </Button>
                <Button
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </form>
        )
    }

export default SnippetsFilter