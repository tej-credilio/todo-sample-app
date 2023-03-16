export const state = () => ({
    selectedArticle: {}
})

export const getters = {
    getSelectedArticle(state) {
        return state.selectedArticle
    }
}

export const mutations = {
    SET_SELECTED_ARTICLES(state, { articleData }) {
        state.selectedArticle = Object.assign({}, articleData)
    }
}

export const actions = {
    // actions
}