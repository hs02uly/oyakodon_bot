const { SlashCommandBuilder, REST, Routes } = require("discord.js")
const rest = new REST({ version: '10' }).setToken(process.env.token)

const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong!');

const commands = [ping]
async function main() {
    await rest.put(
        Routes.applicationCommands("1046922596471554058"), {
            body: commands
        }
    )
}

main().catch(err => console.log(err))