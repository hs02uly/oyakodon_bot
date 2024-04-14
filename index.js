const http = require("http")
http.createServer(function(req, res) {
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
    client.user.setPresence({
        activities: [{ name: `o.help | ${client.guilds.cache.size}Guilds` }],
        status: "online"
    })
    console.log(client.guilds.cache.map(guild => guild.name).join("\n")) //入ってる鯖数表示
})

const c = "#73efff"
let args = []
client.on("messageCreate", async message => {
    try {
        let d = new Date();
        const p = "o."
        const cmd = message.content.slice(2).split(" ")[0]
        args = message.content.split(" ").slice(1)

        if (message.author.bot) return;
        //                  oyakodon                    //
        if (!message.content.startsWith(p)) {
            if (message.content.includes("|​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|")) return message.reply("私には通用しませんよ");
            if (message.content.includes("youtube" || "YouTube" || "ニコ動")) return message.reply("投稿者としての自覚はないんか？");
            if (message.content.includes("彼女" || "食べ")) return message.reply("よかったら僕を食べませんか");
            if (message.content.includes("解決しな")) return message.reply("問題が解決しなかったら製作者を交換すればいいですね");
            if (message.content.includes("🤔🤔")) return message.reply("出たな！妖怪シンキングマン！");
            if (message.content.includes("カスコード")) return message.reply("もうやめて！梅干しのライフはもう0よ！！");
            if (message.content.includes("過疎")) return message.reply("過疎超えて虚空");
            if (message.mentions.users.has(client.user.id)) return message.reply("メンションしないでください\n禿げさせますよ");
        }

        if (!message.content.startsWith(p)) return;
        console.log("サーバーid:", message.guild.id, "\n認識されたコマンド:", message.content);

        //                  commands                    //
        switch (cmd) {
            case "say":
                if (!args[0]) return message.reply("引数が無効です") //文字なし無視
                return message.channel.send(args.join(" "));
                break;

            case "ping":
                const ping = new EmbedBuilder()
                    .setTitle("Pong")
                    .addFields(
                        { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true },
                        { name: "コマンド受信", value: `${new Date() - message.createdTimestamp}ms`, inline: true }
                    )
                    .setColor(c)
                    .setTimestamp();
                return message.reply({ embeds: [ping] });
                break;

            case "help":
                const help = new EmbedBuilder()
                    .setTitle("Help/commands")
                    .setDescription("親子丼氏の許可のもと作成しています")
                    .addFields(
                        { name: "okd", value: "ランダムで親子丼氏の名言を送信します\n `ex. o.okd 3`\n` o.okd list`", inline: true },
                        { name: "say", value: "botになにか言わせられます", inline: true },
                        { name: "ping", value: "ping値を測ります", inline: true },
                        { name: "time", value: "親子丼が現在の時刻をお知らせします(in ロンドン)", inline: true },
                        { name: "damare", value: "黙らせます", inline: true },
                        { name: "alarm", value: "アラームを設定します。setTimeoutなので再起動するとリセットされます\n`ex. o.alarm 30h title`", inline: true }
                    )
                    .setColor(c)
                    .setTimestamp()
                return message.reply({ embeds: [help] });
                break;

            case "damare":
                message.member.timeout(10 * 1000, "damareコマンドを使ってしまったから。")
                return message.reply(`黙れ${message.member.displayName}`)
                break;

            case "alarm":
                if (!args[0]) return message.reply("引数を指定してください")
                let alarm
                const uni = args[0].slice(-1)
                const time = Number(args[0].slice(0, -1))
                if (!isNaN(args[0])) return message.reply("単位が必要です")
                if (isNaN(time) || !time) return message.reply("引数が無効です")
                if (time > 999) return message.reply("値が大きすぎます")

                const m = args[1]

                if (uni.match(/s/)) alarm = time
                if (uni.match(/m/)) alarm = time * 60
                if (uni.match(/h/)) alarm = time * 3600
                if (!uni.match(/h|m|s/)) return message.reply("なんだその単位は")

                message.reply(`アラームを${args[0]}後に設定しました`)
                setTimeout(() => {
                    message.channel.send(`通知: <@${message.author.id}> ${m}`)
                }, alarm * 1000);
                break;

            case "sayc":
                if (message.author.id == "888652878590406656") { //ワシ専用コマンドですﾊﾟｧ
                    return client.channels.cache.get(args[0]).send(args.slice(1).join(" "))
                } else {
                    return message.reply("あなたにその権限はありません。覚悟しなさい")
                }
                break;

                case "eval":
                    if (message.author.id == "888652878590406656") {
                        const result = eval(args.join(" "))
                        const formattedResult = JSON.stringify(result, null, 2);
                        const evalEmbed = new EmbedBuilder()
                            .setDescription("```json\n" + formattedResult + "```")
                        return message.reply({ embeds: [evalEmbed] })
                    }else {
                        return message.reply("あなたにその権限はありません。覚悟しなさい")
                    }

            case "time":
                return message.reply(`親子丼Botが${d.getHours()}時${d.getMinutes()}分をお知らせします`)
                break;

            case "okd":
                const oyakodonM = [
                    "息の根が終了しました",
                    "あ、勝手に慈悲受け取るマンです",
                    "は？",
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
                    "完全にマンボウになるまでマンボウもどきと呼びます",
                    "すみません",
                    "現在進行形で社畜を募集しています",
                    "分かりました、マンボウもどき",
                    "素晴らしい人材だ.....！\nあなたも社畜になりませんか？",
                    "通常は時給-1000円程度の賠償が発生しますが、社畜になると免除されます！",
                    "皆さんが油断している隙に防城戦ワールドを開きます",
                    "助走をつけて殴りますよ",
                    "サーバールール第3項によって抹消します",
                    "貧弱やのう",
                    "ﾁｯ",
                    "あなたを永久に許しません",
                    "暇の押し売りやめてください",
                    "お命頂戴",
                    "もう全部破壊しますね",
                    "泣いてる暇があるなら早く制作進めたらどうですか？",
                    "誰ですか？進捗が無いとほざいてるのは",
                    "息の根を止めます？破壊します？",
                    "おのれもやん.....\nいや、己がもやんみたいなミスを犯しました",
                    "メンションしたら警告ロールがもらえるんですか！？",
                    "圧縮されたい人います？",
                    "全員親子丼です",
                    "ん？",
                    "気まぐれで親子丼をタイムアウトしました",
                    "社畜カスさん",
                    "吸引機は大人しくショタ吸ってればいいんだよ",
                    "このメッセージの後に最初に反応した方は社畜にします",
                    "そうそう、早く進捗報告してくださいね\nマンボウもどき",
                    "ああ.....ああ.....",
                    `${d.getHours()}:${d.getMinutes()}になりました\n約束のブツを出してください`
                ];
                if (args[0] === "list") {
                    const okd = new EmbedBuilder()
                        .setColor(c)
                        .setTitle(`一覧/List\n現在${oyakodonM.length}個の迷言が保存されています。`)
                        .setDescription(oyakodonM.map(value => { return `${oyakodonM.indexOf(value) + 1}: ${value}` }).join("\n")) //番号: 値
                    return message.reply({ embeds: [okd] });
                }
                if (!isNaN(args[0])) {
                    if (Math.trunc(args[0]) > oyakodonM.length || Math.trunc(args[0]) < 1) return message.reply("その数字は無効です")
                    return message.reply(oyakodonM[Math.trunc(args[0]) - 1])
                } else {
                    return message.reply(oyakodonM[Math.floor(Math.random() * oyakodonM.length)]);
                }
            default:
                return message.reply("コマンドが不明です");
                break;
        }
    } catch (e) {
        console.log(e.message)
        return message.reply(`${e.message}`);
    }
})

client.login(process.env.TOKEN)