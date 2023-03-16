import moment from "moment"

const helper = {
    getCurrentTimeInMS: () => {
        return Date.now()
    },

    objectDeepClone: (obj: object = {}) => {
        if (typeof obj === "object") {
            return JSON.parse(JSON.stringify(obj))
        }
        return obj
    },

    formatPublishDate: (date: string) => {
        return moment(date).format("Do MMMM YYYY")
    }
}

export default (context, inject) => {
    inject('helper', helper)
}