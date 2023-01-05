const { getCode, clean } = require("@elara-services/eval-helper");
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "eval",
    category: "Dev",
    description: "Evaluates Javascript code in a command.",
    async run(client, message, args) {
        if (!global.config.ownerids.includes(message.author.id)) return message.reply("<:xmark:1045967248038309970> This is an owner only command.");
        const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription("**<:xmark:1045967248038309970> You must provide code to evaluate.**")
        if (!args[0]) return message.reply({ embeds: [errorEmbed] });
        try {
            const evaled = await getCode({ code: args.join(" ") });
            const code = await clean(eval(evaled), [ client.token ]);
            const embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setTitle("<:checkmark:1045963641406640148> Successfully evaluated.")
            //.addFields({ name: "Input", value: `\`\`\`${args.join(" ")}\`\`\`` })
            //.addFields({ name: "Output", value: `\`\`\`js\n${code}\`\`\`` })
            .setDescription(`**Input** \`\`\`${args.join(" ")}\`\`\`\n**Output**\`\`\`js\n${code}\n\`\`\``)
        return message.reply({ embeds: [embed] });
        } catch (e) {
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error during evaluation.\n\`\`\`js\n${e.stack}\`\`\``)
        return message.reply({ embeds: [errorEmbed] })
        }
    },
};
global.isOwner = isOwner;
function isOwner(id) {
    if (global.config.ownerids.includes(id)) {
        return true;
    } else {
        return false;
    }
}

//The fields are causing an issue for some reason, Idk why.
