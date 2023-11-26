pub contract ChatRoom {

  pub var messages: [String]

  pub fun addConfession(confessionToAdd: String) {
    self.messages.append(confessionToAdd)
  }

  init() {
    self.messages = []
  }
}
