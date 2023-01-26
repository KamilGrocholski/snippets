import { getRandomIntInclusive } from "./randomNumbers"

const DEFAULT_COLLECTION = 'abcdefghijklmnopqrstuvwxyz0123456789'

const generateRandomString = (length: number, collection = DEFAULT_COLLECTION): string => {
    let randomString = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomIntInclusive(0, collection.length)
        randomString += collection.charAt(randomIndex)
    }

    return randomString
}

export default generateRandomString