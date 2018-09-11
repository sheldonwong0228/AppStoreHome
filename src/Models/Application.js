export default class Application {
    constructor(
        id,
        summary,
        name,
        artist,
        category,
        url,
        ratingStar,
        comment
    ) {
        this.id = id
        this.summary = summary
        this.name = name
        this.artist = artist
        this.category = category
        this.url = url
        this.ratingStar = ratingStar
        this.comment = comment
    }
}