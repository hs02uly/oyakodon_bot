const http = require("http")
http.createServer(function (req, res) {
    res.write("online")
    res.end()
}).listen(8080)

// const { Client, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
// const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
// const client = new Client({
//     "intents": [Guilds, GuildMessages, MessageContent],
//     "partials": [Partials.Channel]
// });

client.once("ready", () => {
    console.log(`起動しましたよ覚悟しなさい${new Date()}`)
    client.user.setPresence({ activities: [{ name: "o.help" }],
    status: "online" })
})

const c = "#73efff"
let args = []
client.on("messageCreate", async message => {
    try{

        //                  oyakodon                    //
        if (!message.content.startsWith(p)){
            if(message.content.includes("youtube" || "YouTube" || "ニコ動")) message.reply("投稿者としての自覚はないんか？")
            if(message.content.includes("彼女" || "食べ")) message.reply("よかったら僕を食べませんか")
            if(message.content.includes("彼女" || "食べ")) message.reply("")
            if(message.mentions.users.has(client.user.id)) message.reply("メンションしないでください\n禿げさせますよ")
        }
        const p = "o."
        const cmd = message.content.slice(2).split(" ")[0]
        args = message.content.split(" ").slice(1)

        if (!message.content.startsWith(p)) return;
        if (message.author.bot) return;
        console.log("認識された引数:",args)

        //                  commands                    //
        switch(cmd){
            case "say":
                return message.channel.send(args.join(" "))
                break;

            case `ping`:
                const ping = new EmbedBuilder()
                    .setTitle("Pong")
                    .addFields(
                        { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true},
                        { name: "コマンド受信", value: `${new Date()() - message.createdTimestamp}ms`, inline: true}
                    )
                    .setColor(c)
                    .setTimestamp()
                return message.reply({embeds: [ping]})
                break;

            case "help":
                const help = new EmbedBuilder()
                    .setTitle("Help/commands")
                    .setDescription("親子丼氏の許可のもと作成しています")
                    .addFields(
                        { name: "okd", value: `ランダムで親子丼氏の名言を送信します\n名言募集中です`, inline: true},
                        { name: "say", value: `botになにか言わせれます\nなぜかスペースに対応していません`, inline: true},
                        { name: "ping", value: "ping値を測ります", inline: true}
                    )
                    .setColor(c)
                    .setTimestamp()
                return message.reply({embeds: [help]})
                break;
            case "test":
                console.log("反応あり")
                break;

            case "okd":
                let d = new Date()
                let oyakodonM = [
                    "息の根が終了しました",
                    "あ、勝手に慈悲受け取るマンです",
                    "は？",
                    "黙れ",
                    "興奮しないでください",
                    ";;",
                    "えぇ.....(中の人)",
                    "使い方がよくわかりませんでした",
                    "やったぁ！",
                    "誰！？",
                    "勝者が決定しました！",
                    "もしも僕がサブアカウントを秘密裏に運営していると言ったらどうします？",
                    "許さない",
                    "こたつになりなさい",
                    "棺桶入ります？",
                    "管理者権限ください",
                    "そのチョコ点ってたっぷりよな、トッポまですげぇ最後だもん。",
                    "理解しました\nメンションされてませんが禿げさせます",
                    "親子丼Botが可哀想....."
                    // `${d.getMinutes()}:${d.getMinutes()}になりました\n約束のブツを出してください`
                    // `親子丼Botが${d.getHours()}時${d.getMinutes()}分をお知らせします`
                ]
                switch (args[0]) {
                    case "list":
                        const okd = new EmbedBuilder()
                            .setColor(c)
                            .addFields({ name: "一覧", value: oyakodonM.join("\n") })
                        return message.reply({embeds: [okd]})
                        break;
                    default:
                        return message.reply(oyakodonM[Math.floor(Math.random() * oyakodonM.length)])
                        break;
                }

                default:
                    return message.reply("コマンドが不明です")
                    break;
        }
    }catch(e){
        return message.reply(e.message)
    }
})

client.login(process.env.TOKEN)