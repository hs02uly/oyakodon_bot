const http = require("http")
http.createServer(function (req, res) {
    res.write("online")
    res.end()
}).listen(8080)

const { Client, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({
    "intents": [Guilds, GuildMessages, MessageContent],
    "partials": [Partials.Channel]
});

client.once("ready", () => {
    console.log(`起動しましたよ覚悟しなさい`)
    client.user.setPresence({ activities: [{ name: "o.ping" }],
    status: "online" })
})

const c = "#73efff"
let args = ""
client.on("messageCreate", async message => {
    try{
        const p = "o."
        if (!message.content.startsWith(p)) return
        const cmd = message.content.slice(2).split(" ")[0]
        args = message.content.split(" ").slice(1)
        console.log(args)
        console.log(...args)

        //                  commands                    //
        if (cmd === "say"){
            return message.reply(...args)
        }
        if(cmd === `ping`){
            const ping = new EmbedBuilder()
                .setTitle("Pong")
                .addFields(
                    { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true},
                    { name: "コマンド受信", value: `${new Date() - message.createdTimestamp}ms`, inline: true}
                )
                .setColor(c)
                .setTimestamp()
            return message.reply({embeds: [ping]})
        }
        if (cmd === `test`){
            return;
        }
        //                  commands                    //

    }catch(e){
        return message.reply(e.message)
    }
})

client.login(process.env.TOKEN)