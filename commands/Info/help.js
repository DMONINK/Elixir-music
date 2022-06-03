const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Discord
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const { swap_pages2 } = require("../../handlers/functions");
module.exports = {
    name: "help music",
    category: "Info",
    aliases: ["help", "commandinfo", "commandmusic"],
    cooldown: 3,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, guildData, player, prefix) => {

         if (args[0]) {
        const embed = new MessageEmbed()
        .setColor("#2F3136");
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          embed.setColor("RED");
          embed.setDescription(`Nothing found for **${args[0].toLowerCase()}**`)
          return message.channel.send({embeds: [embed]});
        } else if (!cmd && cat) {
          var category = cat;

          const catcommands = client.commands.filter(x => x.category === category).map(x => '`' + x.name + '`').join(", ")

          const embed = new MessageEmbed()
          .setColor("#2F3136")
          .setDescription(`● To get help on a specific command type \`${prefix}help <command>\`!`)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp()
          .addField(`${emoji.categories[category]} **${category} - (${client.commands.filter((cmd) => cmd.category === category).size})**`, catcommands)
          .setFooter(ee.footertext, client.user.displayAvatarURL());
        
          return message.channel.send({embeds: [embed]})
        }
        if (cmd.name) embed.addField(`**Command name**`, `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information of | \`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", cmd.aliases.length > 0 ? cmd.aliases.map(a => "`" + a + "`").join("\n") : "No Aliases")
        } catch {}
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
        else embed.addField("**Cooldown**", `\`3 Seconds\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        if (cmd.useage) {
          embed.addField("**Useage**", `\`${prefix}${cmd.useage}\``);
          embed.setFooter("Gaara");
        }
        embed.setColor(ee.color)
        return message.channel.send({embeds: [embed]});
      } 

        
    let helpmenu = new MessageEmbed()
        .setAuthor(`Gaara Help Menu`, ee.footericon)
        .setDescription(`
**Hey ${message.author}, I am ${client.user}**.
 
**Gaara is the easy-to-use Discord bot for all your needs.**

        
**${emoji.categories.AnimatedDiscord} Help related to Elxir's commands**

**${emoji.categories.Playlist} \`:\` Custom Playlist**
**${emoji.categories.AstrozMusic} \`:\` Filters**
**${emoji.categories.Info} \`:\` Info Commands**
**${emoji.categories.Playing} \`:\` Music Commands**
**${emoji.categories.Settings} \`:\` Settings**

**There's a Menu Below**

[Invite](${config.links.opmusicinv}) ● [Support Server](${config.links.server}) 
 `)

        .setFooter(ee.footertext, ee.footericon)
        .setColor(`#303037`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder('❯ Gaara Help Menu!')
                .addOptions([
                {
                    label: 'Custom Playlist',
                    description: 'Commands for creating custom playlist',
                    value: 'first',
                    emoji: emoji.categories.Playlist
                },
                {
                    label: ' Filters',
                    description: 'Filter commands like bassboost and nightcore',
                    value: 'second',
                    emoji: emoji.categories.AstrozMusic
                },
                {
                    label: 'Info Commands',
                    description: 'To get some imformation of Jazz Music',
                    value: 'third',
                    emoji: emoji.categories.Info
                },
                {
                    label: 'Music Commands',
                    description: 'Music commands with high quality',
                    value: 'fourth',
                    emoji: emoji.categories.Playing
                },
                {
                    label: 'Settings',
                    description: 'Gaara Settings',
                    value: 'fifth',
                    emoji: emoji.categories.Settings
                },
            ])
        )
        message.channel.send({ embeds: [helpmenu], components: [row] })
      
    }
}