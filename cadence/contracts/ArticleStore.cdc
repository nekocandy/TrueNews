pub contract ArticleStore {

  pub var articles: [String]

  pub fun addConfession(confessionToAdd: String) {
    self.articles.append(confessionToAdd)
  }

  init() {
    self.articles = []
  }
}
