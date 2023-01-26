import prettyBytes from 'pretty-bytes'

const formatBytes = (bytes: number) => {
    return prettyBytes(bytes, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    })
}

export default formatBytes