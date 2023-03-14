export const getCurrentTimeInMS = () => {
    return Date.now()
}

export const objectDeepClone = (obj = {}) => {
    if (typeof obj === "object") {
        return JSON.parse(JSON.stringify(obj))
    }
    return obj
}