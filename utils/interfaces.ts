// Declare all interfaces here.

export interface Interface_Article {
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