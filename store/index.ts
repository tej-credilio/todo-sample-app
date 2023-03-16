import { ArticleInterface } from "~/utils/interfaces"

export const state = () => ({
    selectedArticle: {} as Record<string, unknown>
})

export const getters = {
    getSelectedArticle(state: Record<string, unknown>) {
        return state.selectedArticle
    }
}

export const mutations = {
    SET_SELECTED_ARTICLES(state : Record<string, unknown>, data: { articleData: ArticleInterface }) {
        state.selectedArticle = Object.assign({}, data.articleData)
    }
}

export const actions = {
    // actions
}