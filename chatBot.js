const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})

client.login('OTA3OTU2NjY1MTEzMDE4NDA4.YYuuiQ.Rn2yQ9lGPLr_24sky29TWQHLOYA');