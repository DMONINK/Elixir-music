const { MessageEmbed } = require(`discord.js`);
module.exports = {
  name: `serverslist`,
  category: `Owner`,
  aliases: [`slist`],
  description: `Shows servers list`,
  usage: `servers-list`,
  run: async (client, message) => {
    if (!config.ownerIDS.includes(message.author.id)) return;

    try {
      let servers = [];
      client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map((r) => r)
        .forEach((element) => {
          servers.push(element);
        });

      let serverslist = [];
      for (let i = 0; i < servers.length; i += 15) {
        let xservers = servers.slice(i, i + 15);
        serverslist.push(
          xservers
            .map(
              (r, index) =>
                `**${i + ++index}** - ${r.name} | ${
                  r.memberCount
                } Members\nID: ${r.id}`
            )
            .join(`\n`)
        );
      }
      let limit = Math.round(servers.length / 15);
      let embeds = [];
      for (let i = 0; i < limit; i++) {
        let desc = String(serverslist[i]).substr(0, 2048);
        await embeds.push(
          new MessageEmbed()
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setColor("#2F3136")
            .setDescription(desc)
        );
      }
      return paginationxd(client, message, embeds, 60);
    } catch (e) {
      console.log(String(e.stack).bgRed);
      const emesdf = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor(`An Error Occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({ embeds: [emesdf] });
    }
  },
};

async function paginationxd(client, message, embeds) {
  let currentPage = 0;
  const { MessageButton, MessageActionRow } = require("discord.js");

  let buttonrow1 = new MessageActionRow().addComponents(
    new MessageButton()
    .setStyle("PRIMARY")
    .setEmoji(client.emoji.first_id)
    .setCustomId("first"),
    new MessageButton()
    .setStyle("SECONDARY")
    .setEmoji(client.emoji.back_id)
    .setCustomId("back"),
    new MessageButton()
    .setStyle("SUCCESS")
    .setEmoji(client.emoji.cross_id)
    .setCustomId("home"),
    new MessageButton()
    .setStyle("SECONDARY")
    .setEmoji(client.emoji.next_id)
    .setCustomId("next"),
    new MessageButton()
    .setStyle("PRIMARY")
    .setEmoji(client.emoji.last_id)
    .setCustomId("last")
  );

  if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] });
  const serverEmbed = await message.channel.send({
    content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
    components: [buttonrow1],
    embeds: [embeds[currentPage]],
  });

  const collector = message.channel.createMessageComponentCollector({
    filter: (interaction) =>
      (interaction.isButton() || interaction.isSelectMenu()) &&
      interaction.message.author.id == client.user.id,
  });

  collector.on("collect", (interaction) => {
    if (interaction.customId == "next") {
      if (currentPage < embeds.length - 1) {
        interaction.reply({ content: `Success`, ephemeral: true });
        currentPage++;
        serverEmbed.edit({
          content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds: [embeds[currentPage]],
          components: [buttonrow1],
        });
      } else {
        interaction.reply({ content: `Success`, ephemeral: true });
        currentPage = 0;
        serverEmbed.edit({
          content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds: [embeds[currentPage]],
          components: [buttonrow1],
        });
      }
    } else if (interaction.customId == "back") {
      interaction.reply({ content: `Success`, ephemeral: true });

      if (currentPage !== 0) {
        --currentPage;
        to;
        serverEmbed.edit({
          content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds: [embeds[currentPage]],
          components: [buttonrow1],
        });
      } else {
        currentPage = embeds.length - 1;
        serverEmbed.edit({
          content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
          embeds: [embeds[currentPage]],
          components: [buttonrow1],
        });
      }
    } else if (interaction.customId == "first") {
      interaction.reply({ content: `Success`, ephemeral: true });

      currentPage = 0;
      serverEmbed.edit({
        content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds: [embeds[currentPage]],
        components: [buttonrow1],
      });
      serverEmbed.edit({
        content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds: [embeds[currentPage]],
        components: [buttonrow1],
      });
      serverEmbed.edit({
        content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds: [embeds[currentPage]],
        components: [buttonrow1],
      });
    } else if (interaction.customId == "last") {
      interaction.reply({ content: `Success`, ephemeral: true });

      currentPage = embeds.length - 1;
      serverEmbed.edit({
        content: `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds: [embeds[currentPage]],
        components: [buttonrow1],
      });
    } else if (interaction.customId == "home") {
      serverEmbed.delete();
    }
  });
}
