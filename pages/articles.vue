<template>
    <div class="pa-5">
        <div v-if="loading">
            <Loading :active="loading"
                :can-cancel="false"
                :is-full-page="true"
                color="#007bff"
            />
        </div>
        <div v-else>
            <v-row align="center" class="mx-0">
                <v-col :cols="4" v-for="article, index in currentArticleList" :key="index">
                    <ArticleCard
                        :key="index"
                        :articleData="article"
                    />
                </v-col>
            </v-row>

            <v-pagination
                circle
                v-model="currentPage"
                :length="totalPages"
                @input="onPageNumberClick"
            ></v-pagination>
        </div>
    </div>
</template>

<script lang="ts">
// Library imports
import { Vue, Component } from 'vue-property-decorator'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

// Components imports
import ArticleCard from '~/components/article_card.vue'

// Utils and Interfaces imports
import { API_KEY, APIS } from '~/utils/globals'
import { ArticleObj } from '~/utils/interfaces'

@Component({
    components: {
        ArticleCard,
        Loading
    }
})
export default class Articles extends Vue {

    // Component data
    pageSize: number = 10
    currentPage: number = 1
    allArticleList: ArticleObj[] = []
    currentArticleList: ArticleObj[] = []
    loading: boolean = true
    $helper: any // To avoid Typescript errors related to type safety


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
        const startIndex = (this.currentPage - 1) * this.pageSize
        const lastIndex = this.pageSize + startIndex
        this.currentArticleList = this.$helper.objectDeepClone(this.allArticleList.slice(startIndex, lastIndex))
    }

    // Mounted hook to load the data when component finished initial render.
    mounted() {
        this.getAllData()
    }
}
</script>