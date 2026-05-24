import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Server info"),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setTitle(guild.name)
      .addFields(
        { name: "Members", value: `${guild.memberCount}` }
      );

    await interaction.reply({ embeds: [embed] });
  }
};