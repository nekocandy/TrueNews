import "ArticleStore"

transaction(article: String) {

  prepare(acct: AuthAccount) {
  }

  execute {
    ArticleStore.addArticle(articleToAdd: article)
  }
}
