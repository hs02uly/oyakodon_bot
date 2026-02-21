const http = require("http")
http.createServer(function (req, res) {
    res.write("online")
    res.end()
}).listen(8080)

const { Client, EmbedBuilder, GatewayIntentBits, Partials, Message,ChannelType } = require("discord.js");
const { Guilds, GuildMessages, MessageContent, GuildMembers} = GatewayIntentBits;
const client = new Client({
    "intents": [Guilds, GuildMessages, MessageContent, GuildMembers],
    "partials": [Partials.Channel]
});

client.once("clientReady", () => {
    console.log(`起動しましたよ覚悟しなさい${new Date()}`)
    client.user.setPresence({
        activities: [{ name: `o.help`}],
        status: "online"
    })
    console.log(client.guilds.cache.map(guild => guild.name).join("\n"))
})

//メンションしないよ
Message.prototype.safereply = function(options) {
    const allowed = { parse: [], repliedUser: false };
    if (typeof options ==="string") return this.reply({ content: options, allowedMentions: allowed });
    if (options && typeof options === "object") return this.reply({ ...options, allowedMentions: options.allowedMentions ?? allowed });
    return this.reply({ content: String(options), allowedMentions: allowed });
} //前のやとembedsおくれへんやないか

const c = "#73efff"
const ADMIN_ID = "888652878590406656" //ぼく
const prefix = "o."
let args = []
client.on("messageCreate", async message => {
    let today = new Date();
    const admin = await client.users.fetch(ADMIN_ID);

    if (message.author.bot) return;
    if (!message.guild) return
    try {      
        if (!message.content.startsWith(prefix)) {
            if (message.content.includes("|​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|")) return message.safereply("私には通用しませんよ");
            if (message.content.includes("youtube" || "YouTube" || "ニコ動")) return message.safereply("投稿者としての自覚はないんか？");
            if (message.content.includes("彼女" || "食べ")) return message.safereply("よかったら僕を食べませんか");
            if (message.content.includes("解決しな")) return message.safereply("問題が解決しなかったら製作者を交換すればいいですね");
            if (message.content.includes("🤔🤔")) return message.safereply("出たな！妖怪シンキングマン！");
            if (message.content.includes("カスコード")) return message.safereply("もうやめて！梅干しのライフはもう0よ！！");
            if (message.content.includes("過疎")) return message.safereply("過疎超えて虚空");
            if (message.mentions.users.has(client.user.id)) return message.safereply("メンションしないでください\n禿げさせますよ");
        }

        const cmd = message.content.slice(prefix.length).split(" ")[0]
        args = message.content.split(" ").slice(1)

        //                  commands                    //
        const sudocommands = ["eval"]
        if (sudocommands.includes(cmd) && message.author !== admin) {
            return message.safereply("あなたにその権限はありません。覚悟しなさい")
        }
        switch (cmd) {
            case "echo":{
                if (!args[0]) return message.safereply("引数が無効です")
                return message.channel.send(args.join(" "));
            }

            case "ping":{
                const embed = new EmbedBuilder()
                    .setTitle("Pong🏓")
                    .addFields(
                        { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true },
                        { name: "コマンド受信", value: `${new Date() - message.createdTimestamp}ms`, inline: true }
                    )
                    .setColor(c)
                    .setTimestamp();
                return message.safereply({ embeds: [embed] });
            }
            case "help":{
                const embed = new EmbedBuilder()
                    .setTitle("Help/commands")
                    .setDescription(`全てコマンドのprefixは\`${prefix}\`です。`)
                    .addFields(
                        { name: "okd", value: "ランダムで親子丼氏の名言を送信します\n `ex. o.okd 3`\n` o.okd list`", inline: true },
                        { name: "echo", value: "botになにか言わせられます", inline: true },
                        { name: "user", value: "user情報を表示します", inline: true },
                        { name: "ping", value: "ping値を測ります", inline: true },
                        { name: "time", value: "親子丼が現在の時刻をお知らせします(in フランクフルト)", inline: true },
                        { name: "alarm", value: "アラームを設定します。多少の誤差があります。\n`ex. o.alarm 7h おはよう`", inline: true }
                    )
                    .setColor(c)
                    .setTimestamp()
                return message.safereply({ embeds: [embed] });
                }
            case "user": { //made by ちゃっぴー
                const user = message.author;
                const member = message.member;
                if (!member) return message.safereply("ギルドメンバー情報が取得できませんでした");
                const avatar = user.displayAvatarURL ? user.displayAvatarURL({ dynamic: true, size: 1024 }) : null;
                const roles = member.roles && member.roles.cache ? member.roles.cache.filter(r => r.id !== message.guild.id).map(r => "@"+r.name).join(", ") : "なし";
                const permArr = member.permissions ? member.permissions.toArray() : [];
                const perms = permArr.includes("Administrator") ? "Administrator" : (permArr.slice(0, 10).join(", ") || "なし");
                const joinedAtDate = member.joinedAt || null;
                const createdAtDate = user.createdAt || null;
                const formatDate = (d) => d ? d.toLocaleString("sv-SE") : "不明"; //スウェーデン
                const timeAgo = (d) => {
                    if (!d) return "不明";
                    const now = Date.now();
                    const diff = Math.floor((now - d.getTime()) / 1000);
                    if (diff < 60) return `${diff}秒前`;
                    const mins = Math.floor(diff / 60);
                    if (mins < 60) return `${mins}分前`;
                    const hours = Math.floor(mins / 60);
                    if (hours < 24) return `${hours}時間前`;
                    const days = Math.floor(hours / 24);
                    if (days < 30) return `${days}日前`;
                    const months = Math.floor(days / 30);
                    if (months < 12) return `${months}ヶ月前`;
                    const years = Math.floor(months / 12);
                    return `${years}年前`;
                };
                const presence = member.presence?.status ?? "offline";
                const presenceJP = presence === "online" ? "🟢オンライン" : presence === "idle" ? "🟡退席中" : presence === "dnd" ? "🔴取り込み中" : "◼️オフライン";
                const activities = member.presence?.activities?.map(a => a.name).join(", ") || "なし";
                const voice = member.voice?.channel ? member.voice.channel.name : "未接続";


                const basicinfo=`名前: **${user.tag}**(${user.id})
                状態: ${presenceJP}
                作成日時: ${formatDate(createdAtDate)} (${timeAgo(createdAtDate)})
                ニックネーム: ${member.nickname ?? "なし"}
                アクティビティ: ${activities}`

                const serverinfo=`参加日時: ${formatDate(joinedAtDate)} (${timeAgo(joinedAtDate)})
                ボイスチャンネル: ${voice}
                役職: ${roles}
                権限（一部）: ${perms}`
                const embed = new EmbedBuilder()
                    .setTitle(`ユーザー情報`)
                    .setThumbnail(avatar)
                    .addFields(
                        { name: "基本情報", value:basicinfo, inline: false },
                        { name: "サーバー情報", value: serverinfo, inline: false },
                    )
                    .setColor(c)
                    .setTimestamp();
                
                return message.safereply({ embeds: [embed] });
            }

            case "alarm":{
                if (!args[0]) return message.safereply("引数を指定してください")
                let alarm
                const uni = args[0].slice(-1)
                const time = Number(args[0].slice(0, -1))
                if (!isNaN(args[0])) return message.safereply("単位が必要です")
                if (isNaN(time) || !time) return message.safereply("引数が無効です")
                if (time > 999) return message.safereply("値が大きすぎます")

                const m = args.slice(1).join(" ")

                if (uni.match(/s/)) alarm = time
                if (uni.match(/m/)) alarm = time * 60
                if (uni.match(/h/)) alarm = time * 3600
                if (!uni.match(/h|m|s/)) return message.safereply("なんだその単位は")

                message.safereply(`アラームを${args[0]}後に設定しました`)
                setTimeout(() => {
                    return message.channel.send(`通知: <@${message.author.id}> ${m}`)
                }, alarm * 1000);
            }

            case "time":{
                return message.safereply(`親子丼Botが${today.getHours()}時${today.getMinutes()}分をお知らせします`)
            }
            case "okd":{
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
                    `${today.getHours()}:${today.getMinutes()}になりました\n約束のブツを出してください`
                ];
                if (args[0] === "list") {
                    const embed = new EmbedBuilder()
                        .setColor(c)
                        .setTitle(`一覧/List\n現在${oyakodonM.length}個の迷言が保存されています。`)
                        .setDescription(oyakodonM.map(value => { return `${oyakodonM.indexOf(value) + 1}: ${value}` }).join("\n")) //番号: 値
                    return message.safereply({ embeds: [embed] });
                }
                if (!isNaN(args[0])) {
                    if (Math.trunc(args[0]) > oyakodonM.length || Math.trunc(args[0]) < 1) return message.safereply("その数字は無効です")
                    return message.safereply(oyakodonM[Math.trunc(args[0]) - 1])
                } else {
                    return message.safereply(oyakodonM[Math.floor(Math.random() * oyakodonM.length)]);
                }
            }

            case "eval":{
                let result="";
                try {
                    result = await eval(args.join(" "))
                } catch (error) {
                    result = error.toString();
                }
                const formattedResult = JSON.stringify(result, null, 2);
                const embed = new EmbedBuilder()
                    .setTitle("Results")
                    .setDescription("```json\n" + formattedResult + "```")
                return message.safereply({ embeds: [embed] })
            }
            default:
                return message.safereply("コマンドが不明です");
        }
    } catch (e) {
        console.log(e.message)
        return message.safereply(`${e.message}`);
    }
})

client.login(process.env.TOKEN)