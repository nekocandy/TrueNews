import "ArticleStore"

transaction(article: String) {

  prepare(acct: AuthAccount) {
    // log(acct.address)
  }

  execute {
    ArticleStore.addArticle(articleToAdd: article)
  }
}
