// API
const axios = require('axios')

// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

// Env
require('dotenv').config();
const APIKey = process.env.EXCHANGE_API_KEY

// Chalk
const chalk = require('chalk');
const infoPrefixColor = chalk.black.bgWhite
const warnPrefixColor = chalk.black.bgYellow
const errorPrefixColor = chalk.white.bgRed
const urlColor = chalk.blue.underline
const highlightColor = chalk.yellow

module.exports = {
    commands: ['currency', 'fiat', 'exchange-rate', 'exchangerate'],
    expectedArgs: '<base curreny code> <to currency code / none> <amount / none>',
    minArgs: 1,
    maxArgs: 3,
    description: "Get the exchange rate of a currency compared to the eur or convert it with another.",
    callback: (client, message, arguments) => {
        let baseCurrency = arguments[0].toUpperCase()
        let toCurrency = arguments[1] ? arguments[1].toUpperCase() : 'none'
        let amount = arguments[2] ? Number(arguments[2]) : 1
        let type
        if (baseCurrency.length !== 3) {
            message.channel.send(embed('error', `Invalid Currency Code`, `\`${baseCurrency}\` isn't a valid currency code.\nExamples of a valid codes:`).addFields(
                { name: `Euro`, value: `\`\`\`EUR\`\`\``, inline: true },
                { name: `US Dollar`, value: `\`\`\`USD\`\`\``, inline: true },
                { name: `British Pound`, value: `\`\`\`GBP\`\`\``, inline: true },
            ))
            return
        }
        if (arguments.length === 1) {
            type = 'rate'
        } else {
            if (toCurrency.length !== 3) {
                message.channel.send(embed('error', `Invalid Currency Code`, `\`${toCurrency}\` isn't a valid currency code.\nExamples of a valid codes:`).addFields(
                    { name: `Euro`, value: `\`EUR\``, inline: true },
                    { name: `US Dollar`, value: `\`USD\``, inline: true },
                    { name: `British Pound`, value: `\`GBP\``, inline: true },
                ))
                return
            }
            if (amount < config.Currency.Convert.MinimumAmount || amount > config.Currency.Convert.MaximumAmount) {
                message.channel.send(embed('error', `Invalid Amount`, `\`${amount}\` isn't a valid amount, it should be within \`${config.Currency.Convert.MinimumAmount}\` and \`${config.Currency.Convert.MaximumAmount}\``))
                return
            }
            type = 'convert'
        }

        switch (type) {
            case 'rate':
                let symbols = config.Currency.Rate.Symbols.filter(symbol => symbol !== baseCurrency)
                axios.get(`http://data.fixer.io/api/latest?access_key=${APIKey}&base=${baseCurrency}&symbols=${symbols}`)
                    .then((data) => {
                        const rateEmbed = embed('default', `Here is the exchnage rate of \`${baseCurrency}\` compared to the most common currencies.`).addField(`${baseCurrency}`, `\`\`\`${amount}\`\`\``, false)
                        console.log(data.data)
                        for (symbol of symbols) {
                            rateEmbed.addField(`${symbol}`, `\`\`\`${data.data.rates[symbol]}\`\`\``)
                        }
                        message.channel.send(rateEmbed)
                    })
                    .catch((err) => {
                        console.log(errorPrefixColor(config.ConsoleStyle.Prefix.Error), err)
                    })
                return
            case 'convert':
                if (config.Currency.ConvertEndpointAvailable === true) {

                } else {

                }
                return
            default:
                return
        }
    },
}