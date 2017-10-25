module.exports = {
  get zero () { return browser.element('.digits:nth-child(1)'); },
  get one () { return browser.element('.digits:nth-child(2)'); },
  get two () { return browser.element('.digits:nth-child(3)'); },
  get three () { return browser.element('.digits:nth-child(4)'); },
  get four () { return browser.element('.digits:nth-child(5)'); },
  get five () { return browser.element('.digits:nth-child(6)'); },
  get six () { return browser.element('.digits:nth-child(7)'); },
  get seven () { return browser.element('.digits:nth-child(8)'); },
  get eight () { return browser.element('.digits:nth-child(9)'); },
  get nine () { return browser.element('.digits:nth-child(10)'); },
  get period () { return browser.element('.digits:nth-child(11)'); },

  get dividedBy () { return browser.element('.operations:nth-child(1)'); },
  get times () { return browser.element('.operations:nth-child(2)'); },
  get minus () { return browser.element('.operations:nth-child(3)'); },
  get plus () { return browser.element('.operations:nth-child(4)'); },
  get equals () { return browser.element('.operations:nth-child(5)'); },

  get responsePaneText () { return browser.getText('#response-pane'); },
}