// Declare all interfaces here.

export interface ArticleInterface {
    content: string,
    publishedAt: string,
    urlToImage: string,
    url: string,
    description: string,
    title: string,
    author: any
    source: {
        id: string,
        name: string
    }
}