<template>
    <div v-if="articleData" class="mb-5">
        <v-card
            class="d-flex flex-column"
            max-width="374"
            min-height="500"
        >
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>
            <v-img
                height="250"
                :src="articleData.urlToImage"
            ></v-img>
            <v-card-title @click="setSelectedArticleData" class="card-title">{{ articleData.title }}</v-card-title>
            <v-card-text class="mb-1">
                <div>Author: {{ articleData.author || "--" }}</div>
                <div>Published On: {{ formattedPublishDate || "--" }}</div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="deep-purple"
                    text
                    @click="setSelectedArticleData"
                >View Detail
                </v-btn>
                <a :href="articleData.url" target="_blank" rel="noopener noreferrer">Read Full Article</a>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
// Library imports
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

// Utils and Interfaces imports
import { ArticleObj } from '~/utils/interfaces'

// Vuex imports
import { mapMutations } from 'vuex'

@Component({
    methods: {
        ...mapMutations({
            setSelectedArticle: 'setSelectedArticle'
        })
    }
})
export default class ArticleCard extends Vue {

    $helper: any // To avoid Typescript errors related to type safety 

    // Props
    @Prop() articleData!: ArticleObj

    //Computed Properties
    protected setSelectedArticle!: Function // To avoid Typescript errors related to type safety

    get formattedPublishDate() {
        return this.$helper.formatPublishDate(this.articleData.publishedAt)
    }

    //All methods
    setSelectedArticleData() {
        this.setSelectedArticle({articleData: this.articleData})
        this.$router.push("/article_detail")
    }

}
</script>

<style lang="scss" scoped>
.card-title {
    font-weight: 500;
    cursor: pointer;
    color: $bio-indigo;
}

.card-title:hover {
    color: darken($bio-indigo, 10%);
}

</style>