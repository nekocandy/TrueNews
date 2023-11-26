pub contract ArticleStore {

  pub var articles: [String]

  pub fun addArticle(articleToAdd: String) {
    self.articles.append(articleToAdd)
  }

  init() {
    self.articles = []
  }
}
