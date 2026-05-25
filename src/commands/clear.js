import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete messages")
    .addIntegerOption((opt) =>
      opt
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 50) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Invalid amount")
        .setDescription("Enter a number between 1 and 50.")
        .setColor(Colors.Red);

      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    try {
      await interaction.channel.bulkDelete(amount);

      const successEmbed = new EmbedBuilder()
        .setTitle("Messages Deleted")
        .setDescription(`Deleted ${amount} messages.`)
        .setColor(Colors.Green);

      await interaction.reply({ embeds: [successEmbed], ephemeral: true });
    } catch (err) {
      console.log(err);

      const failureEmbed = new EmbedBuilder()
        .setTitle("Delete Failed")
        .setDescription("Can't delete messages older than 14 days.")
        .setColor(Colors.Red);

      await interaction.reply({ embeds: [failureEmbed], ephemeral: true });
    }
  },
};