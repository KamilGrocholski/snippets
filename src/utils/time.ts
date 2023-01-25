import { type SnippetsFilter } from "../server/api/schemes/schemes"

const DAY = 24 * 60 * 60 * 1000
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = MONTH * 12

export const TIME_VALUES = {
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export const FILTER_TIME_VALUES = {
    'All time': undefined,
    'Last year': YEAR,
    'Last month': MONTH,
    'Last week': WEEK,
    'Last day': DAY
} as const

export const parseFromDateFilterValue = (time: SnippetsFilter['time']) => {
    if (time === 'All time') return undefined
    const now = Date.now()
    return new Date(now - FILTER_TIME_VALUES[time]).toISOString()
}