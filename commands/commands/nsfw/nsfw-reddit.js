// API
const axios = require('axios')

// Load embed module
const embed = require('@modules/embed.js')

// Load YAML module
const loadYAML = require('@modules/yaml.js')
const config = loadYAML('config')

// Chalk
const chalk = require('chalk');
const infoPrefixColor = chalk.black.bgWhite
const warnPrefixColor = chalk.black.bgYellow
const errorPrefixColor = chalk.white.bgRed
const urlColor = chalk.blue.underline
const highlightColor = chalk.yellow

module.exports = {
    commands: ['nsfw-reddit', 'nsfwreddit'],
    expectedArgs: '<subreddit> <type>',
    minArgs: 1,
    maxArgs: 1,
    nsfw: true,
    description: "Get the exchange rate of a currency compared to the eur or convert it with another.",
    callback: (client, message, arguments) => {
        const bannedSubreddits = config.NSFW.Reddit.BannedSubreddits.List
        let subreddit = arguments[0].toLowerCase()
        let type = arguments[1] ? arguments[1].toLowerCase() : config.Reddit.DefaultType
        if (type !== 'hot' && type !== 'new' && type !== 'random' && type !== 'rising' && type !== 'top') {
            message.channel.send(embed('error', `Invalid Type`, `Type \`${type}\` isn't a valid type in Reddit's API endpoints, valid options are:\n\`\`\`hot, new, random, rising, top\`\`\``))
            return
        }
        if (bannedSubreddits.includes(subreddit) && config.NSFW.Reddit.BannedSubreddits.Enabled === true) {
            message.channel.send(embed('error', `Invalid Subreddit`, `The subreddit \`${subreddit}\` was banned from showing with the bot by your admins.`))
        } else {
            let permalink
            let URL
            let title
            let content
            let created
            let author
            let upvotes
            let comments
            axios.get(`https://www.reddit.com/r/${subreddit}/${type}/.json`)
                .then((data) => {
                    //console.log(data.data.data.children[0].data)
                    //console.log(data.data[0])
                    if (data.data[0]) {
                        permalink = data.data[0].data.children[0].data.permalink
                        URL = `https://reddit.com${permalink}`
                        title = data.data[0].data.children[0].data.title
                        content = data.data[0].data.children[0].data.url
                        created = data.data[0].data.children[0].data.created_utc * 1000
                        author = data.data[0].data.children[0].data.author
                        upvotes = data.data[0].data.children[0].data.score
                        comments = data.data[0].data.children[0].data.num_comments
                        message.channel.send(embed('default', `${title}`, `Here is a post from \`r/${subreddit}\`\n[**OPEN**](${URL})`)
                            .setImage(`${content}`)
                            .setTimestamp(created)
                            .addFields(
                                { name: `Author`, value: `\`\`\`u/${author}\`\`\``, inline: true },
                                { name: `Upvotes`, value: `\`\`\`${upvotes}\`\`\``, inline: true },
                                { name: `Comments`, value: `\`\`\`${comments}\`\`\``, inline: true },
                            )
                        )
                    } else {
                        permalink = data.data.data.children[0].data.permalink
                        URL = `https://reddit.com${permalink}`
                        title = data.data.data.children[0].data.title
                        content = data.data.data.children[0].data.url
                        created = data.data.data.children[0].data.created_utc * 1000
                        author = data.data.data.children[0].data.author
                        upvotes = data.data.data.children[0].data.score
                        comments = data.data.data.children[0].data.num_comments
                        message.channel.send(embed('default', `${title}`, `Here is a post from \`r/${subreddit}\`\n[**OPEN**](${URL})`)
                            .setImage(`${content}`)
                            .setTimestamp(created)
                            .addFields(
                                { name: `Author`, value: `\`\`\`u/${author}\`\`\``, inline: true },
                                { name: `Upvotes`, value: `\`\`\`${upvotes}\`\`\``, inline: true },
                                { name: `Comments`, value: `\`\`\`${comments}\`\`\``, inline: true },
                            )
                        )
                    }
                })
                .catch((err) => {
                    console.log(errorPrefixColor(config.ConsoleStyle.Prefix.Error), err)
                    message.channel.send(embed('error', `Unknown`, `An unknown error occured, ask an admin to lok into it if this reapeats itself.`))
                })
        }
    },
}