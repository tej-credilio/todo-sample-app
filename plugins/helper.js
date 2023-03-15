import { inject } from "vue"

import moment from "moment"

const helper = {
    getCurrentTimeInMS: () => {
        return Date.now()
    },

    objectDeepClone: (obj = {}) => {
        if (typeof obj === "object") {
            return JSON.parse(JSON.stringify(obj))
        }
        return obj
    },

    formatPublishDate: (date) => {
        return moment(date).format("Do MMMM YYYY")
    }
}

export default (context, inject) => {
    inject('helper', helper)
}