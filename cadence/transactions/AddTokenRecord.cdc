import "TokenRecord"

transaction(record: String) {

  prepare(acct: AuthAccount) {
  }

  execute {
    TokenRecord.addRecord(recordToAdd: record)
  }
}