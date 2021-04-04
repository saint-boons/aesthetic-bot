const fs = require('fs')
const path = require('path')

// Config
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

// Chalk
const chalk = require('chalk');
const infoPrefixColor = chalk.black.bgWhite
const warnPrefixColor = chalk.black.bgYellow
const errorPrefixColor = chalk.white.bgRed
const urlColor = chalk.blue.underline
const highlightColor = chalk.yellow

module.exports = (client) => {
    const readFeatures = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readFeatures(path.join(dir, file))
            } else if (file !== 'load-features.js') {
                const feature = require(path.join(__dirname, dir, file))
                console.log(infoPrefixColor(config.ConsoleStyle.Color.Info))
                feature(client)
            }
        }
    }

    readFeatures('.')
}