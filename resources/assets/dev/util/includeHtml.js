const fs = require('fs')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const desire = require('./desire')

/**
 * @exports
 * @param {String} templateDir Directory from which templates files are served
 * @param {String} viewDataDir Directory containing json data files to be injected to each template.
 * A special 'global.json' is used to hold globally available data for all pages,
 * additionallly we look for json file matching the name of the page
 * @return {Array}
 */
module.exports = (templateDir, viewDataDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    const parameters = {
      ...desire(path.resolve(__dirname, `${viewDataDir}/global.json`)),
      ...desire(path.resolve(__dirname, `${viewDataDir}/${name}.json`)),
    }
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      templateParameters: parameters,
    })
  })
}
