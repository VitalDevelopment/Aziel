const { Client, } = require('revolt.js')
const client = new Client();
global.revoltClient = client;

client.on("ready", async () => {
    console.info(`Logged in as ${client.user.username}!`)
    client.users.edit({
        status: {
          text: "Watching azielbot.xyz",
          presence: "Online",
        },
      });
});
client.on("message", async (message) => {
    if (message.author.bot || !message.member) return;

    if (message.content === config.revolt.prefix+"ping") {
        try {
            const mesg = await message.reply({ content: ":ping_pong: Pong!" });
      
            const embed = new EmbedBuilder()
              .setTitle(":ping_pong: Ping Pong!")
              .setColor("#39C6F1")
              .setDescription(`\nBot Latency: \`${mesg.createdTimestamp - message.createdTimestamp}ms\`\n Websocket Latency: \`${client.ws.ping}ms\``)
              .setFooter({ text: `${client.user.username} - Ping Command`, iconURL: client.user.displayAvatarURL() })
      
            await mesg.edit({ content: "", embeds: [embed] });
          } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await message.reply({ embeds: [errorEmbed] });
          }
          
        message.channel.sendMessage({
            embeds: [
                {   
                    
                    description: `### :ping_pong: Pong!\nWebsocket Ping: ${client.websocket.ping}`,
                    colour: "#39C6F1",
                    
                }
            ]
        });
    }
});

client.loginBot(config.revolt.token)