'use strict'

const { readFile } = require('fs').promises
const { resolve } = require('path')

async function createWriterOpts () {
  const [template, header, commit] = await Promise.all([
    readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
    readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
    readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8')
  ])
  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit

  return writerOpts
}

module.exports.createWriterOpts = createWriterOpts

function getWriterOpts () {
  return {
    transform: (commit) => {
      console.log(commit)
      if (!commit.tag || typeof commit.tag !== 'string') {
        return
      }

      let arr = commit.tag.split(' ');
      commit.tag = commit.tag.split(' ')[arr.length - 1]

      commit.shortHash = commit.hash.substring(0, 7)

      return commit
    },
    groupBy: 'tag',
    commitGroupsSort: 'title',
    commitsSort: ['tag', 'message']
  }
}
