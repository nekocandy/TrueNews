pub contract TokenRecord {

  pub var records: [String]

  pub fun addRecord(recordToAdd: String) {
    self.records.append(recordToAdd)
  }

  init() {
    self.records = []
  }
}
