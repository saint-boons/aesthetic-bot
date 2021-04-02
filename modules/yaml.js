const fs = require('fs');
const yaml = require('js-yaml');

// File paths
const configYAMLFile = './config.yaml'

// Get config anyways for console prefixes
let configFileContent = fs.readFileSync(configYAMLFile, 'utf8');
let config = yaml.load(configFileContent);

// Chalk
const chalk = require('chalk');
const infoPrefixColor = chalk.black.bgWhite
const warnPrefixColor = chalk.black.bgYellow
const errorPrefixColor = chalk.white.bgRed
const urlColor = chalk.blue.underline
const highlightColor = chalk.yellow

module.exports = (file) => {
    switch (file) {
        case 'config':
            try {
                let configFileContent = fs.readFileSync(configYAMLFile, 'utf8');
                let config = yaml.load(configFileContent);
                return config
            } catch (err) {
                console.log(errorPrefixColor('ERROR >'), err);
                break
            }
        default:
            return console.log(warnPrefixColor(config.ConsoleStyle.Prefix.Warn), highlightColor(file), `does not exist or isn't reconised as a YAML config/lang file`)
    }
}