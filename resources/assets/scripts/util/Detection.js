export default class {

  constructor ({ detect = [] }) {
    this.detect = detect
    this.target = document.documentElement;
    this.flags = {}
  }

  init () {
    this.detect.forEach(toTest => {
      let result = false
      switch (toTest) {
        case 'ie11':
          result = this.testIe11()
          break;
        default:
          break;
      }
      this.flags[toTest] = result
      if (result === true) {
        this.target.className += ' ' + toTest;
      }
    })
  }

  is (toTest) {
    return this.flags[toTest]
  }

  testIe11 () {
    return !!window.MSInputMethodContext && !!document.documentMode
  }

}
