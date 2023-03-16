<template>
    <div class="page-wrapper">
        <v-img
            height="600"
            lazy-src="https://via.placeholder.com/600"
            :src="selectedArticle.urlToImage"
        ></v-img>
        <div class="pa-16">
            <h1 class="page-heading">{{ selectedArticle.title || "--" }}</h1>
            <div class="py-5 text-h6">
                <div><span class="font-weight-light">Author</span>: {{ selectedArticle.author || "--" }}</div>
                <div><span class="font-weight-light">Published On</span>: {{ formattedPublishDate || "--" }}</div>
            </div>
            <div>
                <div class="text-subtitle-1">Article Detail:</div>
                <p class="text-justify text-h6">{{ selectedArticle.content }}</p>
            </div>
            <div>
                <p class="text-justify"><a :href="selectedArticle.url" target="_blank" rel="noopener noreferrer">Read Full Article</a></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// Library imports
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'

// Utils and Interfaces imports
import { ArticleInterface } from '~/utils/interfaces'

// Vuex imports
import { mapMutations, mapState } from 'vuex'

@Component({
    computed: {
        ...mapState([
            'selectedArticle'
        ])
    }
})
export default class ArticleDetail extends Vue {

    $helper: any // To avoid Typescript errors related to type safety

    // Props


    // Component Data


    //Computed Properties
    protected selectedArticle!: ArticleInterface // To avoid Typescript errors related to type safety

    get formattedPublishDate() {
        return this.selectedArticle ? this.$helper.formatPublishDate(this.selectedArticle.publishedAt) : ""
    }

    //All methods

}
</script>

<style lang="scss" scoped>
.page-heading {
    color: $bio-indigo;
}
</style>