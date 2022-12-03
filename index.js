//もしかしてmiyuさんだったりします？
//公開しないでぴえん

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
    console.log(`起動しましたよ覚悟しなさい${new Date()}`)
    client.user.setPresence({ activities: [{ name: "o.help" }],
    status: "online" })
})

const c = "#73efff"
let args = []
client.on("messageCreate", async message => {
    try{
        const p = "o."
        const cmd = message.content.slice(2).split(" ")[0]
        args = message.content.split(" ").slice(1)

        if (message.author.bot) return;
        //                  oyakodon                    //
        if (!message.content.startsWith(p)){
            if(message.content.includes("|​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|")) return message.reply("私には通用しませんよ");
            if(message.content.includes("youtube" || "YouTube" || "ニコ動")) return message.reply("投稿者としての自覚はないんか？");
            if(message.content.includes("彼女" || "食べ")) return message.reply("よかったら僕を食べませんか");
            if(message.content.includes("解決しな")) return message.reply("問題が解決しなかったら製作者を交換すればいいですね");
            if(message.content.includes("🤔🤔")) return message.reply("出たな！妖怪シンキングマン");
            if(message.mentions.users.has(client.user.id)) return message.reply("メンションしないでください\n禿げさせますよ");
        }

        if (!message.content.startsWith(p)) return;
        console.log("認識されたコマンド:", message.content);

        //                  commands                    //
        switch(cmd){
            case "say":
                if (!args[0] && !message.attachment.size) return; //文字なし&ファイルの添付なしの時無視
                if (message.attachment.size){
                    const files = message.attachment
                    return (!args[0] ? message.channel.send({ files }) :message.channel.send({ content: args.join(" "), files: [files] }))
                }else return message.channel.send(args.join(" "));
                break;

            case "ping":
                const ping = new EmbedBuilder()
                    .setTitle("Pong")
                    .addFields(
                        { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true},
                        { name: "コマンド受信", value: `${new Date() - message.createdTimestamp}ms`, inline: true}
                    )
                    .setColor(c)
                    .setTimestamp();
                return message.reply({embeds: [ping]});
                break;

            case "help":
                const help = new EmbedBuilder()
                    .setTitle("Help/commands")
                    .setDescription("親子丼氏の許可のもと作成しています")
                    .addFields(
                        { name: "okd", value: `ランダムで親子丼氏の名言を送信します。名言募集中です\n引数: list(listを表示します), \nなんか数字(その数字番目のokd名言を送信します`, inline: true},
                        { name: "say", value: `botになにか言わせれます\nなぜかスペースに対応していません`, inline: true},
                        { name: "ping", value: "ping値を測ります", inline: true}
                    )
                    .setColor(c)
                    .setTimestamp()
                return message.reply({embeds: [help]});
                break;

            case "sayc":
                if(message.author.id == "888652878590406656"){
                    return client.channels.cache.get(args[0]).send(args[1])

                }else{
                    return message.reply("あなたにその権限はありません")
                }
                break;

            case "test":
                console.log("反応あり");
                break;

            case "okd":
                let d = new Date();
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
                    "許します",
                    "こたつになりなさい",
                    "棺桶入ります？",
                    "可哀想.....あなたに心は無いんですか！",
                    "管理者権限ください",
                    "そのチョコ点ってたっぷりよな、トッポまですげぇ最後だもん。",
                    "理解しました\nメンションされてませんが禿げさせます",
                    "親子丼Botが可哀想.....",
                    "全員が心にチャーシューを飼っているので全員チャーシューです",
                    ":partying_face:",
                    "シールさんも食べ物でしたね",
                    "完全にマンボウになるまでマンボウもどきと呼びます",
                    "黙れマンボウもどき",
                    "すみません",
                    "現在進行形で社畜を募集しています",
                    "分かりました、マンボウもどき",
                    "素晴らしい人材だ.....！\nあなたも社畜になりませんか？",
                    "通常は時給-1000円程度の賠償が発生しますが、社畜になると免除されます！",
                    "皆さんが油断している隙に防城戦ワールドを開きます",
                    // `${d.getMinutes()}:${d.getMinutes()}になりました\n約束のブツを出してください`
                    // `親子丼Botが${d.getHours()}時${d.getMinutes()}分をお知らせします`
                ];
                if(args[0] === "list"){
                    const okd = new EmbedBuilder()
                        .setColor(c)
                        .addFields({ name: "一覧", value: oyakodonM.join("\n") });
                    return message.reply({embeds: [okd]});
                }
                if(!isNaN(args[0])){
                    if (Number(args[0])-1 > oyakodonM.length || Number(args[0])-1 < 0) return;
                    return message.reply(oyakodonM[Number(args[0])-1])
                }else{
                    return message.reply(oyakodonM[Math.floor(Math.random() * oyakodonM.length)]);
                }
            default:
                return message.reply("コマンドが不明です");
                break;
        }
    }catch(e){
        return message.reply(e.message);
    }
})

client.login(process.env.TOKEN)