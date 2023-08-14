const shortenString = (str) => {
    if (str.length <= 10) {
        return str // no need to shorten
    }

    const start = str.slice(0, 6)
    const end = str.slice(-4)

    return `${start}...${end}`
}

export default shortenString
