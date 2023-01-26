const getStringLengthInBytes = (value: string) => {
    const bytes = Buffer.byteLength(value, 'utf-8')

    return bytes
}

export default getStringLengthInBytes