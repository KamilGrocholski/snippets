const createBlobUrl = (value: string) => {
    const blob = new Blob([value], {
        type: 'text/plain'
    })

    const url = URL.createObjectURL(blob)

    return url
}

export default createBlobUrl