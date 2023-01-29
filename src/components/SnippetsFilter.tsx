import { useRouter } from "next/router"
import React, { useState } from "react"
import { type SnippetsFilter } from "../server/api/schemes/schemes"
import { type Language, TIMES, LANGUAGES_FILTER, type LanguageFilter, type Times } from "../utils/constants"
import { object } from "../utils/objectThings"
import Button from "./common/Button"
import Select from "./common/Select"
import TextInput from "./common/TextInput"

const NO_LANGUAGE_SELECTED = 'All languages' as const

export const initialFilterState = {
    time: 'All time' as Times,
    language: 'All languages' as LanguageFilter,
    search: ''
}

const SnippetsFilter: React.FC<{
    // filter: ReturnType<typeof useSnippetsFilter>,
    onSearch?: (filter: typeof initialFilterState) => void
}> = ({
    // filter,
    onSearch
}) => {
        const router = useRouter()

        const filterQuery = router.query as typeof initialFilterState

        const [localFilter, setLocalFilter] = useState(object.isEmpty(filterQuery) ? initialFilterState : filterQuery)

        const handleSetLocalFilter = (key: keyof typeof localFilter, value: typeof localFilter[keyof typeof localFilter]) => {
            setLocalFilter(prev => ({
                ...prev,
                [key]: value
            }))
        }

        const applyFilter = () => {
            void router.push({
                pathname: '/snippets',
                query: {
                    time: localFilter.time,
                    language: localFilter.language,
                    search: localFilter.search
                }
            }, undefined, {
                shallow: true
            })
        }

        const handleSearch = (e: React.FormEvent) => {
            e.nativeEvent.preventDefault()
            e.preventDefault()
            applyFilter()
            onSearch && onSearch(localFilter)
        }

        const handleReset = (e: React.FormEvent) => {
            e.nativeEvent.preventDefault()
            e.preventDefault()
            setLocalFilter(initialFilterState)
        }

        return (
            <form className='flex lg:flex-row flex-col items-center w-full gap-2'>
                <TextInput
                    placeholder="Search…"
                    value={localFilter.search}
                    onChange={e => handleSetLocalFilter('search', e.target.value)}
                />
                <Select
                    options={TIMES}
                    extractKey={(option, index) => option + ' ' + index.toString()}
                    extractValue={(option) => option}
                    selected={localFilter.time}
                    setSelected={(option) => handleSetLocalFilter('time', option)}
                />
                <Select
                    options={LANGUAGES_FILTER}
                    extractKey={(option, index) => option ?? NO_LANGUAGE_SELECTED + ' ' + index.toString()}
                    extractValue={(option) => option ?? NO_LANGUAGE_SELECTED}
                    selected={localFilter.language as Language}
                    setSelected={(option) => handleSetLocalFilter('language', option)}
                />

                <Button
                    type='submit'
                    onClick={handleSearch}
                >
                    <span>Search</span>
                </Button>
                <Button
                    type='reset'
                    onClick={handleReset}
                    variant='ghost'
                >
                    Reset
                </Button>
            </form>
        )
    }

export default SnippetsFilter