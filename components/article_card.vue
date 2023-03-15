<template>
    <div v-if="articleData" class="mb-5">
        <v-card elevation="2" tile>
            <v-row>
                <v-col :cols=2>
                    <v-img
                        lazy-src="https://via.placeholder.com/200"
                        max-height="200"
                        max-width="200"
                        :src="articleData.urlToImage"
                    ></v-img>
                </v-col>
                <v-col :cols=9>
                    <p>{{ articleData.title }}</p>
                    <p>Author: {{ articleData.author || "--" }}</p>
                    <p>Link: <a :href="articleData.url" target="_blank" rel="noopener noreferrer">{{ articleData.url }}</a></p>
                    <p>Published On: {{ formattedPublishDate || "--" }}</p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts">
// Library imports
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

// Utils and Interfaces imports
import { ArticleObj } from '~/utils/interfaces'

@Component
export default class ArticleCard extends Vue {

    $helper: any

    // Props
    @Prop() articleData!: ArticleObj

    //Computed Properties
    get formattedPublishDate() {
        return this.$helper.formatPublishDate(this.articleData.publishedAt)
    }

}
</script>