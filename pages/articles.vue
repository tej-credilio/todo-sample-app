<template>
    <div class="pa-5">
        <div v-if="loading">
            <div v-for="item in 3" :key="item" class="mb-10"> <!-- show some random loading content while the data is loading -->
                <content-placeholders>
                    <content-placeholders-heading :img="true" />
                    <content-placeholders-text :lines="3" />
                </content-placeholders>
            </div>
        </div>
        <div v-else>
            <ArticleCard
                v-for="article, index in currentArticleList"
                :key="index"
                :articleData="article"
            />

            <v-pagination
                circle
                v-model="currentPage"
                :length="totalPages"
                @input="onPageNumberClick"
                @next="onNextClick"
                @previous="onPrevClick"
            ></v-pagination>
        </div>
    </div>
</template>

<script lang="ts">
// Library imports
import { Vue, Component } from 'vue-property-decorator'
import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)

// Components imports
import ArticleCard from '~/components/article_card.vue'

// Utils and Interfaces imports
import { API_KEY, APIS } from '~/utils/globals'
import { ArticleObj } from '~/utils/interfaces'

@Component({
    components: {
        ArticleCard
    }
})
export default class Articles extends Vue {

    // Component data
    pageSize: number = 10
    currentPage: number = 1
    allArticleList: ArticleObj[] = []
    currentArticleList: ArticleObj[] = []
    loading: boolean = true
    $helper: any


    // Computed Properties
    get totalPages(): number {
        return Math.ceil(this.allArticleList.length / this.pageSize)
    }


    // Methods
    async getAllData() {
        const { EVERYTHING } = APIS
        const params = {
            sources: "bbc-news",
            apiKey: API_KEY
        }
        try {
            const response = await this.$axios.get(EVERYTHING, {
                params
            })
            if (response?.data?.articles) {
                this.allArticleList = response.data.articles

                //reset all the data and pagination whenever all data is getting loaded.
                this.currentPage = 1
                this.setArticleListForCurrentPage()
            }
        } catch (error) {
          this.$toast.error("Error: " + error)
        }
        this.loading = false
    }

    setArticleListForCurrentPage() {
        this.currentArticleList = this.$helper.objectDeepClone(this.allArticleList.slice((this.currentPage - 1), this.pageSize))
    }

    onPageNumberClick(number: number) {
        this.currentPage = number
        const startIndex = this.currentPage - 1
        const lastIndex = this.pageSize + this.currentPage
        this.currentArticleList = this.$helper.objectDeepClone(this.allArticleList.slice(startIndex, lastIndex))
    }

    onNextClick() {
        // console.log("number:")
    }

    onPrevClick() {
    }

    // Mounted hook to load the data when component finished initial render.
    mounted() {
        this.getAllData()
    }
}
</script>