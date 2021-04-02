# Aesthetic BOT

Aesthetic BOT (aesthetic-bot) is my first Discord bot, it's a general purpose bot. the to-do list can be found here: https://trello.com/b/RrA3avCJ/aesthetic-bot

Join my community discord server here https://discord.gg/7T24Mrw, it is not for the bot's development.

# Bot Information
- Language: **discord.js** *(node.js, javascript)*
- Version: **in package.json**
- Testing server: https://discord.gg/u69Jm4T
- Dependencies: 
  - **discord.js**
  - **chalk**
  - **dotenv**
  - **js-yaml**
  - nodemon *(optional)*

*running `npm start` will get those for you*

# Installation

### Before you start:
1. Go to https://discord.com/developers/applications
2. Create an application and give it a name *(and a profile picture if you want)*
3. On the side click on `Bot` and click `New Bot`
4. Copy the bot token and save it for later ***(DO NOT SHARE THE TOKEN WITH ANYONE)***
5. Make sure you have node.js v.12 installed *(https://nodejs.org/)*
6. Invite the bot in your discord server with this link:
```
https://discord.com/api/oauth2/authorize?client_id=CLIENT ID HERE&permissions=8&scope=bot%20applications.commands
```
*change `CLIENT ID HERE` make sure you keep `&permissions=8&scope=bot%20applications.commands` after the `Client ID`*

### If hosted on local machine or server:
1. Download your desired version
2. Create a `.env` file with the following inside:
```
DISCORD_TOKEN=(BOT TOKEN)
```
*replace `(BOT TOKEN)` with your own Discord bot token that you got earlier from the Discord developer portal*

3. Open up terminal *(or cmd)*
4. Run `cd <file path to bot folder>`
5. If directory `node_modules` exisits, delete it
6. Run `npm start`

*steps 3-5 if self-hosted, otherwise see below*

*run `npm test` to run the bot with nodemon*

### If hosted on Heroku:
1. Fork this repository
2. Create a Heroku account
3. Create an application
4. Go to deploy and click GitHub
5. Connect your GitHub account and select the fork you created (turn on automatic deploys)
6. Since the bot is ready to be hosted with Heroku, you just need to turn off `web` and turn on the `worker` under `Resources`

*Procfile already exists*

# Configuration

### Information
- Config file: config.yaml
- Lang file: *comming soon...*

# Other Information

### About releases:
Please only get releases from the side under "Realeases" on the side.

### About redistribution/reselling:
Please check the `LICENSE` file.
