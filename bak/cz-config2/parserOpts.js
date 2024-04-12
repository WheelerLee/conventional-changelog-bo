'use strict'

function createParserOpts () {
  return {
    // headerPattern: /^(\w*):\s*(.*)$/,
    headerPattern: /^(.*):\s*(.*)$/,
    headerCorrespondence: [
      'tag',
      'message'
    ]
  }
}

module.exports.createParserOpts = createParserOpts
